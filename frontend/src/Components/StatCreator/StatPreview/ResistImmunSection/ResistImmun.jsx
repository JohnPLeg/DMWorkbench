import styles from "../StatPreview.module.css"
import Dropdown from "../Dropdown/Dropdown";
import Vulnerabilities from "./Attributes/Vulnerabilities"
import Resistances from "./Attributes/Resistances";
import Immunities from "./Attributes/Immunities";
import Conditions from "./Attributes/Conditions/Conditions";
import { useState } from "react";
import { damageTypes, conditions } from "../../../../Data/dropdownInfo";

function ResistImmun({ monster, setMonster }) {
    const [selectedDamageType, setSelectedDamageType] = useState('');

    // updates the selection in the damage type dropdown
    const handleDamageTypeChange = (name, value) => {
        setSelectedDamageType(value);
    };

    // Click Handlers
    // updates monster object with new vulnerabilities
    const handleVulnClick = () => {
        if (!(monster.damage_vulnerabilities || []).includes(selectedDamageType)) {
            setMonster(prevMonster => ({
                ...prevMonster,
                damage_vulnerabilities: [...prevMonster.damage_vulnerabilities || [], selectedDamageType]
            }))
        }
    }
    // removes the clicked vulnerability from the monster object
    const handleVulnListClick = (value) => {
        const vulns = monster.damage_vulnerabilities;
        const indexToRemove = vulns.findIndex(vuln => vuln === value);
        vulns.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            damage_vulnerabilities: vulns
        }))
    }

    // updates monster object with new resistances
    const handleResistClick = () => {
        if (!(monster.damage_resistances || []).includes(selectedDamageType)) {
            setMonster(prevMonster => ({
                ...prevMonster,
                damage_resistances: [...prevMonster.damage_resistances || [], selectedDamageType]
            }))
        }
    }
    // removes the clicked resistance from the monster object
    const handleResistListClick = (value) => {
        const resists = monster.damage_resistances;
        const indexToRemove = resists.findIndex(resist => resist === value);
        resists.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            damage_resistances: resists
        }))
    }

    // updates monster object with new immunities
    const handleImmunClick = () => {
        if (!(monster.damage_immunities || []).includes(selectedDamageType)) {
            setMonster(prevMonster => ({
                ...prevMonster,
                damage_immunities: [...prevMonster.damage_immunities || [], selectedDamageType]
            }))
        }
    }
    // removes the clicked immunity from the monster object
    const handleImmunListClick = (value) => {
        const immuns = monster.damage_immunities;
        const indexToRemove = immuns.findIndex(immun => immun === value);
        immuns.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            damage_immunities: immuns
        }))
    }

    // updates the state of the monster object when a condition is added
    const handleCondImmunChange = (name, value) => {
        const condImmuns = monster.condition_immunities || [];
        const exists = condImmuns.includes(value);

        if (!exists) {
            setMonster(prevMonster => ({
                ...prevMonster,
                condition_immunities: [...(prevMonster.condition_immunities || []), value]
            }));
        }
    };

    // removes the clicked condition immunity from the monster object
    const handleCondImmunListClick = (value) => {
        const condImmuns = monster.condition_immunities || [];
        const indexToRemove = condImmuns.findIndex(cond => cond === value);
        condImmuns.splice(indexToRemove, 1);

        setMonster(prevMonster => ({
            ...prevMonster,
            condition_resistances: condImmuns
        }))
    }

    return (
        <>
            <div className={styles.formGroup}>
                <Dropdown
                    label="Damage Types"
                    name="damageTypes"
                    options={damageTypes}
                    value={selectedDamageType}
                    onChange={handleDamageTypeChange}
                    placeholder="Select Damage Type"
                />
                <div className={styles.buttonGrid}>
                    <div className={styles.vulnGrid}>
                        <button onClick={handleVulnClick} type={'button'}>Vulnerability</button>
                        <Vulnerabilities
                            monster={monster}
                            onVulnSelection={handleVulnListClick}
                        />
                    </div>
                    <div className={styles.vulnGrid}>
                        <button onClick={handleResistClick} type={'button'}>Resistance</button>
                        <Resistances
                            monster={monster}
                            onResistSelection={handleResistListClick}
                        />
                    </div>
                    <div className={styles.vulnGrid}>
                        <button onClick={handleImmunClick} type={'button'}>Immunity</button>
                        <Immunities
                            monster={monster}
                            onDamageSelection={handleImmunListClick}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.formGroup}>
                <Dropdown
                    label="Condition Immunities"
                    name="conditionImmunities"
                    options={conditions}
                    value={''}
                    onChange={handleCondImmunChange}
                    placeholder="Select Condition"
                />
                <Conditions
                    monster={monster}
                    onCondSelection={handleCondImmunListClick}
                />
            </div>
        </>
    )
}

export default ResistImmun;