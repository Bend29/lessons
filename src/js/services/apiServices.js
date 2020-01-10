import 'babel-polyfill'
import axios from 'axios';
import config from "../config/apiConfig";


/**
 * /countries - array of countries
 * /cities - array of cities
 * /prices/cheap - array
 */
class Api {
    constructor(config) {
        this.url = config.url;
    }

    async getCountries() {
        try {
            const response = await axios.get(`${this.url}/countries`);
            return response.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async getCities() {
        try {
            const response = await axios.get(`${this.url}/cities`);
            return response.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    getPrices(params) {

    }
}

const api = new Api(config);

export default api;
