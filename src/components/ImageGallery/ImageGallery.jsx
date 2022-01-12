import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Spinner from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import ApiService from '../../services/apiService';
import Button from '../Button/Button';
const apiService = new ApiService();

const STATUS = {
    idle: 'idle',
    pending: 'pending',
    resolved: 'resolved',
};

export default function ImageGallery({ toggleModal, filter }) {
    const [status, setStatus] = useState(STATUS.idle);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        if (!filter) {
            return;
        }
        setStatus(STATUS.pending);
        apiService.searchQuery = filter;
        apiService.resetPage();
        apiService.searchPhoto().then(newPhotos => {
            if (newPhotos.total === 0) {
                setStatus(STATUS.idle);
                return toast.warning('Nothing found');
            }
            setPhotos(newPhotos.hits);
            setStatus(STATUS.resolved);
        });
    }, [filter]);

    useEffect(() => {
        if (page === 1) {
            return;
        }
        setStatus(STATUS.pending);

        apiService.searchPhoto().then(newPhotos => {
            if (newPhotos.total === 0) {
                setStatus(STATUS.idle);
                return toast.warning('Nothing else found');
            }
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos.hits]);
            setStatus(STATUS.resolved);
            smoothScroll();
        });
    }, [page]);

    const onClick = () => {
        apiService.incrementPage();
        setPage(apiService.page);
    };

    const smoothScroll = () => {
        setTimeout(() => {
            window.scrollBy({
                top: document.documentElement.clientHeight,
                behavior: 'smooth',
            });
        }, 400);
    };

    if (status === STATUS.idle) {
        return null;
    }
    if (
        (status === STATUS.pending && page !== 1) ||
        status === STATUS.resolved
    ) {
        return (
            <>
                <ul className={styles.ImageGallery}>
                    {photos.map(
                        ({ id, largeImageURL, webformatURL, tags }, index) => (
                            <ImageGalleryItem
                                key={index}
                                webImage={webformatURL}
                                largeImage={largeImageURL}
                                tags={tags}
                                toggleModal={toggleModal}
                            />
                        ),
                    )}
                </ul>
                {status === STATUS.resolved ? (
                    <Button onClick={onClick} />
                ) : (
                    <Spinner />
                )}
            </>
        );
    } else if (status === STATUS.pending) {
        return <Spinner />;
    }
}
ImageGallery.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};
