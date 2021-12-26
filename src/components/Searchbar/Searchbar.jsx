import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.scss';
export default class Searchbar extends Component {
    state = { filter: '' };
    handleInputChange = event => {
        const filter = event.target.value.toLowerCase();
        this.setState({ filter });
    };
    handleSubmit = event => {
        event.preventDefault();
        const { filter } = this.state;
        if (filter.trim() === '') {
            return toast.error('Empty input');
        }
        this.props.onSubmit(filter);
        this.setState({ filter: '' });
    };
    render() {
        const { filter } = this.state;
        return (
            <header className={styles.Searchbar}>
                <form
                    onSubmit={this.handleSubmit}
                    className={styles.SearchForm}
                >
                    <button
                        type="submit"
                        className={styles['SearchForm-button']}
                    >
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
                        onChange={this.handleInputChange}
                    />
                </form>
            </header>
        );
    }
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
