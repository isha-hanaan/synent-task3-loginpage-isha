import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./style.css";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const [successMessage, setSuccessMessage] = useState("");
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const isEmailStructureValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordRules = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[@$!%*?&]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);
  const isFormInvalid = !isEmailStructureValid || !isPasswordValid;

  const getEmailErrorMessage = () => {
    if (!emailTouched || email === "") return "";
    if (!email.includes("@")) return "Email is missing an '@' symbol.";
    if (!isEmailStructureValid) return "Please enter a complete, valid email address.";
    return "";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormInvalid) return;

    setGlobalErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    setTimeout(() => {
      const demoEmail = "demo@gmail.com";
      const demoPassword = "Demo@123";

      if (email === demoEmail && password === demoPassword) {
        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
        } else {
          localStorage.removeItem("savedEmail");
        }
        setIsLoggedIn(true);
        setLoginAttempts(0);
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= 3) {
          setGlobalErrorMessage("Invalid credentials. Try: demo@gmail.com / Demo@123");
        } else {
          setGlobalErrorMessage("Invalid email or password combination.");
        }
      }
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
    setPasswordTouched(false);
  };

  const handleForgotPassword = () => {
    setForgotMessage("");
    const validateEmail = (em) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

    if (!forgotEmail || !validateEmail(forgotEmail)) {
      setForgotMessage("Please enter a valid email address.");
      return;
    }
    if (forgotEmail !== "demo@gmail.com") {
      setForgotMessage("Email not found. Try demo@gmail.com");
      return;
    }
    setForgotMessage("Demo reset link sent successfully.\n\nEmail: demo@gmail.com\nPassword: Demo@123");
  };

  return (
    <div className="main-container">
      {/* Left-side hero image section */}
      <div className="image-section">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
          alt="Login background office space"
        />
        <div className="image-overlay">
          <h2>Welcome Back</h2>
          <p>Sign in to see what your workspace has been up to today.</p>
        </div>
      </div>

      {/* Right-side interactive login form section */}
      <div className="login-container">
        <div className="login-card">
          {isLoggedIn ? (

            <div className="success-screen">
              <div className="success-icon">✓</div>
              <h1>Login Successful!</h1>
              <p className="subtitle">
                Welcome back, <strong>{email}</strong>
              </p>

              <div className="redirect-container">
                <p>Redirecting you to your secure workspace...</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill"></div>
                </div>
              </div>

              <button type="button" className="back-to-login-btn" onClick={handleLogout}>
                Cancel & Sign Out
              </button>
            </div>
          ) : (

            <>
              <h1>Welcome Back</h1>
              <p className="subtitle">Sign in to continue</p>

              {successMessage && <p className="success-message">{successMessage}</p>}
              {globalErrorMessage && <p className="error-message">{globalErrorMessage}</p>}

              <form onSubmit={handleSubmit}>
                {/* Email input field component */}
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onBlur={() => setEmailTouched(true)}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setGlobalErrorMessage("");
                    }}
                    className={getEmailErrorMessage() ? "input-error" : ""}
                  />
                  {getEmailErrorMessage() && (
                    <span className="field-error-text">{getEmailErrorMessage()}</span>
                  )}
                </div>

                {/* Password input container with visibility toggle */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-wrapper">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onBlur={() => setPasswordTouched(true)}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setGlobalErrorMessage("");
                      }}
                      className={passwordTouched && !isPasswordValid ? "input-error" : ""}
                    />

                    {/* Modern eye icon toggle for show/hide password */}
                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <EyeOff size={20} className="icon-style" />
                      ) : (
                        <Eye size={20} className="icon-style" />
                      )}
                    </span>
                  </div>

                  {/* Real-time password validation checklist */}
                  {password.length > 0 && (
                    <div className="password-checklist">
                      <p className="checklist-title">Password requirements:</p>
                      <ul>
                        <li className={passwordRules.length ? "checked" : ""}>Min. 6 characters</li>
                        <li className={passwordRules.uppercase ? "checked" : ""}>One uppercase letter</li>
                        <li className={passwordRules.lowercase ? "checked" : ""}>One lowercase letter</li>
                        <li className={passwordRules.number ? "checked" : ""}>One number</li>
                        <li className={passwordRules.symbol ? "checked" : ""}>One special character (@$!%*?&)</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Form option links like Remember Me and Forgot Password */}
                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember Me
                  </label>
                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() => setShowForgotModal(true)}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" disabled={isFormInvalid || loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Forgot Password popup modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Forgot Password</h2>
            <p>Enter your email and we will send you a reset link.</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            {forgotMessage && <p className="forgot-message">{forgotMessage}</p>}
            <div className="modal-buttons">
              <button className="modal-btn" onClick={handleForgotPassword}>
                Send Link
              </button>
              <button className="modal-close" onClick={() => setShowForgotModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;