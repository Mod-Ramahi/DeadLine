import { useEffect, useState } from "react";
import "./Signin.scss"
import * as Yup from 'yup'
import { useUserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import { googleLogIn, loginRequest } from "../../api";
import { setItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";

const SignIn = () => {
  const [user, setUser] = useState()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()
  const { setUserId } = useUserContext()

  useEffect(() => {

    /* global google */
    google.accounts.id.initialize({
      client_id: '995840348989-reo2s285mklbg9lehsmhhq23gaev327f.apps.googleusercontent.com',
      callback: handleCallBackResponse
    })

  }, [])

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('invalid email address').required('email is required'),
    password: Yup.string().required('password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must not exceed 20 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]+$/,
        'Password must include at least one letter and one number'
      ),
  })

  const handleCallBackResponse = (response) => {
    console.log('google sign in response', response)
    const userObject = jwtDecode(response.credential)
    console.log(userObject)
    setUser(userObject)
    handleGoogleLogIn(userObject)
  }
  const handleGoogleLogIn = async (userObject) => {
    console.log('userObject:', userObject)
    const name = userObject.name
    const email = userObject.email
    try{
      console.log('test google user',name)
      const response = await googleLogIn({name, email, rememberMe})
      console.log('response we got:',response)
      if (response.status === 200){
        setItem(response.data.token)
        localStorage.setItem('rememberMe', rememberMe);

        // localStorage.setItem('token', response.data.token);
        navigate('/userhome')
      }
      if(response.status === 201){
        setItem(response.data.token)
        localStorage.setItem('rememberMe', rememberMe);

        // localStorage.setItem('token', response.data.token);
        navigate('/completeregister')
      }
    }catch (error){
      console.log(error)
      alert("something went wrong")
    }
  }

  const handleUsernameChange = (event) => {
    const emailChange = event.target.value
    setEmail(emailChange);
    if (validationErrors.email) {
      setValidationErrors((prevError) => (
        { ...prevError, email: '' }
      ))
    }
  }

  const handlePasswordChange = (event) => {
    const passwordChange = event.target.value;
    setPassword(passwordChange);
    if (validationErrors.password) {
      setValidationErrors((prevError) => ({
        ...prevError,
        password: ''
      }))
    }
  }
  const togglePasswordVisibility = () => {
    setShowPass(!showPass)
  }

  const handleRemembermeChange = () => {
    const newRememberMeValue = !rememberMe;
    setRememberMe(newRememberMeValue);
  }

  const handleGoogleSignIn = () => {
    google.accounts.id.prompt();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      )
      const res = await loginRequest({ email, password, rememberMe })
      console.log(res)
      if (res.status === 200) {
        setItem(res.data.token)
        localStorage.setItem('rememberMe', rememberMe);
        const ApiUserId = res.data.id;
        setUserId(ApiUserId)
        navigate('/userhome')
      } else if (res.response.status === 401) {
        alert('Invalid email or password')
      } else if (res.response.status === 400) {
        alert('something went wronggggggg')
      } else {
        alert('something went wrong. status:', res.response.status)
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {}
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message
        })
        setValidationErrors(validationErrors)
      } else {
        console.log(error)
        alert('something went wrong. Check Your Email/Password ')
      }
    }

  }

  return (
    <div className="sign_in_container">
      <div className="links">
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/register'><button>New? Register here</button></Link>
        <span>Or</span>
        <button className="google_button" onClick={handleGoogleSignIn}>Continue with Google</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="user_name">
          <label htmlFor="username">
            Email
          </label>
          <div className="handle-input">
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleUsernameChange}
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