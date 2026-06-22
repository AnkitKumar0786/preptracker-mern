import axiosInstance from "../utils/axiosInstance";

const profileServices = {

    getProfile: async () => {
        try {
            const response = await axiosInstance.get('/auth/profile');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;    
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await axiosInstance.patch(`/auth/updateprofile`, profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;    
        }
    }
    
};

export default profileServices;