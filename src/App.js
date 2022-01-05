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
} from './pages'

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
                </Routes>
                <Navbar />
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
