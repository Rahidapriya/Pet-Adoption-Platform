import { useFormik } from "formik";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { AuthContext } from "../../components/providers/AuthProvider";
import { toast } from "react-toastify";
import { addnewpet } from "../../components/schemas";
import axios from "axios";

const AddPet = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const saveImage = async () => {
    try {
      if (!image) {
        return toast.error("Please upload an image");
      }
  
      const formData = new FormData();
      formData.append("image", image);
      
  
      const response = await axios.post("https://api.imgbb.com/1/upload?key=055a245dd93198ad79e84b535cd64548", formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      });
      console.log(response.data);
      
      if (response.data.status === 200) {
        setUrl(response.data.data.url);
        console.log(response.data.data.url);
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  // const saveImage = async () => {
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "petadding");
  //   data.append("cloud_name", "dtwz2gkbz");

  //   try {
  //     if (image === null) {
  //       return toast.error("Please Upload image");
  //     }

  //     const res = await fetch('https://api.cloudinary.com/v1_1/dtwz2gkbz/image/upload', {
  //       method: "POST",
  //       body: data
  //     });

  //     const cloudData = await res.json();
  //     setUrl(cloudData.url);
  //     console.log(cloudData.url);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // }
console.log('img',url);
  const initialValues = {
    name: "",
    age: "",
    category: "",
    location: "",
    shortdesp: "",
    longdesp: "",
    photo: "",
  };

  const handleCategorySelectChange = (selectedOption) => {
    setFieldValue("category", selectedOption);
    setCategory(selectedOption);
  };

  const categoryOptions = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Bird", label: "Bird" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Lion", label: "Lion" },
  ];

  const { values,errors,touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    // validationSchema:addnewpet,
    onSubmit: async () => {
      try {
        await saveImage(); // Wait for the image to be saved before proceeding
        if (!url) {
            return toast.error("Image not uploaded successfully. Please try again.");
          }
        // Rest of the code for creating and submitting the new pet
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US");
        const formattedTime = currentDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
  
        const newPet = {
          image: url || 'photo',
          name: values.name,
          age: values.age,
          location: values.location,
          category: values.category.value,
         
          shortdesp: values.shortdesp,
          longdesp: values.longdesp,
         
          // reqId:_id;
          addedDate: `${formattedDate} ${formattedTime}`,
          // adopt_req: false,
          adopted:false,
          userEmail: user.email,
        };
        console.log('userEmailAddPet',user.email);
  
        const response = await fetch("https://serversite-pet-adoption.vercel.app/pets", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newPet),
        });
  
        console.log(newPet);
  
        const data = await response.json();
        console.log(data);
  
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Pet Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate('/');
        }
      } catch (error) {
        console.error("Error adding pet:", error);
      }
    },
  });
  



  
    return (
        <div>
      <div className="flex items-center justify-center p-12 w-full lg:w-10/12 mx-auto bg-base-400 mt-16 rounded-xl">
        <div className="mx-auto w-full max-w-[550px] shadow-lg p-6 rounded-md">
          <form onSubmit={handleSubmit}>
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
                    {image
                      ? <img
                        className="w-10 lg:w-10 rounded-xl"
                        src={image ? URL.createObjectURL(image) : ""}
                        alt="img"
                      />
                      : <img
                        src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                        className="w-10"
                      />}
                  </label>
                  <input
                    id="file-upload"
                    className='text-white'
                    type="file"
                    name="photo"
                    value={values.photo}
                    onBlur={handleBlur}
                    
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                 
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
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  autoComplete="off"
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
          value={category}
          required
          options={categoryOptions}
          onChange={handleCategorySelectChange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] focus:border-[#6A64F1] focus:shadow-md"
        />
         {errors.category && touched.category? (<p className=" text-error">{errors.category}</p>):null}
      </div>
              {/* <div className="mb-5">
                <label htmlFor="pet_category" className="mb-3 block text-base font-medium text-[#07074D]">
                  Pet Category
                </label>
                <select
                  name="pet_category"
                  id="pet_category"
                  value={category_name}
                  autoComplete="off"
                  onChange={handleCategorySelectChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">Select</option>
                  <option value="Novel">Dog</option>
                  <option value="History">Cat</option>
                  <option value="Drama">Bird</option>
                  <option value="Mystery">Rabbit</option>
                  <option value="Mystery">Lion</option>
                </select>
              </div> */}
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
                      autoComplete="off"
                      placeholder="Pet Age"
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
                  value={values.shortdesp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  autoComplete="off"
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
          value={values.longdesp}
          onChange={handleChange}
          onBlur={handleBlur}
          min="0"
          autoComplete="off"
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
                Add Pet
              </button>
              </div>
            </form>
          </div>
        </div>
        </div>
    );
};

export default AddPet;