import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '../assets'
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'

import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { db } from '../firebase.config'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = formData

    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            // initialize auth
            const auth = getAuth()

            // register user
            const userCredential = createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            // get user info
            const user = userCredential.user

            // update display name
            updateProfile(auth.currentUser, { displayName: name })

            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>

                <form onSubmit={onSubmitHandler}>
                    <input
                        type="text"
                        className="nameInput"
                        placeholder="Name"
                        id="name"
                        value={name}
                        onChange={onChangeHandler}
                    />
                    <input
                        type="email"
                        className="emailInput"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={onChangeHandler}
                    />

                    <div className="passwordInputDiv">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="passwordInput"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={onChangeHandler}
                        />

                        <img
                            src={visibilityIcon}
                            alt="show password"
                            className="showPassword"
                            onClick={() =>
                                setShowPassword((prevState) => !prevState)
                            }
                        />
                    </div>

                    <Link to="/forgot-password" className="forgotPasswordLink">
                        Forgot Password
                    </Link>

                    <div className="signUpBar">
                        <p className="signUpText">Sign Up</p>
                        <button className="signUpButton">
                            <ArrowRightIcon
                                fill="#ffffff"
                                width="34px"
                                height="34px"
                            />
                        </button>
                    </div>
                </form>

                <Link to="/sign-in" className="registerLink">
                    Sign In Instead
                </Link>
            </div>
        </>
    )
}

export default SignUp
