import "./Signin.scss"

const SignIn = () => {
  return (
    <div className="signincontainer">
      <div className="signin">
        <h2>Sign In</h2>
        <form className="signinform">
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <div>
            <label htmlFor="rememberMe">
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              Remember me
            </label>
          </div>
          <div>
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
        <div>
          <button>Sign In with Google</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn;