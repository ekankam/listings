import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import {
    Explore,
    Offers,
    Profile,
    SignIn,
    SignUp,
    ForgetPassword,
    Category,
    CreateListing,
} from './pages'
import Contact from './pages/Contact'
import Listing from './pages/Listing'

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Explore />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route
                        path="/category/:categoryName"
                        element={<Category />}
                    />
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route
                        path="/forget-password"
                        element={<ForgetPassword />}
                    />
                    <Route path="/create-listing" element={<CreateListing />} />
                    <Route
                        path="/category/:categoryName/:listingId"
                        element={<Listing />}
                    />
                    <Route path="/contact/:landlordId" element={<Contact />} />
                </Routes>
                <Navbar />
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
