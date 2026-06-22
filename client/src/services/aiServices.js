import axiosInstance from "../utils/axiosInstance";


const aiServices = {

    generateNotes: async(topic)=>{
        try{
            const response = await axiosInstance.post('/ai/generate',{topic})
            return response.data
        }catch(error){
            throw error.response?.data || error.message
        }
    }
}

export default aiServices;