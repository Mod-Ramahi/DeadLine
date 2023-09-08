import { useState } from "react";
import "./Signin.scss"
import * as Yup from 'yup'
import { useUserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../../api";
import { setItem } from "../../utils/localStorge";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false)
    const [showRePass, setShowRePass] = useState(false)
    const [rePassword, setRePassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [validationErrors, setValidationErrors] = useState({})
    const navigate = useNavigate()
    const {setUserId} = useUserContext()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name Required')
            .min(3, 'Name must be atleast 3 characters')
            .max(10, 'Name must not exceed 10 characters'),
        email: Yup.string().email('invalid email address').required('email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters')
            .max(20, 'Password must not exceed 20 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]+$/,
                'Password must include at least one letter and one number'
            ),
        rePassword: Yup.string()
            .required('Please re-enter your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    })

    const handleUserEmailChange = (event) => {
        const userEmail = event.target.value;
        setEmail(userEmail);
        if (validationErrors.email) {
            setValidationErrors((prevError) => ({ ...prevError, email: '' }))
        }
    }

    const handlePasswordChange = (event) => {
        const userPassword = event.target.value;
        setPassword(userPassword)
        if (validationErrors.password) {
            setValidationErrors((prevError) => ({
                ...prevError,
                password: ""
            }))
        }
    }

    const togglePasswordVisibility = () => {
        setShowPass(!showPass)
    }

    const handleReEnterPasswordChange = (event) => {
        const userRePassword = event.target.value;
        setRePassword(userRePassword)
        if (validationErrors.rePassword) {
            setValidationErrors((prevError) => ({
                ...prevError,
                rePassword: ""
            }))
        }
    }

    const toggleRePasswordVisibility = () => {
        setShowRePass(!showRePass)
    }

    const handleEnterNameChange = (event) => {
        const enteredName = event.target.value;
        setName(enteredName)
        if (validationErrors.name) {
            setValidationErrors((prevError) => ({ ...prevError, name: '' }))
        }
    }

    const handleRemembermeChange = () => {
        const newRememberMeValue = !rememberMe;
        setRememberMe(newRememberMeValue);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await validationSchema.validate(
                { name, email, password, rePassword },
                { abortEarly: false }
            );

            const res = await registerRequest({ email, password, name, rememberMe })
            console.log(res)
            if (res.status === 201) {
                setItem(res.data.token)
                localStorage.setItem('rememberMe', rememberMe);
                const ApiUserId = res.data.id;
                setUserId(ApiUserId)
                navigate('/completeregister')
            }
            else if (res.response.status === 409) {
                alert('Email is Already Exists');
            }
            else if (res.response.status === 500) {
                alert('Something went wrong')
            }
            else {
                alert('Something went wrong. status:', res.response.status)
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setValidationErrors(validationErrors)
            } 
            else {
                console.log(error)
                alert('Something went wrong')
            }
        }
    }

    return (
        <div className="sign_in_container">
            <div className="links">
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/signin'>
                    <button>Already user? sign in</button>
                </Link>
                <span>Or</span>
                <button className="google_button">Continue with Google</button>
            </div>
            {/* <hr/> */}
            <form onSubmit={handleSubmit}>
                <div className="user_name">
                    <label htmlFor="username">
                        Your Name
                    </label>
                    <div className="handle-input">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={handleEnterNameChange}
                            required
                        />
                        {validationErrors.name && <span className="errors">{validationErrors.changedName}</span>}
                    </div>

                </div>
                <div className="user_name">
                    <label htmlFor="username">
                        Email
                    </label>
                    <div className="handle-input">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleUserEmailChange}
                            required
                        />
                        {validationErrors.email && <span className="errors">{validationErrors.email}</span>}
                    </div>
                </div>
                <div className="user_password">
                    <label htmlFor="password">
                        Password
                    </label>
                    <div className="handle-input">
                        <div className="pass-input">
                            <input
                                id="password"
                                type={showPass ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <span className="show" onClick={togglePasswordVisibility}>
                                {showPass ? 'hide' : 'show'}
                            </span>
                        </div>
                        {validationErrors.password && <span className="errors">{validationErrors.password}</span>}
                    </div>

                </div>
                <div className="user_password">
                    <label htmlFor="password">
                        re-enter Password
                    </label>
                    <div className="handle-input">
                        <div className='pass-input'>
                            <input
                                id="reenterpassword"
                                type={showRePass ? "text" : "password"}
                                value={rePassword}
                                onChange={handleReEnterPasswordChange}
                                required
                            />
                            <span className="show" onClick={toggleRePasswordVisibility}>
                                {showRePass ? 'hide' : 'show'}
                            </span>
                        </div>
                        {validationErrors.rePassword && <span className="errors">{validationErrors.rePassword}</span>}
                    </div>

                </div>
                <div className="remember_me">
                    <label>
                        <input
                            id="checkbox"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleRemembermeChange}
                        />
                        Remember Me
                    </label>
                </div>
                <div className="submit_links">
                    <button className="sbmtbtn" type="submit">Register</button>
                    <span className="register"> By register you confirm that you accept</span>
                    <Link to='/terms&conditions'>Terms & Conditions</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;