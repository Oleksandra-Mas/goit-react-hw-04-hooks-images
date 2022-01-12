import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';
export default function Searchbar({ onSubmit }) {
    const [filter, setFilter] = useState('');
    const handleInputChange = event => {
        const value = event.target.value.toLowerCase();
        setFilter(value);
    };
    const handleSubmit = event => {
        event.preventDefault();
        if (filter.trim() === '') {
            return toast.error('Empty input');
        }
        onSubmit(filter);
        setFilter('');
    };
    return (
        <header className={styles.Searchbar}>
            <form onSubmit={handleSubmit} className={styles.SearchForm}>
                <button type="submit" className={styles['SearchForm-button']}>
                    <span className={styles['SearchForm-button-label']}>
                        Search
                    </span>
                </button>

                <input
                    className={styles['SearchForm-input']}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={filter}
                    onChange={handleInputChange}
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
