import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";

import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../../components/providers/AuthProvider";
// import { useRef } from "react";

const UpdatePet = () => {
  const { user } = useContext(AuthContext);
  const pet=useLoaderData()
  const [updateImage, setUpdateImage] = useState('');
  console.log('update image dekhbo',updateImage);
  const [url, setUrl] = useState('');

  const navigate = useNavigate();
  const { petId } = useParams();
  const {_id,name,shortdesp,longdesp,age,location,image,category}=pet;
  const [updateCategory, setUpdateCategory] = useState(category);
  const [photourl,setPhotourl]=useState('link')
  const categoryOptions = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Bird", label: "Bird" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Lion", label: "Lion" },
  ];

  const [initialValues, setInitialValues] = useState({
    name: name,
    age: age,
    category: "",
    location: location,
    shortdesp: shortdesp,
    longdesp: longdesp,
    photo: image,
  });
console.log('name updated',name);
  useEffect(() => {
    if (!petId) {
      // Handle the case where petId is undefined
      console.error('Pet ID is undefined');
      return;
    }
  
    const fetchPetData = async () => {
      try {
        const response = await fetch(`https://serversite-pet-adoption.vercel.app/pets/${petId}`);
        const data = await response.json();
  
        setInitialValues({
          name: data.name,
          age: data.age,
          category: { value: data.category, label: data.category },
          location: data.location,
          shortdesp: data.shortdesp,
          longdesp: data.longdesp,
          photo: data.image,  // Make sure this is correct
        });
  
        setUrl(data.image);
        setUpdateCategory({ value: data.category, label: data.category });
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };
  
    fetchPetData();
  }, [petId]);
  

  const saveImage = async () => {
    try {
      if (!updateImage) {
        return toast.error("Please upload an image");
      }

      const formData = new FormData();
      formData.append("image", updateImage);

      const response = await axios.post("https://api.imgbb.com/1/upload?key=055a245dd93198ad79e84b535cd64548", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
console.log('x',response.data);
      if (response.data.status === 200) {
        setUrl(response.data.data.display_url);
        console.log('matha kharap',response.data.data.url);
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  const handleCategorySelectChange = (selectedOption) => {
    setUpdateCategory(selectedOption);
    setFieldValue("category", selectedOption);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    onSubmit: async () => {
      try {
        await saveImage();
        if (!url) {
          return toast.error("Image not uploaded successfully. Please try again.");
        }

        const updatedPet = {
          image: url || 'photo',
          name: values.name,
          age: values.age,
          location: values.location,
          category: values.category.value,
          shortdesp: values.shortdesp,
          longdesp: values.longdesp,
          userEmail: user.email,
        };
        console.log('upadated pet....',updatedPet);
        // const fileInputRef = useRef(null); // Create a ref

        // const handleUpdateImage = (file) => {
        //   setFieldValue("photo", file);
        //   fileInputRef.current.value = '';
        // };
        const response = await fetch(`https://serversite-pet-adoption.vercel.app/pets/${petId}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedPet),
        });

        const data = await response.json();
        console.log(data);

        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Pet Info Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          // navigate('/');
        }
      } catch (error) {
        console.error("Error updating pet:", error);
      }
    },
  });
      console.log('image dekhbo',image);    
        

  return (
    <div>
      <div className="flex items-center justify-center p-12 w-full lg:w-10/12 mx-auto bg-blue-200 mt-16 rounded-xl">
        <div className="mx-auto w-full max-w-[550px] shadow-lg p-6 rounded-md">
        <form onSubmit={handleSubmit} >
            <div className='flex '>
              <div className="w-full">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Upload Image
                </label>
                <div className="input flex justify-end mb-5">
                  <p>Image file:</p>
                  <label
                    htmlFor="file-upload"
                    className="custom-file-upload">
                    {updateImage
                      ? <img
                        className="w-10 lg:w-10 rounded-xl"
                        src={updateImage ? URL.createObjectURL(updateImage) : ""}
                        alt="img"
                      />
 
                      : <img
                        src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                        className="w-10"
                      />}
                  </label>
                 <div>
                  <input type="text" defaultValue={image} />
                  <input
                    id="file-upload"
                    className='text-white'
                    type="file"
                    name="photo"
                    defaultValue={''}
                    // value={values.photo}
                    onBlur={handleBlur}
                    
                    onChange={(e) => setUpdateImage(e.target.files[0])}
                  />
                 </div>
                  {/* value={updateImage || values.photo} */}
                </div>
                {errors.photo && touched.photo? (<p className=" text-error">{errors.photo}</p>):null}
              </div>
            </div>
              {/* <div className="mb-5">
                <label htmlFor="photo" className="mb-3 block text-base font-medium text-[#07074D] ">
                  Add the Pet Image
                </label>
                <input
                  type="text"
                  name="photo"
                  id="photo"
                  placeholder="Image URL"
                  autoComplete="off"
                  value={values.photo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div> */}
              <div htmlFor='name' className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Add the Pet Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  // defaultValue={name}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  // autoComplete="off"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                 {errors.name && touched.name? (<p className=" text-error">{errors.name}</p>):null}
              </div>
              <div className="mb-5">
                <label htmlFor="pet_location" className="mb-3 block text-base font-medium text-[#07074D]">
                  Add the Pet Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="pet location"
                  // defaultValue={location}
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                 {errors.location && touched.location? (<p className=" text-error">{errors.location}</p>):null}
              </div>
             
              <div className="mb-5">
        <label htmlFor="pet_category" className="mb-3 block text-base font-medium text-[#07074D]">
          Pet Category
        </label>
        <Select
          name="pet_category"
          id="pet_category"
          
          value={updateCategory}
          required
          options={categoryOptions}
          onChange={handleCategorySelectChange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] focus:border-[#6A64F1] focus:shadow-md"
        />
         {errors.category && touched.category? (<p className=" text-error">{errors.category}</p>):null}
      </div>
              
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label htmlFor="age" className="mb-3 block text-base font-medium text-[#07074D]">
                      Pet Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                     
                      placeholder="Pet Age"
                      // defaultValue={age}
                      value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                     {errors.age && touched.age? (<p className=" text-error">{errors.age}</p>):null}
                  </div>
                </div>
                
              </div>
              <div className="mb-5">
                <label htmlFor="shortdesp" className="mb-3 block text-base font-medium text-[#07074D]">
                  Add Short Description
                </label>
                <input
                  type="text"
                  name="shortdesp"
                  id="shortdesp"
                  placeholder="Short Description"
                  // defaultValue={shortdesp}
                  value={values.shortdesp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  // autoComplete="off"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                 {errors.shortdesp && touched.shortdesp? (<p className=" text-error">{errors.shortdesp}</p>):null}
              </div>
              
              <div className="mb-5">
        <label htmlFor="longdesp" className="mb-3 block text-base font-medium text-[#07074D]">
          Add Long Description
        </label>
        <textarea
          name="longdesp"
          id="longdesp"
          placeholder="Long Description"
          // defaultValue={longdesp}
          value={values.longdesp}
          onChange={handleChange}
          onBlur={handleBlur}
          min="0"
          // autoComplete="off"
          rows="4" // Specify the number of rows for the text area
          className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md resize-none" // Added resize-none to disable resizing
        />
         {errors.longdesp && touched.longdesp? (<p className=" text-error">{errors.longdesp}</p>):null}
      </div>
              <div>
              <button
                type="submit"
                className="hover:shadow-form rounded-md hover:bg-blue-400 py-3 px-8 text-center text-base font-semibold text-white outline-none w-full bg-[#ff0000]"
              >
                Updat Pet
              </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePet;
