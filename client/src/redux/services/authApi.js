import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const loginUserApi = async (credentals) => {
    const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentals
    );

    return response.data;
}