import { useState } from 'react';
import styles from './Dropdown.module.css'; 

function Dropdown({ label, options, value, onChange, placeholder, name }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onChange(name, option);
        setIsOpen(false);
    };

    return (
        <div className={styles.formGroup}>
            <label>{label}:</label>
            <div className={styles.dropdown}>
                <div 
                    className={styles.dropdownButton}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>{value || placeholder}</span>
                    <span className={`${styles.dropdownArrow} ${isOpen ? styles.open : ''}`}>
                        ▼
                    </span>
                </div>
                
                {isOpen && (
                    <div className={styles.dropdownMenu}>
                        {options.map((option) => (
                            <div
                                key={option}
                                className={styles.dropdownOption}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dropdown;