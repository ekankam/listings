import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '../assets'

import visiblityIcon from '../assets/svg/visibilityIcon.svg'

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })

    const { email, password } = formData

    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>

                <main>
                    <form>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="emailInput"
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
                                src={visiblityIcon}
                                alt="show password"
                                className="showPassword"
                                onClick={() =>
                                    setShowPassword((prevState) => !prevState)
                                }
                            />
                        </div>
                        <Link
                            to="/forget-password"
                            className="forgotPasswordLink"
                        >
                            Forgot Password
                        </Link>
                        <div className="signInBar">
                            <p className="signInText">Sign In</p>
                            <button className="signInButton">
                                <ArrowRightIcon
                                    fill="#fff"
                                    width="34px"
                                    height="34px"
                                />
                            </button>
                        </div>
                    </form>
                    {/* Google Auth */}

                    <Link to="/sign-up" className="registerLink">
                        Sign Up Instead
                    </Link>
                </main>
            </div>
        </>
    )
}

export default SignIn
