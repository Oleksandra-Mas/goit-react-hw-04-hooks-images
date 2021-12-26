import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
export default class App extends Component {
    state = { filter: '', showModal: false, searchImage: null };

    handleSubmit = filter => {
        this.setState({ filter });
    };
    toggleModal = data => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
            searchImage: data,
        }));
    };
    render() {
        const { filter, showModal, searchImage } = this.state;
        return (
            <div className="App">
                <Searchbar onSubmit={this.handleSubmit} />
                <ImageGallery toggleModal={this.toggleModal} filter={filter} />
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
                    <Modal
                        searchImage={searchImage}
                        onClose={this.toggleModal}
                    />
                )}
            </div>
        );
    }
}
