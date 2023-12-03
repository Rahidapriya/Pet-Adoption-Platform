import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:'https://serversite-pet-adoption.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;