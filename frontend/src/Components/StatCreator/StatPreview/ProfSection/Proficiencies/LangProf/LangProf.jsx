import styles from './LangProf.module.css'

function LangProf({ monster, onLangSelection }) {
    const langs = String(monster.languages || '').split(',').map(lang => lang.trim()).filter(Boolean);


    return (
        <>
            <ul className={styles.unorderedLangs}>
                {langs.length > 0 ? (langs.map((lang) => (
                    <li onClick={() => onLangSelection(lang)} key={lang}>{lang || ''}</li>
                ))) : <></>}
            </ul>
        </>
    )
}

export default LangProf;