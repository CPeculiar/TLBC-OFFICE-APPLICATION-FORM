import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/Images/TLBC_LOGO_removebg.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      const errorMessage = extractErrorCode(error.message);
      alert('Failed to log in: ' + errorMessage);
    }
  }

  function extractErrorCode(errorMessage) {
    const match = errorMessage.match(/\(auth\/([^\)]+)\)/);
    return match ? match[1] : errorMessage;
  }

  return (
    <div className="login-container d-flex flex-column align-items-center justify-content-center min-vh-100" style={{marginTop: '-8em'}}>
    <img src={Logo} alt="Logo" className="mb-4" style={{ width: '220px', height: 'auto' }} />
    <div className="row justify-content-center w-100">
      <div className="col-md-6">
        <div className="login-card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login to your Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control input-lg" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Email" 
                  required 
                />
              </div>
              <div className="mb-3">
              <div className="input-group">
                <input 
                  type={passwordVisible ? "text" : "password"}
                  className="form-control input-lg" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Password" 
                  required 
                  style={{ paddingRight: '40px' }} // Add padding to prevent text overlap with the icon
                />
                <div className="input-group-append position-absolute end-0 top-50 translate-middle-y" style={{ zIndex: 10, paddingRight: '10px' }}>
                <button
                        type="button"
                        className="btn btn-link"
                        onClick={togglePasswordVisibility}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          padding: 0,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={passwordVisible ? faEyeSlash : faEye}
                          style={{ color: '#6c757d' }}
                        />
                      </button>
              </div>
              </div>
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <a href="/forgotpassword" className="link-primary font-weight-bold" style={{fontSize: '1.3em', textDecoration: 'none'}}>Forgot Password</a>
              </div>
              <button type="submit" className="btn btn-primary login-btn-lg w-100 font-weight-bold" style={{fontSize: '1.4em', fontWeight: 'bolder'}}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;