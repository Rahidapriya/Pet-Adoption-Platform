import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllUsers = () => {

    const [users, setUsers] = useState([]);
    const axiosSecure =useAxiosSecure();
    useEffect(() => {
      fetch(`https://serversite-pet-adoption.vercel.app/users`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched users:', data);
          setUsers(data);
        })
        .catch(error => console.error('Error fetching my added users:', error));
    }, []);

    const handleMakeAdmin=user=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            console.log(res.data);
            if(res.data.modifiedCount>0){
                
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: "btn btn-success",
                      cancelButton: "btn btn-danger"
                    },
                    buttonsStyling: false
                  });
                  swalWithBootstrapButtons.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      swalWithBootstrapButtons.fire({
                        title: "Success!",
                        text: ` ${user.name} is an Admin now`,
                        icon: "success"
                      });
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        icon: "error"
                      });
                    }
                  });
            }
        })
    }
    return (
        <div>
            <div>

            </div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
      <th>Profile Image</th>
        <th>Name</th>
        <th>Email</th>
         <th>Role</th>
        <th>Change Role</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {users.map(user => (
              <tr key={user._id}>
     
       
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={user.photoURL} />
              </div>
            </div>
            
          </div>
        </td>
        <td>
         {user.name}
          
        </td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <th>
            {user.role === 'Admin'?'Admin':<button onClick={()=>handleMakeAdmin(user)} className="btn btn-primary btn-sm">Make Admin</button>}
          
        </th>
      </tr>
    
   ))}
    
      
    </tbody>
    {/* foot */}
    
    
  </table>
</div>
        </div>
    );
};

export default AllUsers;