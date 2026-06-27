import axios from "axios";

const API_BASE_URL = import.env.VITE_API_URL || "http://localhost:3000/api";

export const getExpenseApi = async (params ={}) => {
    const token = localStorage.getItem("token");

    const searchParam = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !==null && value !== ""){
            searchParam.append(key, String(value));
        }
    });

    const queryString = searchParam.toString();
    const url = queryString
    ? `${API_BASE_URL}/expenses/expenses?${queryString}`
    : `${API_BASE_URL}/expenses/expenses`;

    const response = await axios.get(url, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    });

    return response.data;
}