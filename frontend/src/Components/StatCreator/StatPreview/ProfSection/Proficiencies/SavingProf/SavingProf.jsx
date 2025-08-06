import styles from './SavingProf.module.css';

function SavingProf({ monster, onSaveSelection }) {
  const profThrows = (monster?.proficiencies || [])
    .filter((prof) => prof?.proficiency?.index?.includes('saving-throw'))
    .map((prof) => prof.proficiency.name.replace('Saving Throw: ', ''));

  return (
    <ul>
      {profThrows.length > 0 ? (
        profThrows.map((save) => (
          <li onClick={() => onSaveSelection(save)} key={save}>
            {save}
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}

export default SavingProf;
