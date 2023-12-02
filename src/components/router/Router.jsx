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



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        // loader: () => fetch('http://localhost:5007/PetCategory')
      },
      {
        path: '/petlisting',
        element: <PetListing></PetListing>
      },
      {
        path: '/donationcampaign',
        element: <DonationCampaign></DonationCampaign>
      },
      {
        path: '/donationcampaigndetails/:id',
        element: <DonationCampaignDetails></DonationCampaignDetails>,
        loader: ({ params }) => fetch(`http://localhost:5007/adddonationcamp/${params.id}`)
      },
      {
        path: '/userdashboard',
        element: <UserDashboard></UserDashboard>
      },
      {
        path: '/addpet',
        element: <AddPetDashboard></AddPetDashboard>
      },
      {
        path: '/adoptpet/:id',
        element: <AdoptPet></AdoptPet>,
        loader: ({ params }) => fetch(`http://localhost:5007/pets/${params.id}`)
      },
      {
        path: '/myaddedpets',
        element: <MyAddedPetsDashboard></MyAddedPetsDashboard>
      },
      {
        path: '/createdonationcamp',
        element:<CreateDonationCampaignDashboard></CreateDonationCampaignDashboard>
      },
      {
        path: '/adoptionreq',
        element: <AdoptionReqDashboard></AdoptionReqDashboard>
      },
      {
        path: '/updatepet/:petId',
        element: <UpdatePet></UpdatePet>,
        loader: ({ params }) => fetch(`http://localhost:5007/pets/${params.petId}`)
        
      },

      // {
      //   path: '/readbook/:id',
      //   element: <PrivateRoute><Read></Read></PrivateRoute>,
      //   loader: ({ params }) => fetch(`http://localhost:5006/books/${params.id}`)
      // },
      // {
      //   path: '/allbooks',
      //   element: <AllBooks></AllBooks>,
      //   // loader: () => fetch('http://localhost:5006/books')
      // },
      // {
      //   path: '/updatebooks/:id',
      //   element: <PrivateRoute><UpdateBooks></UpdateBooks></PrivateRoute>,
      //   loader: ({ params }) => fetch(`http://localhost:5006/books/${params.id}`)


      // },
      // {
      //   path: '/catagorized_books/:cat',
      //   element: <AllBooksByCategory></AllBooksByCategory>,
      //   loader: ({ params }) => fetch(`http://localhost:5006/booksbycategory/${params.cat}`)
      // },
      // {
      //   path: '/detailsbook/:id',
      //   element: <PrivateRoute><DetailsBook></DetailsBook></PrivateRoute>,
      //   loader: ({ params }) => fetch(`http://localhost:5006/books/${params.id}`)
      // },
      // {
      //   path: '/borrowedbooks',
      //   element: <PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute>,
      //   // loader: () => fetch(`http://localhost:5006/addtoborrow`)
      // },
      // {
      //    path:'/borrowedbooks',
      //    element:<BorrowedBooks></BorrowedBooks>
      // },

      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      }

    ]
  },

]);
export default router;