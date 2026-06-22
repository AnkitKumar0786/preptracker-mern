import axiosInstance from "../utils/axiosInstance";

const problemService = {
    createProblem: async(problemData) => {
        try{
            const response = await axiosInstance.post('/problem/create',problemData);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message
        }
    },

    getAllProblem: async() => {
        try{
            const response = await axiosInstance.get('/problem/getall');
            return response.data;
        }catch(error){
            throw error.response?.data || error.message
        }
    },

    updateProblem: async(id,data) => {
        try{
            const response = await axiosInstance.patch(`/problem/update/${id}`,data);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message
        }
    },

    deleteProblem: async(id) => {
        try{
            const response = await axiosInstance.delete(`/problem/delete/${id}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message
        }
    },

    searchProblem: async(id) => {
        try{
            const response = await axiosInstance.get(`/problem/search/${id}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message
        }
    },
}

export default problemService;