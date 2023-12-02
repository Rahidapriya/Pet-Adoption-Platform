import * as Yup from "yup";

export const addnewpet =Yup.object({
    name:Yup.string().required("Please Enter the Pet Name"),
    age:Yup.number().required("Please Enter the Pet Age"),
    // category:Yup.string().required("Please Select Category"),
    Location:Yup.string().min(2).required("Please Enter Location"),
    shortdesp:Yup.string().min(2).required("Please Enter Short Description"),
    longdesp:Yup.string().min(6).required("Please Enter Long Description"),
    // photo:Yup.string().required("Please Select The Pet Image")
})