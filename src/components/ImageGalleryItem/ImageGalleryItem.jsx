import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({
    toggleModal,
    webImage,
    largeImage,
    tags,
}) {
    const handleImageClick = event => {
        const { dataset, alt } = event.target;
        toggleModal({
            url: dataset.value,
            alt,
        });
    };

    return (
        <li className={styles.ImageGalleryItem} onClick={handleImageClick}>
            <img
                className={styles['ImageGalleryItem-image']}
                src={webImage}
                alt={tags}
                data-value={largeImage}
            />
        </li>
    );
}
ImageGalleryItem.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    webImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};
