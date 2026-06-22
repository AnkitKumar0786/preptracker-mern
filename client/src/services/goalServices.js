import axiosInstance from "../utils/axiosInstance";

const goalServices = {

    CreateGoal: async(goalData)=>{
       try{
            const response = await axiosInstance.post('/goal/create',goalData);
            return response.data;
       }catch(error){
            throw error.response?.data || error.message
       }
    },
    
    getAllGoals: async()=>{
       try{
            const response = await axiosInstance.get('/goal/getall');
            return response.data;
       }catch(error){
            throw error.response?.data || error.message
       }
    },
    
    updateGoal: async(id,data)=>{
       try{
            const response = await axiosInstance.patch(`/goal/update/${id}`,data);
            return response.data;
       }catch(error){
            throw error.response?.data || error.message
       }
    },
    
    deleteGoal: async(id)=>{
       try{
            const response = await axiosInstance.delete(`/goal/delete/${id}`);
            return response.data;
       }catch(error){
            throw error.response?.data || error.message
       }
    }
    
}

export default goalServices;