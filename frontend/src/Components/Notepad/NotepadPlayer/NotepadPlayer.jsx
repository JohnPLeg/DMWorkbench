import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { collection, query, setDoc, getDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import Navigation from '../../Navigation/Navigation';
import styles from './NotepadPlayer.module.css'

function NotepadPlayer() {
    const auth = getAuth();
    const editorRef = useRef(null);
    const saveTimeout = useRef(null);
    const [activeFile, setActiveFile] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "users", auth.currentUser.uid, "notes"));
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            if (snapshot.empty) {
                // No files? Create an untitled one.
                const newDocRef = doc(collection(db, "users", auth.currentUser.uid, "notes"));
                await setDoc(newDocRef, {
                    name: "Untitled File",
                    content: "<p>Start writing...</p>"
                });

                setFiles([{ id: newDocRef.id, name: "Untitled File", content: "<p>Start writing...</p>" }]);
                setActiveFile(newDocRef.id);
                } else {
                // We have files — map them into state
                const fileData = snapshot.docs.map(docSnap => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                setFiles(fileData);

                // If nothing active yet, pick the first one
                if (!activeFile && fileData.length > 0) {
                    setActiveFile(fileData[0].id);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    // upon clicking abother "file" it will query firestore for its data
    useEffect(() => {
        const activeFileChange = async () => {
            if (activeFile) {
                const fileDocRef = doc(db, 'users', auth.currentUser.uid, 'notes', activeFile);
                const fileSnap = await getDoc(fileDocRef);
                if (editorRef.current) {
                    editorRef.current.setContent(fileSnap.data()?.content || "<p>Start Writing...</p>");
                }
            }
        }
    }, [activeFile])

    // runs when the user swaps files saving the previous file
    const switchFile = async (fileId) => {
        if (editorRef.current && activeFile) {
            const content = editorRef.current.getContent();

            await setDoc(doc(db, 'users', auth.currentUser.uid, 'notes', activeFile), {
                content
            });
        }

        setActiveFile(fileId);
    }

    // saves the file name and content
    const saveFile = async (fileId, content) => {
        if (!fileId) return;
        await setDoc(doc(db, "users", auth.currentUser.uid, "notes", fileId), { content }, { merge: true });
    }

    // saving upon idle typing
    const handleTyping = () => {
        clearTimeout(saveTimeout.current);
        
        saveTimeout.current = setTimeout(() => {
            if (editorRef.current && activeFile) {
                saveFile(activeFile, editorRef.current.getContent());
            }
        }, 2000);
    };

    return (
        <>
            <Navigation/>
            <div className={styles.noteContainer}>
                <div className={styles.sidePage}>
                    {files.map((file) => (
                        <div key={file.id}>{file.id}</div>
                    ))}
                </div>
                <div className={styles.textPage}>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='jdmuxmqdq6l2cdavojhkp4wuzjhdwgd0aezgdbg51eheo17c'
                        init={{
                            skin: 'oxide-dark',
                            content_css: 'dark',
                            resize: false,
                            height: '100%',
                            plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                            ],
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                            uploadcare_public_key: '43b6f1606ad72a669bda',
                            onboarding: false,
                            promotion: false,
                        }}
                        initialValue="<p>Fetching text...</p>"
                    />
                </div>
            </div>
        </>
    )
}

export default NotepadPlayer;