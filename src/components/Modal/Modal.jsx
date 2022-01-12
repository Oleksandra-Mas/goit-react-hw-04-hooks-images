import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ onClose, searchImage }) {
    const { url, alt } = searchImage;

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose(null);
        }
    };

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onClose(null);
        }
    };

    return createPortal(
        <div className={styles.Overlay} onClick={handleBackdropClick}>
            <div className={styles.Modal}>
                <img src={url} alt={alt} />
            </div>
        </div>,
        modalRoot,
    );
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    searchImage: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }).isRequired,
};
