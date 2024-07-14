import axios from 'axios'
import { getRefreshedToken,isAccessTokenExpired,setAuthUser} from './auth'
import { API_BASE_URL } from './constants'
import  Cookies   from "js-cookie";

const useAxios=()=>{
    const  access_token=Cookies.get("access_token");
    const  refresh_token=Cookies.get("refresh_token");

    const axiosInstance=axios.create({
        baseURL:API_BASE_URL,
        headers:{
            Authorization:`Bearer ${access_token}`
        },
    });
    axiosInstance.interceptors.response.use(async(req)=>{
        if(!isAccessTokenExpired){
            return req;
        }
        const response =await getRefreshedToken(refresh_token);
        setAuthUser(response.access,response.refresh);
        req.headers.Authorization=`Bearer ${response.data?.access}`;
        return req;

    });
    return axiosInstance;
};

export default useAxios;