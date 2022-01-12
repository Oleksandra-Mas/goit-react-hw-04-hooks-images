import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose(null);
        }
    };

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose(null);
        }
    };
    render() {
        const { url, alt } = this.props.searchImage;
        return createPortal(
            <div className={styles.Overlay} onClick={this.handleBackdropClick}>
                <div className={styles.Modal}>
                    <img src={url} alt={alt} />
                </div>
            </div>,
            modalRoot,
        );
    }
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    searchImage: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }).isRequired,
};
