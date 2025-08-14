import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Navigation from '../../Navigation/Navigation';
import styles from './NotepadPlayer.module.css'

function NotepadPlayer() {
    const editorRef = useRef(null);
    const [files, setFiles] = useState([]);

    return (
        <>
            <Navigation/>
            <div className={styles.noteContainer}>
                <div className={styles.sidePage}>

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