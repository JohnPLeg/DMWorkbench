import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { collection, query, setDoc, getDoc, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import Navigation from '../../Navigation/Navigation';
import styles from './NotepadPlayer.module.css'

function NotepadPlayer() {
    const auth = getAuth();
    const editorRef = useRef(null);
    const saveTimeout = useRef(null);
    const [editingFileId, setEditingFileId] = useState(null);
    const [fileNameDraft, setFileNameDraft] = useState("");
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

        activeFileChange();
    }, [activeFile])

    // runs when the user swaps files saving the previous file
    const switchFile = async (fileId) => {
        if (editorRef.current && activeFile) {
            const content = editorRef.current.getContent();

            await setDoc(doc(db, 'users', auth.currentUser.uid, 'notes', activeFile), { content }, { merge: true });
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
                        <div key={file.id} className={styles.fileRow} style={{backgroundColor: activeFile === file.id ? 'rgba(255,255,255,0.2)' : ''}}>
                            {editingFileId === file.id ? (
                                <input
                                    value={fileNameDraft}
                                    onChange={(e) => setFileNameDraft(e.target.value)}
                                    onBlur={async () => {
                                        // Save new name to Firestore
                                        const fileDocRef = doc(db, 'users', auth.currentUser.uid, 'notes', file.id);
                                        await setDoc(fileDocRef, { name: fileNameDraft }, { merge: true });

                                        setEditingFileId(null);
                                    }}
                                    onKeyDown={async (e) => {
                                        if (e.key === "Enter") {
                                        e.target.blur(); // triggers onBlur save
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <>
                                    <span
                                        onClick={() => switchFile(file.id)}
                                        className={styles.fileName}
                                    >
                                        {file.name}
                                    </span>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => {
                                        setEditingFileId(file.id);
                                        setFileNameDraft(file.name);
                                        }}
                                    >
                                        ✎
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={async () => {
                                            // Ask for confirmation
                                            const confirmDelete = window.confirm(`Are you sure you want to delete "${file.name}"?`);
                                            if (!confirmDelete) return;

                                            // Delete the file in Firestore
                                            const fileDocRef = doc(db, 'users', auth.currentUser.uid, 'notes', file.id);
                                            await deleteDoc(fileDocRef);

                                            // If the deleted file is currently active, pick a new active file
                                            if (activeFile === file.id) {
                                            const remainingFiles = files.filter(f => f.id !== file.id);
                                            setActiveFile(remainingFiles[0]?.id || null);
                                            }
                                        }}
                                        >
                                        X
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.textPage}>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='jdmuxmqdq6l2cdavojhkp4wuzjhdwgd0aezgdbg51eheo17c'
                        onKeyUp={handleTyping}
                        init={{
                            promotion: false,
                            onboarding: false,
                            skin: 'oxide-dark',
                            content_css: 'dark',
                            height: '100%',
                            menubar: true,
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            menu: {
                            file: { title: 'File', items: 'customnewdocument | preview | print' }
                            },
                            setup: (editor) => {
                            editor.on('init', () => {
                                console.log("Editor initialized");

                                // Custom New Document menu item
                                editor.ui.registry.addMenuItem('customnewdocument', {
                                text: 'New Document',
                                onAction: async () => {
                                    // Save current file first
                                    if (editorRef.current && activeFile) {
                                    const content = editorRef.current.getContent();
                                    await setDoc(
                                        doc(db, 'users', auth.currentUser.uid, 'notes', activeFile),
                                        { content },
                                        { merge: true }
                                    );
                                    }

                                    // Create new Firestore file
                                    const newDocRef = doc(collection(db, "users", auth.currentUser.uid, "notes"));
                                    const newFile = {
                                    name: "Untitled File",
                                    content: "<p>Start writing...</p>"
                                    };
                                    await setDoc(newDocRef, newFile);

                                    // Update state
                                    setActiveFile(newDocRef.id);

                                    // Load content into editor
                                    editor.setContent(newFile.content);
                                    console.log("New Document created:", newDocRef.id);
                                }
                                });
                            });
                            }
                        }}
                        initialValue="<p>Fetching text...</p>"
                    />
                </div>
            </div>
        </>
    )
}

export default NotepadPlayer;