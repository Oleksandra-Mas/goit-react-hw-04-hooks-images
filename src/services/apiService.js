import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '23883543-c0e8a740f16e18e27aeb57e6b';
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    async searchPhoto() {
        const url = `${BASE_URL}/?q=${this.searchQuery}&page=${this.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        const response = await axios.get(url);
        return response.data;
    }
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    setPage(page) {
        this.page = page;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
