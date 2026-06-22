import React,{useState,createContext,useEffect} from 'react'
import authService from '../services/authServices'


export const AuthContext = createContext(null);

export const AuthProvider = ({ children })=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)  // while fetching data from backend

    useEffect(() => {
        const checkUserSession = async()=>{
            try{
                const data = await authService.getProfile();
                setUser(data.user);
            }catch(error){
                setUser(null)
            }finally{
                setLoading(false) // stop loading
            }
        };

        checkUserSession(); // run  one time only when web starts

    },[]);

    const login = async(userDetail)=>{
        const data = await authService.loginUser(userDetail);
        setUser(data.user);
        return data;
    }


    const logout = async()=>{
        await authService.logoutUser();
        setUser(null)
    }

    const value = {
        user,
        loading,
        login,
        logout
    };

    return ( // here children is app ( that we get after wrapping the app by AuthProvider)
        <AuthContext.Provider value={value}>
            {!loading && children}    
        </AuthContext.Provider> 
    )
}