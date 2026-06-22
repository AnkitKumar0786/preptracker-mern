import axiosInstance from "../utils/axiosInstance";

const authService ={
                    
    registerUser: async (userData) => {
        try{
            const response = await axiosInstance.post('/auth/register',userData);
            return response.data
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    loginUser: async (userData) =>{
        try{
            const response = await axiosInstance.post('/auth/login',userData)
            return response.data
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    logoutUser: async() => {
        try{
            const response = await axiosInstance.post('/auth/logout')
            return response.data
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    getProfile: async() =>{
        try{
            const response = await axiosInstance.get('/auth/profile')
            return response.data
        }catch(error){
            throw error.response?.data || error.message;
        }
    }
}

export default authService;