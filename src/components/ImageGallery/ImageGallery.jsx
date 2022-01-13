import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ toggleModal, photos }) {
    return (
        <>
            <ul className={styles.ImageGallery}>
                {photos.map(({ largeImageURL, webformatURL, tags }, index) => (
                    <ImageGalleryItem
                        key={index}
                        webImage={webformatURL}
                        largeImage={largeImageURL}
                        tags={tags}
                        toggleModal={toggleModal}
                    />
                ))}
            </ul>
        </>
    );
}
ImageGallery.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    photos: PropTypes.arrayOf(
        PropTypes.shape({
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};
