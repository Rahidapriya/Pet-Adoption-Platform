import axios from 'axios';

const axiosSecure = axios.create({
    baseURL:'https://serversite-pet-adoption.vercel.app'
}) 
const useAxiosSecure=()=>{
    return axiosSecure;
}

export default useAxiosSecure;