import { useState } from "react";
import "./Signin.scss"
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../../api";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate()
    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleReEnterPasswordChange = (event) => {
        setRePassword(event.target.value);
    }

    const handleRemembermeChange = () => {
        setRememberMe(!rememberMe);
        // const newRememberMeValue = !rememberMe;
        // setRememberMe(newRememberMeValue);
        // localStorage.setItem('rememberMe', newRememberMeValue);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== rePassword) {
            alert('passwords doesnt match');
            return;
        }
        try {
            const response = await registerRequest({email,password})
            navigate('/completeregister')
        } catch (error) {
            
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
            <form onSubmit={handleSubmit}>
                <div className="user_name">
                    <label htmlFor="username">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="user_password">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="user_password">
                    <label htmlFor="password">
                        re-enter Password
                    </label>
                    <input
                        id="reenterpassword"
                        type="password"
                        value={rePassword}
                        onChange={handleReEnterPasswordChange}
                        required
                    />
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