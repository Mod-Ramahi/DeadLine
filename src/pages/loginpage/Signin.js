import { useState } from "react";
import "./Signin.scss"
import { Link } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleRemembermeChange = () => {
    setRememberMe(!rememberMe);
    // const newRememberMeValue = !rememberMe;
    // setRememberMe(newRememberMeValue);
    // localStorage.setItem('rememberMe', newRememberMeValue);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");
    setRememberMe(false);
  }

  return (
    <div className="sign_in_container">
      <div className="links">
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/register'><button>New? Register here</button></Link>
        <span>Or</span>
        <button className="google_button">Continue with Google</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="user_name">
          <label htmlFor="username">
            UserName or Email
          </label>
          <input
            id="username"
            type="text"
            value={username}
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
          <button className="sbmtbtn" type="submit">Sign In</button>
          <Link to={""}>Password forgotten?</Link>
        </div>
      </form>
    </div>
  )
}

export default SignIn;