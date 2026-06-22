import axiosInstance from "../utils/axiosInstance";

const noteServices = {

    createNote: async(noteData)=>{
        try{
            const response = await axiosInstance.post('/note/create',noteData);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;    
        }
    },

    updateNote: async(id,noteData)=>{
        try{
            const response = await axiosInstance.patch(`/note/update/${id}`,noteData);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;    
        }
    },

    deleteNote: async(id)=>{
        try{
            const response = await axiosInstance.delete(`/note/delete/${id}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;    
        }
    },

    getAllNote: async()=>{
        try{
            const response = await axiosInstance.get('/note/getall');
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;    
        }
    },

    searchNote: async(id)=>{
        try{
            const response = await axiosInstance.get(`/note/search/${id}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;    
        }
    },

    
}

export default noteServices;