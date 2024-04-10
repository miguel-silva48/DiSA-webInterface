import axios from 'axios';
import { API_BASE_URL } from '../constants';

const fetchData = async (endpoint) => {
    try {
        const result = await axios.get(`${API_BASE_URL}/${endpoint}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

const postData = async (endpoint, data) => {
    try {
        const result = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const updateData = async (endpoint, data) => {
    try {
        const result = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async (endpoint) => {
    try {
        const result = await axios.delete(`${API_BASE_URL}/${endpoint}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export { fetchData, postData, updateData, deleteData };