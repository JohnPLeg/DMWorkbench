function LangProf({ monster, onLangSelection }) {
    const langs = String(monster.languages).split(',');

    return (
        <>
            <ul>
                {langs.map((lang) => (
                    <li onClick={() => onLangSelection(lang)} key={lang}>{lang || ''}</li>
                ))}
            </ul>
        </>
    )
}

export default LangProf;