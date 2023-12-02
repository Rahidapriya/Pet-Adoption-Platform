// import React from 'react';

//     /* eslint-disable react/prop-types */
// import  { useContext } from 'react';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../../components/providers/AuthProvider';


// const MyAddedPetsCard = ({ myPet, myAddedPets, setMyAddedPets }) => {
//   const { _id, name, category,image, addedDate, shortdesp,longdesp,age,location,adopted } = myPet;
// //   const { user } = useContext(AuthContext);
//   const handleDelete = (_id, bookId) => {
//     console.log("deleteid:", _id);
  
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, return it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         console.log('delete confirm');
  
     
//                     fetch(`https://id-8-serversite.vercel.app/pets/${_id}`, {
//                       method: 'DELETE',
//                     })
//                       .then(res => res.json())
//                       .then(data => {
//                         console.log(data);
//                         if (data.deletedCount > 0) {
//                           // Book deleted successfully, now update the frontend state
//                           const remaining = myAddedPets.filter(book => book._id !== _id);
//                           setMyAddedPets(remaining);
//                         }
//                       });
//                   }
//                 });
            
         
//   };
  



//   return (
//     <div>
//         <div className="overflow-x-auto">
//   <table className="table">
//     {/* head */}
//     <thead>
//       <tr>
//         {/* <th>
//           <label>
//             <input type="checkbox" className="checkbox" />
//           </label>
//         </th> */}
//         <th></th>
//         <th>Index</th>
//         <th>Name</th>
//         <th>Category</th>
//         <th>Adopt Status</th>
//         <th>Button</th>
//       </tr>
//     </thead>
//     <tbody>
//       {/* row 1 */}
//       <tr>
       
//         <td>
//           <div className="flex items-center gap-3">
//             <div className="avatar">
//               <div className="mask mask-squircle w-12 h-12">
//                 <img src={image} alt="Avatar Tailwind CSS Component" />
//               </div>
//             </div>
//             {/* <div>
//               <div className="font-bold">{name}</div>
             
//             </div> */}
//           </div>
//         </td>
//         <td>
            
//         </td>
//         <td>
//           {name}
//           {/* <br/>
//           <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
//         </td>
//         <td>{adopted}</td>
//         <th>
//           <button className="btn btn-ghost btn-xs">Update</button>
//           <button className="btn btn-ghost btn-xs">Delete</button>
//           <button className="btn btn-ghost btn-xs">Adopt</button>
//         </th>
//       </tr>
  
      
//     </tbody>
//     {/* foot */}
//     <tfoot>
//       <tr>
//         <th></th>
//         <th>Name</th>
//         <th>Job</th>
//         <th>Favorite Color</th>
//         <th></th>
//       </tr>
//     </tfoot>
    
//   </table>
// </div>
//       {/* <div className="relative flex flex-col text-gray-700 bg-gray-300 shadow-md w-60 rounded-sm bg-clip-border">
//         <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white h-40 w-52 bg-clip-border">
//           <img src={image} className="object-cover" />
//         </div>
//         <div className="p-6">
//           <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
//             {name}
//           </p>
//           <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
//             {age}
//           </p>
//           <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
//             {shortdesp}
//           </p>
//           <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
//             Added Date: {addedDate}
//           </p>
          
//         </div>
//         <div className="p-6 pt-0 bg-warning">
//           <button onClick={() => handleDelete(_id)} className="float-right w-full font-semibold mt-10 btn text-black hover:text-red-500 text-xs">
//             RETURN BOOK
//           </button>
//         </div>
//       </div> */}
//     </div>
//   );
// };



// export default MyAddedPetsCard;