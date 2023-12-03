
import { NavLink } from 'react-router-dom';
import AddPet from '../addpet/AddPet';
import { useEffect, useState } from 'react';
import logo from "../../assets/logo.png";
import AdoptionReqCard from './adoptionReq/AdoptionReqCard';
import AdoptionReq from './adoptionReq/AdoptionReq';

const AdoptionReqDashboard = () => {
  const [users, setUsers] = useState([]);
  // const axiosSecure =useAxiosSecure();
  useEffect(() => {
    fetch(`http://localhost:5007/users`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched users:', data);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching my added users:', error));
  }, []);
  const navLinks =
  <>
  <div className="flex flex-col items-center mb-5">
               <div className=" bg-white rounded-full p-5 w-24"> <img src={logo}  alt="" /></div>
              <div className="  text-2xl font-bold ">FourPows</div>
               </div>
    {users.role === "Admin" && (
      <>
        <li>
          <NavLink
            to="/allusers"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-white"
                : isActive
                ? "text-warning  text-lg font-bold underline underline-offset-8 hover:text-red  "
                : ""
            }
          >
            All Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/allpetsadmin"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-white"
                : isActive
                ? "text-warning font-bold underline underline-offset-8 hover:text-red  "
                : ""
            }
          >
            All Pets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/alldonationcampadmin"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-white"
                : isActive
                ? "text-warning font-bold underline underline-offset-8 hover:text-red  "
                : ""
            }
          >
            All Donation Campaign
          </NavLink>
        </li>
        <div className=' divider text-white'></div>
      </>
    )}
      <li><NavLink to="/addpet" className={({ isActive, isPending }) =>
        isPending ? "pending  text-white" : isActive ? "text-warning  font-bold underline underline-offset-8 hover:text-red  " : ""
      }>Add a Pet</NavLink></li>
      <li><NavLink to="/myaddedpets" className={({ isActive, isPending }) =>
        isPending ? "pending  text-white" : isActive ? "text-warning font-bold  underline underline-offset-8 hover:text-red  " : ""
      }>My Added Pets</NavLink></li>
      <li><NavLink to="/adoptionreq" className={({ isActive, isPending }) =>
        isPending ? "pending text-white" : isActive ? "text-warning font-bold  underline underline-offset-8 hover:text-red  " : ""
      }>Adoption Request</NavLink></li>
      <li><NavLink to="/createdonationcamp" className={({ isActive, isPending }) =>
        isPending ? "pending text-white" : isActive ? "text-warning font-bold  underline underline-offset-8 hover:text-red  " : ""
      }>Create Donation Campaigns</NavLink></li>
      <li><NavLink to="/mydonationcamp" className={({ isActive, isPending }) =>
        isPending ? "pending text-white" : isActive ? "text-warning font-bold  underline underline-offset-8 hover:text-red  " : ""
      }>My Donation Campaign</NavLink></li>
      <li><NavLink to="/mydonation" className={({ isActive, isPending }) =>
        isPending ? "pending text-white" : isActive ? "text-warning font-bold  underline underline-offset-8 hover:text-red  " : ""
      }>My Donation </NavLink></li>
      <hr />
      <li className="pt-4 "><NavLink to="/" className={({ isActive, isPending }) =>
        isPending ? "pending  text-white" : isActive ? "text-warning font-bold  underline underline-offset-8  hover:text-red " : ""
      }>Home</NavLink></li>
  
  
    </>
  return (
    <div className='grid grid-cols-4'>
      <div className=' min-h-[100vh] bg-[#D52B5C] col-span-1 hidden lg:flex'>

        <ul className="menu mt-6 z-[1] p-2 dropdown-content  text-white   ">
          {navLinks}
        </ul>

      </div>

      <div className=' min-h-[100vh] bg-pink-100 lg:col-span-3 col-span-4 '>
        <div className="dropdown absolute mt-10">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <div className=' h-40 bg-warning py-10 '>
          <p className='border-y-2 w-4/12 mx-auto text-3xl  font-bold text-center '>User Dashboard</p>
        </div>
        {/* con */}
<AdoptionReq></AdoptionReq>

      </div>
    </div>
  );
};

export default AdoptionReqDashboard;