import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, User, ArrowLeft, Check, Shield, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useGoogleLogin } from '@react-oauth/google';

function Login({ onLogin }) {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot', 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const [message, setMessage] = useState(''); // { text, type }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      // In a real app, you would send this codeResponse.access_token to your backend.
      // Here we just mock a successful Google login.
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      let user = mockUsers.find(u => u.email === 'google_user@gmail.com');
      
      if (!user) {
        user = { name: 'Google User', email: 'google_user@gmail.com', password: 'google_oauth_placeholder', phone: '' };
        mockUsers.push(user);
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      }
      
      onLogin && onLogin(user);
    },
    onError: (error) => {
      console.error('Google Login Failed:', error);
      showToast('Google Login Failed. Please check Client ID.');
    }
  });

  useEffect(() => {
    // initialize mock users if empty for demo purposes
    if (!localStorage.getItem('mockUsers')) {
      localStorage.setItem('mockUsers', JSON.stringify([
        { name: 'Admin User', email: 'admin@example.com', password: 'password123', phone: '+92 300 1234567' }
      ]));
    }
  }, []);

  const showToast = (text, type = 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3500);
  };

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return "Password must be at least 8 characters";
    if (!/\d/.test(pwd)) return "Password must contain at least one number (e.g. 1, 2, 3)";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain at least one special character (e.g. @, #)";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');

    if (view === 'signup') {
      const pwdError = validatePassword(signupPassword);
      if (pwdError) {
        showToast(pwdError);
        return;
      }

      const emailExists = mockUsers.find(u => u.email === signupEmail);
      if (emailExists) {
        showToast('already account bana howa ha koi or email try karian');
        return;
      }

      if (signupPhone) {
        const phoneExists = mockUsers.find(u => u.phone === signupPhone);
        if (phoneExists) {
          showToast('already account bana howa ha koi or number try karian');
          return;
        }
      }

      const newUser = { name: signupName, email: signupEmail, password: signupPassword, phone: signupPhone };
      mockUsers.push(newUser);
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      onLogin && onLogin(newUser);
    }
    else if (view === 'login') {
      const user = mockUsers.find(u => u.email === loginEmail && u.password === loginPassword);
      if (!user) {
        showToast('Invalid email or password');
        return;
      }
      onLogin && onLogin(user);
    }
    else if (view === 'forgot') {
      const exists = mockUsers.find(u => u.email === forgotEmail);
      if (exists) {
        setIsLoading(true);
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(newOtp);

        // EmailJS Configuration - Replace these with your actual keys from emailjs.com
        const serviceID = 'service_eqn0nbl';
        const templateID = 'template_rygjexr';
        const publicKey = 'aNNo0vsto6b6Xfu4t';

        const templateParams = {
          to_email: forgotEmail,
          to_name: exists.name,
          otp: newOtp,
        };

        emailjs.send(serviceID, templateID, templateParams, publicKey)
          .then((response) => {
            setIsLoading(false);
            showToast('OTP has been sent to your email!', 'success');
            setTimeout(() => {
              setView('otp');
            }, 1500);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error('EmailJS Error:', error);
            showToast('Failed to send email. Please check EmailJS configuration.');
          });
      } else {
        showToast('No account found with this email');
      }
    }
    else if (view === 'otp') {
      if (otp === generatedOtp) {
        showToast('OTP verified! You can now reset your password.', 'success');
        setTimeout(() => {
          setView('login');
          setLoginPassword('');
          setOtp('');
          setGeneratedOtp('');
        }, 2500);
      } else {
        showToast('Invalid OTP. Please try again.');
      }
    }
  };

  const handleSwitchView = (newView) => {
    setMessage('');
    setView(newView);
    // Clear fields when switching views
    setLoginEmail('');
    setLoginPassword('');
    setSignupName('');
    setSignupEmail('');
    setSignupPhone('');
    setSignupPassword('');
    setForgotEmail('');
    setOtp('');
  };

  return (
    <div className="login-container animate-scale-in">
      <div className="login-card">

        {/* Back Button for Signup/Forgot Password */}
        {view !== 'login' && (
          <button
            type="button"
            onClick={() => handleSwitchView('login')}
            style={{ position: 'absolute', top: '24px', left: '24px', background: 'var(--gradient-1)', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', zIndex: 10, opacity: 0.9, transition: '0.2s' }}
            title="Go back"
            onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '0.9'}
          >
            <ArrowLeft size={18} />
          </button>
        )}

        {/* Using key to trigger animation on view change */}
        <div key={view} className="animate-fade-in-up">
          <div className="login-header">
            <h1 className="sidebar-brand">AiFashion</h1>
            <p>
              {view === 'login' && 'Welcome back! Please login to your account.'}
              {view === 'signup' && 'Create an account to get started.'}
              {view === 'forgot' && 'Enter your email to receive an OTP.'}
              {view === 'otp' && 'Enter the OTP sent to your email.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="profile-form-advanced" style={{ gap: '20px' }} autoComplete="off">
            {/* Dummy inputs to trick Chrome autofill */}
            <input type="text" name="fakeusernameremembered" style={{ opacity: 0, position: 'absolute', top: '-9999px' }} autoComplete="username" />
            <input type="password" name="fakepasswordremembered" style={{ opacity: 0, position: 'absolute', top: '-9999px' }} autoComplete="current-password" />

            {view === 'signup' && (
              <div className="form-group">
                <label className="form-label">
                  <User size={14} />
                  Full Name
                </label>
                <div className="form-input-wrap">
                  <input type="text" placeholder="John Doe" className="form-input" required value={signupName} onChange={e => setSignupName(e.target.value)} />
                </div>
              </div>
            )}

            {view !== 'otp' && (
              <div className="form-group">
                <label className="form-label">
                  <Mail size={14} />
                  Email Address
                </label>
                <div className="form-input-wrap">
                  <input type="email" placeholder="you@example.com" className="form-input" required autoComplete="off" value={view === 'login' ? loginEmail : (view === 'signup' ? signupEmail : forgotEmail)} onChange={e => {
                    if (view === 'login') setLoginEmail(e.target.value);
                    else if (view === 'signup') setSignupEmail(e.target.value);
                    else setForgotEmail(e.target.value);
                  }} />
                </div>
              </div>
            )}

            {view === 'signup' && (
              <div className="form-group">
                <label className="form-label">
                  <Shield size={14} />
                  Phone Number
                </label>
                <div className="form-input-wrap">
                  <input type="tel" placeholder="+92 300 1234567" className="form-input" autoComplete="off" value={signupPhone} onChange={e => setSignupPhone(e.target.value)} />
                </div>
              </div>
            )}

            {view === 'otp' && (
              <div className="form-group">
                <label className="form-label">
                  <Shield size={14} />
                  Enter OTP
                </label>
                <div className="form-input-wrap">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={6}
                    placeholder="123456"
                    className="form-input"
                    required
                    value={otp}
                    onChange={e => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setOtp(val);
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {(view === 'login' || view === 'signup') && (
              <div className="form-group">
                <label className="form-label">
                  <Lock size={14} />
                  Password
                </label>
                <div className="form-input-wrap" style={{ position: 'relative', display: 'block' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="form-input"
                    style={{ paddingRight: '40px', width: '100%' }}
                    required
                    autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                    value={view === 'login' ? loginPassword : signupPassword}
                    onChange={e => view === 'login' ? setLoginPassword(e.target.value) : setSignupPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#7d6554', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {view === 'login' && (
              <div className="forgot-password" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-8px' }}>
                <button type="button" onClick={() => handleSwitchView('forgot')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Forgot Password?</button>
              </div>
            )}

            {(view === 'login' || view === 'signup') && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0', color: 'var(--text-secondary)' }}>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                  <span style={{ padding: '0 12px', fontSize: '0.85rem' }}>OR</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                </div>
                
                <div className="form-group">
                  <button 
                    type="button" 
                    className="form-input"
                    onClick={() => handleGoogleLogin()}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      cursor: 'pointer',
                      fontWeight: '600',
                      color: '#333',
                      gap: '12px',
                      background: 'white',
                      transition: '0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f9f9f9'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                  >
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </>
            )}

            <div className="form-actions" style={{ marginTop: '8px' }}>
              <button type="submit" className="save-profile-btn" style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: isLoading ? 0.7 : 1 }} disabled={isLoading}>
                {isLoading ? (
                  <>
                    Sending... <Loader size={16} className="animate-spin" style={{ marginLeft: '8px' }} />
                  </>
                ) : (
                  <>
                    {view === 'login' && 'Login'}
                    {view === 'signup' && 'Create Account'}
                    {view === 'forgot' && 'Send Reset Link'}
                    {view === 'otp' && 'Verify OTP'}
                    <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </>
                )}
              </button>
            </div>

            {message && (
              <div className={`profile-toast ${message.type === 'success' ? 'success' : 'warning'}`} style={{ marginTop: '16px', position: 'static', transform: 'none', width: '100%', animation: 'fadeInUp 0.3s ease' }}>
                <div className="toast-icon">
                  {message.type === 'success' ? <Check size={16} /> : <Shield size={16} />}
                </div>
                <p>{message.text}</p>
              </div>
            )}

          </form>

          {view === 'login' && (
            <div className="login-footer" style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: '#7d6554' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => handleSwitchView('signup')}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
