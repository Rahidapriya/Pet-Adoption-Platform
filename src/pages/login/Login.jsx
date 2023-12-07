
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';


import { useContext } from 'react';

// import { useState } from 'react';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import logincat from '../../assets/logincat.jpg'
  import loginhero from '../../assets/login.png' 


import Navbar from '../../shared/navbar/Navbar';
import { AuthContext } from '../../components/providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';

 
const Login = () => {

  useEffect(()=>{
    AOS.init({duration:'1000'})
  })

  const {googleSignIn,signIn}=useContext(AuthContext)
  // const [success,setsuccess]=useState(false)
  // const [loginError,setLoginError]=useState('')
  const location=useLocation();
   const navigate=useNavigate()
const axiosPublic=useAxiosPublic();


   const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const userInfo={
          email:result.user?.email,
          name:result.user?.displayName,
          photoURL:result.user?.photoURL,
          role:'User'
        }
        axiosPublic.post('/users',userInfo)
        .then(res=>{
          console.log(res.data);
        
          navigate('/')
        })
        
        // e.target.reset();
        swal("Hurray!", "You Have Logged in Successfully", "success");
      
        const destination = location.state ? location.state : '/';
  
      console.log('my destiny:',destination);
        navigate(destination);
      })
      .catch((error) => {
        console.log(error);
      });
  };

    const handleLogin=e=>{
      e.preventDefault();
  
      const form =new FormData(e.currentTarget);
      const email=form.get('email')
      const password=form.get('password')
      console.log(email,password);
      
      signIn(email,password)
      .then(result=>{
        console.log(result.user);
       
        
        swal("Hurray!", "You Have Login Successfully", "success");
        
        e.target.reset();
        navigate(location?.state?location.state:'/');
      })
      .catch(error=>{
        console.log(error.massage);
        toast.error('You have Entered Wrong Email and Password', {
          position: toast.POSITION.RIGHT_TOP,
          autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored", 
    
        });
        
      })

    }

   
   
   
    return (
      
        <div>
              <Navbar></Navbar>
              
              <div className=" min-h-screen bg-base-200">
             
             <div>
                <h4 className="block  text-5xl mt-14 pt-10 text-black text-center font-bold">
   Log<span className='text-pink-600'>in</span>
  </h4>
  <p className="mt-1 block  text-base font-normal text-warning  text-center">
    Enter your details to Login.
  </p>
                </div>
                <div className='hero'>
  <div className="hero-content flex-col lg:flex-row">
  <div className='w-6/12 h-8/12 rounded-lg relative'>
            {/* Add a container for the image and text */}
            <div className="relative">
              {/* Image */}
              <img src={logincat} alt="" className="w-full h-full object-cover rounded-lg" />
              {/* Text overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg"></div>
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-center text-white -translate-y-1/2 text-sm lg:text-3xl  ">
                Welcome to <span className='lg:text-4xl text-xl text-pink-600 px-4 py-2 rounded-md font-bold'>four Pows</span> Pet Adopting center. <br />Login For Explore our Website
              </p>
            </div>
          </div>

 <div className="  mx-3 px-3 bg-white-200 border-2 border-pink-500 rounded-lg" >
            <div className="relative flex flex-col justify-center items-center rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
  
     

<form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96 px-3 py-10 shadow-md rounded-md" onSubmit={handleLogin}>
    <div className="mb-4 flex flex-col gap-6">
     
     
      <div className="relative h-11 w-full min-w-[200px]">
        <input
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-950 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder="" type="email" name="email" id="email"
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-950 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-purple-950 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-purple-950 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Email
        </label>
      </div>
      <div className="relative h-11 w-full min-w-[200px]">
        <input
          type="password"
          className=" p-4 peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-950 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "  name="password" id="password"
        />
        <label className=" before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-950 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-purple-950 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-purple-950 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Password
        </label>
      </div>
    </div>
    <p className=' text-sm mt-10 text-black'>Forget your Password?</p>
    <button
      className="relative mt-6 block w-full select-none rounded-lg bg-pink-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="submit" value='Register'
      data-ripple-light="true"
    >
        {/* <BiLogoGmail className=' absolute w-6 h-6  left-20 -mt-1'></BiLogoGmail> */}
      Log in
    </button>
   
   
  </form>

  <p className='text-center mt-2'>OR</p>
    <button
      className=" relative mt-2 block md:w-96 w-full mx-3 select-none rounded-lg  bg-warning  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="submit" value='Register'
      data-ripple-light="true" onClick={handleGoogle}
    >
    <FcGoogle className='hidden lg:flex absolute w-6 h-6 left-20 -mt-1'></FcGoogle> Continue with Google
    </button>
      <p className="p-2 text-sm md:p-5">Do not have an account? Please <Link to='/register' className=" text-pink-600 font-bold">Register</Link></p>
  

    </div>
  </div>
  </div>
             </div>
  </div>
  <ToastContainer />
</div>
    );
};

export default Login;