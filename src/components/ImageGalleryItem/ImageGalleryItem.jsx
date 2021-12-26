import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from './ImageGalleryItem.module.scss';
export default class ImageGalleryItem extends Component {
    handleImageClick = event => {
        const { dataset, alt } = event.target;
        this.props.toggleModal({
            url: dataset.value,
            alt,
        });
    };

    render() {
        const { webImage, largeImage, tags } = this.props;
        return (
            <li
                className={styles.ImageGalleryItem}
                onClick={this.handleImageClick}
            >
                <img
                    className={styles['ImageGalleryItem-image']}
                    src={webImage}
                    alt={tags}
                    data-value={largeImage}
                />
            </li>
        );
    }
}
ImageGalleryItem.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    webImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};
