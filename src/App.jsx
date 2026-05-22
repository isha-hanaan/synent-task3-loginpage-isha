import { useState } from "react";

function App() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="main-container">

      <div className="image-section">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Login Illustration"
        />
      </div>

      <div className="login-container">

        <div className="login-card">

          <h1>Welcome Back</h1>
          <p>Sign in to continue</p>

          <form>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">

              <label>Password</label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />

                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </span>

              </div>

            </div>

            <div className="form-options">

              <label className="remember-me">

                <input type="checkbox" />
                Remember Me

              </label>

              <a href="#" className="forgot-password">
                Forgot Password?
              </a>

            </div>

            <button type="submit">
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default App;