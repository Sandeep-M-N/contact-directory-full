// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust this to your API endpoint

export const register = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Registration failed');
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Login failed');
    }
};

export const getContacts = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/contacts`, {
            headers: { Authorization:`Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to fetch contacts');
    }
};

export const addContact = async (token, contact) => {
    try {
        const response = await axios.post(`${API_URL}/contacts`, contact, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to add contact');
    }
};

export const updateContact = async (token, id, contact) => {
    try {
        const response = await axios.put(`${API_URL}/contacts/${id}`, contact, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to update contact');
    }
};

export const deleteContact = async (token, id) => {
    try {
        const response = await axios.delete(`${API_URL}/contacts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to delete contact');
    }
};

// New function to get groups
export const getGroups = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/groups`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to fetch groups');
    }
};