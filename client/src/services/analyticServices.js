import axiosInstance from "../utils/axiosInstance";

const analyticService = {
    dashboard: async () => {
        try {
            const response = await axiosInstance('/analytics/dashboard');
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    difficulty: async()=>{
        try{
            const response = await axiosInstance('/analytics/difficulty');
            return response.data;
        }catch(error){
            throw error.response?.data || error.message
        }
    },

    topics: async()=>{
        try{
            const response = await axiosInstance('/analytics/topics')
            return response.data;
        }catch(error){
            throw error.response?.data || error.message
        }
    },

    monthly: async()=>{
        try{
            const response = await axiosInstance('/analytics/monthly')
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    }

}

export default analyticService;