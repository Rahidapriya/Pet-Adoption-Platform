import React from 'react';


    import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../components/providers/AuthProvider";

const UpdateDonationCamp = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const{donation}=useLoaderData()
//   const{max_donation_limit,last_donation_date,shortdesp,longdesp}=donation;
  const { donationCampaignId } = useParams(); // Assuming you have a route parameter for the donation campaign ID

  // Fetch the existing donation campaign details using donationCampaignId
  useEffect(() => {
    const fetchDonationCampaign = async () => {
      try {
        const response = await fetch(`https://serversite-pet-adoption.vercel.app/adddonationcamp/${donationCampaignId}`);
        const data = await response.json();

        // Set initial values for the form
        setInitialValues({
          max_donation_limit: data.max_donation_limit,
          date: data.last_donation_date,
          shortdesp: data.shortdesp,
          longdesp: data.longdesp,
          photo: data.image,
        });

        // Set the initial image URL
        setUrl(data.image);
      } catch (error) {
        console.error("Error fetching donation campaign details:", error);
      }
    };

    fetchDonationCampaign();
  }, [donationCampaignId]);

  const [initialValues, setInitialValues] = useState({
    // name:name,
    max_donation_limit:donation?.max_donation_limit,
    date: donation?.last_donation_date,
    shortdesp:donation?. shortdesp,
    longdesp: donation?.longdesp,
    photo: donation?.image,
  });

  const saveImage = async () => {
    try {
      if (!image) {
        return toast.error("Please upload an image");
      }

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "petadding");
      formData.append("cloud_name", "dtwz2gkbz");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtwz2gkbz/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.secure_url) {
        setUrl(response.data.secure_url);
        console.log(response.data.secure_url);
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async () => {
      try {
        await saveImage();
        if (!url) {
          return toast.error("Image not uploaded successfully. Please try again.");
        }

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US");
        const formattedTime = currentDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });

        const updatedDonationCamp = {
          image: url || 'photo',
          name:values.name,
          max_donation_limit: values.max_donation_limit,
          last_donation_date: values.date,
          shortdesp: values.shortdesp,
          longdesp: values.longdesp,
          addedDate: `${formattedDate} ${formattedTime}`,
          userEmail: user.email,
          Pause: false,
        };

        const response = await fetch(`https://serversite-pet-adoption.vercel.app/updatedonationcamp/${donationCampaignId}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedDonationCamp),
        });

        const data = await response.json();

        if (data.updated) {
          Swal.fire({
            title: "Success!",
            text: "Donation Campaign Updated Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        //   navigate('/');
        }
      } catch (error) {
        console.error("Error updating donation camp:", error);
      }
    },
  });

    return (
        <div>
        <div className="flex items-center justify-center p-12 w-full lg:w-10/12 mx-auto bg-blue-200 mt-16 rounded-xl">
          <div className="mx-auto w-full max-w-[550px] shadow-lg p-6 rounded-md">
            <form onSubmit={handleSubmit}>
              <div className='flex '>
                <div className="w-full">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Pet Image
                  </label>
                  <div className="input flex justify-end mb-5">
                    <p>Image file:</p>
                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload ">
                      {image
                        ? <img
                          className="w-10 lg:w-10 rounded-xl"
                          src={image ? URL.createObjectURL(image) : ""}
                          alt="img"
                        />
                        : <img
                          src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                          className="w-10 "
                        />}
                    </label>
                   
                    <input
                      id="file-upload"
                      className='text-white file-input file-input-bordered w-full max-w-xs'
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
                 <div className="mb-5">
                  <label htmlFor="shortdesp" className="mb-3 block text-base font-medium text-[#07074D]">
                   Update Name
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
                   
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                   {errors.name && touched.name? (<p className=" text-error">{errors.name}</p>):null}
                </div>
                <div htmlFor='max_donation_limit' className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Maximum Donation Amount
                  </label>
                  <input
                    type="number"
                    name="max_donation_limit"
                    id="max_donation_limit"
                    placeholder="Maximum Donation Limit"
                    value={values.max_donation_limit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min="0"
                   
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                   {errors.max_donation_limit && touched.max_donation_limit? (<p className=" text-error">{errors.max_donation_limit}</p>):null}
                </div>
                <div className="mb-5">
        <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
          Date
        </label>
        <input
          type="date" // Use type="date" for a date input
          name="date"
          id="date"
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
        {errors.date && touched.date ? (<p className="text-error">{errors.date}</p>) : null}
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
                 Update 
                </button>
                </div>
              </form>
            </div>
          </div>
          </div>
    );
};

export default UpdateDonationCamp;