import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';

import Spinner from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.scss';
import ApiService from '../../services/apiService';
import Button from '../Button/Button';
const apiService = new ApiService();

const STATUS = {
    idle: 'idle',
    pending: 'pending',
    resolved: 'resolved',
};

export default class ImageGallery extends Component {
    state = { status: STATUS.idle, page: 1 };
    async componentDidUpdate(prevProps, prevState) {
        const nextFilter = this.props.filter;
        const curFilter = prevProps.filter;
        const nextPage = this.state.page;
        const curPage = prevState.page;
        if (curFilter !== nextFilter) {
            this.setState({ status: STATUS.pending });
            apiService.searchQuery = nextFilter;
            apiService.resetPage();
            const photos = await apiService.searchPhoto();
            if (photos.total === 0) {
                this.setState({ status: STATUS.idle });
                return toast.warning('Nothing found');
            }
            this.setState({ photos: photos.hits, status: STATUS.resolved });
        }

        if (nextPage !== curPage && curFilter === nextFilter) {
            this.setState({ status: STATUS.pending });
            this.smoothScroll();
            const newPhotos = await apiService.searchPhoto();
            if (newPhotos.total === 0) {
                this.setState({ status: STATUS.idle });
                return toast.warning('Nothing else found');
            }
            this.setState({
                photos: [...prevState.photos, ...newPhotos.hits],
                status: STATUS.resolved,
            });
        }
    }

    onClick = () => {
        apiService.incrementPage();
        this.setState({ page: apiService.page });
    };

    smoothScroll = () => {
        setTimeout(() => {
            window.scrollBy({
                top: document.documentElement.clientHeight,
                behavior: 'smooth',
            });
        }, 1000);
    };

    render() {
        const { photos, status, page } = this.state;
        const { toggleModal } = this.props;
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
                            (
                                { id, largeImageURL, webformatURL, tags },
                                index,
                            ) => (
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
                        <Button onClick={this.onClick} />
                    ) : (
                        <Spinner />
                    )}
                </>
            );
        } else if (status === STATUS.pending) {
            return <Spinner />;
        }
    }
}
ImageGallery.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};
