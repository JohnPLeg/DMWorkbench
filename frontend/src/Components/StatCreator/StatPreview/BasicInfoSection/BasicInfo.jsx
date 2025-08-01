import Dropdown from "../Dropdown/Dropdown";
import styles from "../StatPreview.module.css"
import { size, type, armorType } from '../../../../Data/dropdownInfo'

function BasicInfo({ monster, setMonster }) {
    // updates the monster object with what the user types
    const handleChange = (e) => {
        const { name, value } = e.target;

        setMonster(prevMonster => ({
            ...prevMonster,
            [name]: value
        }));
    }

    const handleDropdownChange = (name, value) => {
        setMonster(prevMonster => ({
            ...prevMonster,
            [name]: value
        }));
    };


    return (
        <>
            <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text"
                    name='name'
                    id='name'
                    value={monster.name || ''}
                    onChange={handleChange}
                    placeholder="Name"
                />
            </div>
            <div className={styles.formGroup}>
                <Dropdown
                    label="Size"
                    name="size"
                    options={size}
                    value={monster.size}
                    onChange={handleDropdownChange}
                    placeholder="Select Size"
                />
            </div>
            <div className={styles.formGroup}>
                <Dropdown
                    label="Type"
                    name="type"
                    options={type}
                    value={monster.type}
                    onChange={handleDropdownChange}
                    placeholder="Select Type"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="alignment">Alignment:</label>
                <input 
                    type="text"
                    name='alignment'
                    id='alignment'
                    value={monster.alignment || ''}
                    onChange={handleChange}
                    placeholder="Alignment"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="hit_dice">Hit Dice:</label>
                <input 
                    type="text"
                    name='hit_dice'
                    id='hit_dice'
                    value={monster.hit_dice || ''}
                    onChange={handleChange}
                    placeholder="0"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="hit_points">Hit Points:</label>
                <input 
                    type="text"
                    name='hit_points'
                    id='hit_points'
                    value={monster.hit_points || ''}
                    onChange={handleChange}
                    placeholder="0"
                />
            </div>
            <div className={styles.formGroup}>
                <Dropdown
                    label="Armor Type"
                    name="armorType"
                    options={armorType}
                    value={monster.armor_class[0].type}
                    onChange={handleDropdownChange}
                    placeholder="Select Armor Type"
                />
            </div>
        </>
    )
}

export default BasicInfo;
