import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
export default function App() {
    const [filter, setFilter] = useState('');
    const [searchImage, setSearchImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = data => {
        setShowModal(prevShowModal => !prevShowModal);
        setSearchImage(data);
    };
    return (
        <div className="App">
            <Searchbar onSubmit={setFilter} />
            <ImageGallery toggleModal={toggleModal} filter={filter} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {showModal && (
                <Modal searchImage={searchImage} onClose={toggleModal} />
            )}
        </div>
    );
}
