import axios from 'axios';

const axiosSecure = axios.create({
    baseURL:'http://localhost:5007'
}) 
const useAxiosSecure=()=>{
    return axiosSecure;
}

export default useAxiosSecure;