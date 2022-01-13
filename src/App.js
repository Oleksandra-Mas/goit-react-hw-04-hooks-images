import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import Spinner from './components/Loader/Loader';
import Searchbar from './components/Searchbar/Searchbar';
import ApiService from './services/apiService';
import Toast from './components/Toast/Toast';
const apiService = new ApiService();

const STATUS = {
    idle: 'idle',
    pending: 'pending',
    resolved: 'resolved',
};

export default function App() {
    const [filter, setFilter] = useState('');
    const [searchImage, setSearchImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(STATUS.idle);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);

    const toggleModal = data => {
        setShowModal(prevShowModal => !prevShowModal);
        setSearchImage(data);
    };

    const smoothScroll = () => {
        setTimeout(() => {
            window.scrollBy({
                top: document.documentElement.clientHeight,
                behavior: 'smooth',
            });
        }, 400);
    };

    useEffect(() => {
        if (!filter) {
            return;
        }
        apiService.resetPage();
        setPage(apiService.page);
        setStatus(STATUS.pending);
        apiService.searchQuery = filter;
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

    const onLoadMoreClick = () => {
        apiService.incrementPage();
        setPage(apiService.page);
    };

    return (
        <div className="App">
            <Searchbar onSubmit={setFilter} />
            {((status === STATUS.pending && page !== 1) ||
                status === STATUS.resolved) && (
                <ImageGallery toggleModal={toggleModal} photos={photos} />
            )}
            {status === STATUS.resolved && <Button onClick={onLoadMoreClick} />}
            {status === STATUS.pending && <Spinner />}
            <Toast />
            {showModal && (
                <Modal searchImage={searchImage} onClose={toggleModal} />
            )}
        </div>
    );
}
