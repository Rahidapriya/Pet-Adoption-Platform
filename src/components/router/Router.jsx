import {
  createBrowserRouter,

} from "react-router-dom";


import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
// import ErrorPage from "../../pages/errorpage/ErrorPage";
// import AddBook from "../pages/addbook/AddBook";
// import AllBooks from "../pages/allbooks/AllBooks";
// import BorrowedBooks from "../pages/borrowedbooks/BorrowedBooks";
// import UpdateBooks from "../pages/updatebooks/UpdateBooks";
// import AllBooksByCategory from "../pages/allbooksbycategory/AllBooksByCategory";
// import DetailsBook from "../pages/detailbook/DetailsBook";
// import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../../pages/errorpage/ErrorPage";
import MainLayout from "../../layouts/MainLayout";
import PetListing from "../../pages/petListing/PetListing";
import UserDashboard from "../../pages/userDashboard/UserDashboard";
import AddPet from "../../pages/addpet/AddPet";
import AddPetDashboard from "../../pages/addpet/addpetdashboard";
import AdoptPet from "../../pages/petListing/petlistingComponent/AdoptPet";
import MyAddedPets from "../../pages/userDashboard/myaddedpet/MyAddedPets";
import AdoptionReq from "../../pages/userDashboard/adoptionReq/AdoptionReq";
import UpdatePet from "../../pages/userDashboard/myaddedpet/updatePets/UpdatePet";
import AdoptionReqDashboard from "../../pages/userDashboard/AdoptionReqDashboard";
import MyAddedPetsDashboard from "../../pages/userDashboard/MyAddedPetsDashboard";
import CreateDonationCampaignDashboard from "../../pages/userDashboard/CreateDonationCampaignDashboard";
import DonationCampaign from "../../pages/donationCampaign/DonationCampaign";
import DonationCampaignDetails from "../../pages/donationCampaign/donationCampaignDetails/DonationCampaignDetails";
import MyDonationCamp from "../../pages/donationCampaign/myDonationCamp/MyDonationCamp";
import AllUsers from "../../pages/userDashboard/admin/alluser/AllUsers";
import AllUsersDeshboard from "../../pages/userDashboard/admin/alluser/AllUsersDeshboard";
import AllPetsAdmin from "../../pages/userDashboard/admin/allpets/AllPetsAdmin";
import AllDonationCampAdmin from "../../pages/userDashboard/admin/allDonationCamp/AllDonationCampAdmin";
import AllPetsAdminDashboard from "../../pages/userDashboard/admin/allpets/AllPetsAdminDashboard";
import AllDonationCampAdminDashboard from "../../pages/userDashboard/admin/allDonationCamp/AllDonationCampAdminDashboard";
import UpdateDonationCamp from "../../pages/userDashboard/updateDonationCampaign/UpdateDonationCamp";
import MyDonationCampDashboard from "../../pages/donationCampaign/myDonationCamp/MyDonationCampDashboard";
import MyDonation from "../../pages/userDashboard/myDonation/MyDonation";
import MyDonationDashboard from "../../pages/userDashboard/myDonation/MyDonationDashboard";
import UpdatePetDashboard from "../../pages/userDashboard/myaddedpet/updatePets/UpdatePetDashboard";
import UpdateDonationCampDashboard from "../../pages/userDashboard/updateDonationCampaign/UpdateDonationCampDashboard";
import PrivateRoute from "./PrivateRoute";
import AllPetsByCategory from "../../pages/allPetsByCategory/AllPetsByCategory";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        // loader: () => fetch('https://serversite-pet-adoption.vercel.app/PetCategory')
      },
      {
        path: '/petlisting',
        element: <PetListing></PetListing>
      },
      {
        path: '/catagorized_pets/:cat',
        element: <AllPetsByCategory></AllPetsByCategory>,
        loader: ({ params }) => fetch(`https://serversite-pet-adoption.vercel.app/petbycategory/${params.cat}`)
      },
      {
        path: '/adoptionreq',
        element:<PrivateRoute><AdoptionReqDashboard></AdoptionReqDashboard></PrivateRoute>
      },
      {
        path: '/donationcampaign',
        element: <DonationCampaign></DonationCampaign>
      },
      {
        path: '/donationcampaigndetails/:id',
        element: <PrivateRoute><DonationCampaignDetails></DonationCampaignDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://serversite-pet-adoption.vercel.app/adddonationcamp/${params.id}`)
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: '/userdashboard',
        element: <PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>
      },
      {
        path: '/addpet',
        element: <PrivateRoute><AddPetDashboard></AddPetDashboard></PrivateRoute>
      },
      {
        path: '/adoptpet/:id',
        element: <PrivateRoute><AdoptPet></AdoptPet></PrivateRoute>,
        loader: ({ params }) => fetch(`https://serversite-pet-adoption.vercel.app/pets/${params.id}`)
      },
      {
        path: '/myaddedpets',
        element: <PrivateRoute><MyAddedPetsDashboard></MyAddedPetsDashboard></PrivateRoute>
      },
      {
        path: '/createdonationcamp',
        element: <PrivateRoute><CreateDonationCampaignDashboard></CreateDonationCampaignDashboard></PrivateRoute>
      },
      {
        path: '/mydonation',
        element:<PrivateRoute> <MyDonationDashboard></MyDonationDashboard></PrivateRoute>
      },
      {
        path: '/updatedonationcamp/:donationCampaignId',
        element: <PrivateRoute><UpdateDonationCampDashboard></UpdateDonationCampDashboard></PrivateRoute>,
        loader: ({ params }) => fetch(`https://serversite-pet-adoption.vercel.app/adddonationcamp/${params.donationCampaignId}`)
      },


      {
        path: '/updatepet/:petId',
        element: <PrivateRoute><UpdatePetDashboard></UpdatePetDashboard></PrivateRoute>,
        loader: ({ params }) => fetch(`https://serversite-pet-adoption.vercel.app/pets/${params.petId}`)

      },
      {
        path: '/mydonationcamp',
        element: <PrivateRoute><MyDonationCampDashboard></MyDonationCampDashboard></PrivateRoute>
      },
      {
        path: '/allusers',
        element: <PrivateRoute><AllUsersDeshboard></AllUsersDeshboard></PrivateRoute>
      },
      {
        path: '/allpetsadmin',
        element: <PrivateRoute><AllPetsAdminDashboard></AllPetsAdminDashboard></PrivateRoute>
      },

      {
        path: '/alldonationcampadmin',
        element: <PrivateRoute><AllDonationCampAdminDashboard></AllDonationCampAdminDashboard></PrivateRoute>
      },





    ]
  },

]);
export default router;