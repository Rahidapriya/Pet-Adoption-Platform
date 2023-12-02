/* eslint-disable react/no-unknown-property */

import { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";


// import { useState } from "react";
// import { useRef } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import registerhero from '../../assets/Sign up.png'
import Navbar from "../../shared/navbar/Navbar";
import { AuthContext } from "../../components/providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// import backgroundImage from '../../assets/loginback.jpg'
   
 

 

const Register = () => {
    
  const axiosPublic =useAxiosPublic();
  useEffect(()=>{
    AOS.init({duration:'1000'})
  })
  const navigate=useNavigate();
  // const [registerError,setRegisterError]=useState('')
  // const [success,setsuccess]=useState(false)
  const {createUser,profileInfo}= useContext(AuthContext);
 

  const handleRegister = (e) => {
    e.preventDefault();

    // const form = new FormData(e.currentTarget);
    const name=e.target.name.value;
    const email=e.target.email.value;
  
    const password=e.target.password.value;
    const photo = e.target.photo.value;
    const accepted=e.target.checkbox.checked;
 

    if(!accepted){
      
      toast.error('Please Accept Terms And Condition', {
        position: toast.POSITION.RIGHT_TOP,
        autoClose: 6000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored", 
      });
      return;
  }


  if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/.test(password)){
    // alert("please write a valid password")
    toast.warning('Please Entered a Valid Password', {
      position: toast.POSITION.RIGHT_TOP,
      autoClose: 6000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored", 
    });
    return;
  }
    createUser(email, password)
      .then((result) => {
        console.log('this new user',result.user);
       
        profileInfo(name, photo)
          .then(() => {
          const userInfo={
            name:name,
            email:email,
            photoURL:photo,
            role:'User',
          } 
          axiosPublic.post('/users',userInfo)
          .then(res=>{
            if(res.data.insertedId){
              console.log('user added database');
              swal("Hurray!", "You Have Registered Successfully", "success");
            
           
              e.target.reset();
          navigate(location?.state?location.state:'/'); 
           
            }
          }) 
        }) 
              
          .catch((error) => {
            console.log("Error updating user profile:", error);
          });
      })
      .catch((error) => {
        // setRegisterError(error.message)
       toast.error(error.message, {
      position: toast.POSITION.RIGHT_TOP,
      autoClose: 6000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored", 
    });
      });
  };
    return (
        <div className=" bg-pink-200">
          <Navbar></Navbar>
          <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="w-4/12"><img src={registerhero} alt="" /></div>
          <div className="mx-auto  " data-aos="fade-right">
            <div className="relative flex flex-wrap justify-center items-center flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
  <h4 className=" text-center text-5xl font-bold block font-sans text-black leading-snug tracking-normal text-blue-gray-900 antialiased">
    Sign <span className="text-[#ff0000]">Up</span> 
  </h4>
  <p className=" text-center mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
    Enter your details to register.
  </p>
  <form onSubmit={handleRegister} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 py-6 rounded-md px-6 shadow-md">
    <div className="mb-4 flex flex-col gap-6">
      <div className="relative h-11 w-full min-w-[200px]">
        <input
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeHolder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-950 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeHolder=" " type="text" name="name" id="name" required
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeHolder-shown:text-sm peer-placeHolder-shown:leading-[4.1] peer-placeHolder-shown:text-blue-gray-500 peer-placeHolder-shown:before:border-transparent peer-placeHolder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-950  peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-purple-950  peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-purple-950  peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeHolder-shown:text-blue-gray-500">
          Name
        </label>
      </div>
      <div className="relative h-11 w-full min-w-[200px]">

      <input
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeHolder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-950 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeHolder=" " type="text" name="photo" id="photo" required
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeHolder-shown:text-sm peer-placeHolder-shown:leading-[4.1] peer-placeHolder-shown:text-blue-gray-500 peer-placeHolder-shown:before:border-transparent peer-placeHolder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-950  peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-purple-950  peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-purple-950  peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeHolder-shown:text-blue-gray-500">
          Photo URL
        </label>

        {/* <input
          className="peer  h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-950 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" htmlFor="file_input"
          placeHolder=" " id="file_input"
          type="file" name='photo'
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-950  peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-purple-950  peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-purple-950  peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
         Photo URL
        </label> */}


      </div>
      <div className="relative h-11 w-full min-w-[200px]">
        <input
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-950 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeHolder="" type="email" name="email" id="email" required
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-950  peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-purple-950  peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-purple-950  peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Email
        </label>
      </div>
      <div className="relative h-11 w-full min-w-[200px]">
        <input
          type="password"
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-950 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeHolder=" "  name="password" id="password" required
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-950  peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-purple-950  peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-purple-950  peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Password
        </label>
      </div>
    </div>
    <div className="inline-flex items-center">
      <label
        className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
        htmlFor="checkbox"
        data-ripple-dark="true"
      >
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#ff0000] checked:bg-[#ff0000] checked:before:bg-[#ff0000] hover:before:opacity-10"
          id="checkbox" name="checkbox"
        />
        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              // clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label
        className="mt-px cursor-pointer select-none font-light text-gray-700"
        htmlFor="checkbox" name='checkbox'
      >
        <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
          I agree the
          <a
            className="font-medium transition-colors hover:text-[#ff0000]"
            href="#"
          >
            &nbsp; <span className="text-black font-bold">Terms and Conditions</span>
          </a>
        </p>
      </label>
    </div>
    <button
      className="mt-6 block w-full select-none rounded-lg bg-[#ff0000] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="submit" value='Register'
      data-ripple-light="true"
    >
      Register
    </button>
    <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
      Already have an account? 
      <Link to='/login'
        className="font-medium text-[#ff0000] transition-colors hover:text-blue-700"
        
      >
        Sign In
      </Link>
    </p>
  </form>
  <p className='md:w-96 text-sm text-center'>By continuing, you agree to Boipoka's <span className='font-bold'>Terms of Service</span>; Opens a new tab and acknowledge you've read our Privacy Policy; Opens a new tab. </p>
  {/* {
    registerError && <p>{registerError}</p>
  }
  {
    success && <p>{success}</p>
  } */}
 
</div>
        </div>
        </div>
        </div>
        <ToastContainer />
        </div>
    );
};

export default Register;