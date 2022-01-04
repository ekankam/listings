import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import {
    Explore,
    Offers,
    Profile,
    SignIn,
    SignUp,
    ForgetPassword,
} from './pages'

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Explore />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/profile" element={<SignIn />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route
                        path="/forget-password"
                        element={<ForgetPassword />}
                    />
                </Routes>
                <Navbar />
            </Router>
        </>
    )
}

export default App
