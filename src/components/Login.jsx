import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, AlertTriangle, ArrowLeft, Check, Info, X, Eye, EyeOff } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import emailjs from '@emailjs/browser';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function Login({ onLogin }) {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [view, setView] = useState('login'); 
  const [signupView, setSignupView] = useState('form');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  
  const [resetPassword, setResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isNewGoogleAccount, setIsNewGoogleAccount] = useState(false);
  const [toastList, setToastList] = useState([]);
  const toastIdRef = useRef(0);
  const toastTimerRef = useRef({});
  const googleAuthModeRef = useRef('login');

  useEffect(() => {
    if (!localStorage.getItem('mockUsers')) {
      localStorage.setItem('mockUsers', JSON.stringify([
        { name: 'Admin User', email: 'admin@example.com', password: 'password123', phone: '+92 300 1234567' }
      ]));
    }
  }, []);

  const enterApp = (userData, isNewAccount = false) => {
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    let user = mockUsers.find(u => u.email === userData.email);

    if (isNewAccount) {
      if (!user) {
        mockUsers.push(userData);
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
        user = userData;
      }
    } else if (!user) {
      return;
    }

    setLoginEmail(''); setLoginPassword('');
    setSignupName(''); setSignupEmail(''); setSignupPhone(''); setSignupPassword('');
    setForgotEmail(''); setOtp(''); setGeneratedOtp('');
    setResetPassword(''); setConfirmResetPassword('');
    setView('login');
    if (onLogin) onLogin(user);
  };

  const removeToast = (id) => {
    setToastList(prev => prev.map(t => t.id === id ? { ...t, closing: true } : t));
    setTimeout(() => {
      setToastList(prev => prev.filter(t => t.id !== id));
      if (toastTimerRef.current[id]) {
        clearTimeout(toastTimerRef.current[id]);
        delete toastTimerRef.current[id];
      }
    }, 350);
  };

  const showToast = (msg, type = 'error') => {
    const id = ++toastIdRef.current;
    let title = 'Notice';
    let desc = msg;
    if (type === 'success') {
      if (msg.includes('Login') || msg.includes('successful') || msg.includes('Logged')) {
        title = 'Login Successful';
          desc = '';
      } else if (msg.includes('Account') || msg.includes('created')) {
        title = 'Account Created';
        desc = '';
      } else if (msg.includes('OTP')) {
        title = 'OTP Sent';
        desc = 'Check your email.';
      } else if (msg.includes('verified')) {
        title = 'Verified';
        desc = 'Set your new password.';
      } else if (msg.includes('Password') || msg.includes('updated')) {
        title = 'Password Updated';
        desc = '';
      } else {
        title = 'Success';
        desc = '';
      }
    } else if (type === 'error') {
      title = 'Error';
      if (msg.includes('email') && msg.includes('exist')) title = 'Account Not Found';
      else if (msg.toLowerCase().includes('password') && msg.match(/incorrect|wrong/i)) title = 'Wrong Password';
      else if (msg.includes('already registered')) title = 'Email Already Registered';
      else if (msg.includes('match')) title = 'Passwords Do Not Match';
      else if (msg.includes('Invalid OTP')) title = 'Invalid OTP';
      else if (msg.includes('Google')) title = 'Google Sign-In Failed';
    }

    const newToast = { id, type, title, desc };
    setToastList(prev => [...prev, newToast]);
    
    toastTimerRef.current[id] = setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${codeResponse.access_token}` },
        });
        const userInfo = await userInfoRes.json();

        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const existingUser = mockUsers.find(u => u.email === userInfo.email);
        const authMode = googleAuthModeRef.current;

        if (authMode === 'login') {
          if (!existingUser) {
            showToast('This email does not exist. Please create an account.');
            return;
          }

          setIsNewGoogleAccount(false);
          showToast('Login successful!', 'success');
          setTimeout(() => enterApp(existingUser), 500);
          return;
        }

        if (existingUser) {
          showToast('This email is already registered.');
          return;
        }

        let givenName = userInfo.given_name || userInfo.name || 'user';
        givenName = givenName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        let handleString = givenName;
        // Ensure at least some numbers
        handleString += Math.floor(100 + Math.random() * 900);
        while (handleString.length < 8) {
          handleString += Math.floor(Math.random() * 10);
        }

        const googleUserData = {
          name: userInfo.name || 'Google User',
          email: userInfo.email,
          handle: `@${handleString}`,
          password: `GoogleAuth!${Math.floor(100000 + Math.random() * 900000)}`,
          phone: ''
        };

        setIsNewGoogleAccount(true);
        showToast('Account created successfully!', 'success');
        setTimeout(() => enterApp(googleUserData, true), 500);
      } catch (err) {
        showToast('Google Login Failed. Could not fetch user details.');
      }
    },
    onError: () => {
      showToast('Google Login Failed.');
    }
  });

  const goToLoginView = () => {
    setForgotEmail('');
    setOtp('');
    setGeneratedOtp('');
    setResetPassword('');
    setConfirmResetPassword('');
    setIsLoading(false);
    setView('login');
  };

  const openForgotView = () => {
    setForgotEmail('');
    setOtp('');
    setGeneratedOtp('');
    setResetPassword('');
    setConfirmResetPassword('');
    setIsLoading(false);
    setView('forgot');
  };

  const goBackFromOtp = () => {
    setOtp('');
    setGeneratedOtp('');
    setForgotEmail('');
    setView('forgot');
  };

  const goBackFromSignupOtp = () => {
    setOtp('');
    setGeneratedOtp('');
    setSignupView('form');
  };

  const triggerGoogleAuth = (mode) => {
    googleAuthModeRef.current = mode;
    handleGoogleLogin();
  };

  const BackButton = ({ onClick, label = 'Go back' }) => (
    <button type="button" className="liquid-back-btn" onClick={onClick} aria-label={label}>
      <span className="liquid-back-btn-glow" aria-hidden="true" />
      <ArrowLeft size={18} strokeWidth={2.25} />
    </button>
  );

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    
    if (mockUsers.find(u => u.email === signupEmail)) {
      showToast('This email is already registered.');
      return;
    }

    setIsLoading(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    
    const templateParams = {
      to_email: signupEmail,
      to_name: signupName,
      otp: newOtp
    };

    // EmailJS credentials
    const SERVICE_ID = 'service_eqn0nbl';
    const TEMPLATE_ID = 'template_rygjexr';
    const PUBLIC_KEY = 'aNNo0vsto6b6Xfu4t';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        setIsLoading(false);
        showToast('OTP sent to your email successfully!', 'success');
        setSignupView('otp');
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('EmailJS Error:', error);
        showToast('Failed to send OTP. Please check your EmailJS configuration.', 'error');
      });
  };

  const handleSignupOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      let baseHandle = signupName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      if (!baseHandle) baseHandle = 'user';
      baseHandle += Math.floor(100 + Math.random() * 900);
      while (baseHandle.length < 8) {
        baseHandle += Math.floor(Math.random() * 10);
      }

      const newUser = {
        name: signupName,
        email: signupEmail,
        phone: signupPhone,
        password: signupPassword,
        handle: `@${baseHandle}`
      };

      mockUsers.push(newUser);
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      
      showToast('Account created successfully!', 'success');
      
      setTimeout(() => {
        setOtp('');
        setGeneratedOtp('');
        setSignupView('form');
        enterApp(newUser);
      }, 500);
    } else {
      showToast('Invalid OTP. Please try again.');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const currentEmail = loginEmail.trim().toLowerCase();
    
    const emailExists = mockUsers.find(u => u.email.toLowerCase() === currentEmail);
    if (!emailExists) {
      showToast('This email does not exist. Please create an account.');
      return;
    }
    
    const user = mockUsers.find(u => u.email.toLowerCase() === currentEmail && u.password === loginPassword);
    
    if (user) {
      showToast('Login successful!', 'success');
      setTimeout(() => enterApp(user), 500);
    } else {
      showToast('Wrong password.');
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const userExists = mockUsers.find(u => u.email === forgotEmail);

    if (userExists) {
      setIsLoading(true);
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      
      const templateParams = {
        to_email: forgotEmail,
        to_name: userExists.name,
        otp: newOtp
      };

      // EmailJS credentials
      const SERVICE_ID = 'service_eqn0nbl';
      const TEMPLATE_ID = 'template_rygjexr';
      const PUBLIC_KEY = 'aNNo0vsto6b6Xfu4t';

      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then((response) => {
          setIsLoading(false);
          showToast('OTP sent to your email successfully!', 'success');
          setView('otp');
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('EmailJS Error:', error);
          showToast('Failed to send OTP. Please check your EmailJS configuration.', 'error');
        });
    } else {
      showToast('No account found with this email');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      showToast('OTP verified! You can now reset your password.', 'success');
      setTimeout(() => {
        setView('reset-password');
        setOtp('');
        setGeneratedOtp('');
      }, 1500);
    } else {
      showToast('Invalid OTP. Please try again.');
    }
  };
  
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (resetPassword !== confirmResetPassword) {
      showToast('Passwords do not match');
      return;
    }
    
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const userIndex = mockUsers.findIndex(u => u.email === forgotEmail);
    
    if (userIndex !== -1) {
      mockUsers[userIndex].password = resetPassword;
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      
      showToast('Password updated successfully!', 'success');
      setTimeout(() => enterApp(mockUsers[userIndex]), 500);
    }
  };

  return (
    <div className="split-login-wrapper liquid-bg">
      {/* Liquid animated orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className={`split-container ${isRightPanelActive ? 'right-panel-active' : ''} liquid-glass`}>
        
        {/* SIGN UP FORM */}
        <div className="form-container sign-up-container">
          {signupView === 'form' && (
            <form onSubmit={handleSignupSubmit} className="split-form">
              <input type="text" name="fakeusernameremembered" style={{ opacity: 0, position: 'absolute', top: '-9999px' }} autoComplete="username" />
              <input type="password" name="fakepasswordremembered" style={{ opacity: 0, position: 'absolute', top: '-9999px' }} autoComplete="current-password" />
              
              <h1>Create Account</h1>
              <span className="form-subtitle">Enter your details for registration</span>
              <input type="text" placeholder="Full Name" value={signupName} onChange={e => setSignupName(e.target.value)} required autoComplete="off" />
              <input type="email" placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required autoComplete="email" />
              <input type="tel" placeholder="Phone" value={signupPhone} onChange={e => setSignupPhone(e.target.value)} required autoComplete="off" />
              <div style={{ position: 'relative', width: '100%' }}>
                <input type={showSignupPassword ? "text" : "password"} placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required autoComplete="new-password" style={{ width: '100%' }} />
                <button 
                  type="button" 
                  onClick={() => setShowSignupPassword(!showSignupPassword)} 
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }}
                  aria-label={showSignupPassword ? "Hide password" : "Show password"}
                >
                  {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button type="submit" className="save-profile-btn liquid-btn mt-2">{isLoading ? 'Sending OTP...' : 'Sign Up'}</button>
              
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '16px 0', opacity: 0.6 }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)' }}></div>
                <span style={{ margin: '0 10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)' }}></div>
              </div>
              
              <div className="social-container" style={{ width: '100%' }}>
                <button type="button" className="social-btn liquid-hover" onClick={() => triggerGoogleAuth('signup')}>
                  <GoogleIcon /> <span style={{marginLeft: '8px'}}>Continue with Google</span>
                </button>
              </div>
            </form>
          )}

          {signupView === 'otp' && (
            <form onSubmit={handleSignupOtpSubmit} className="split-form" autoComplete="off">
              <BackButton onClick={goBackFromSignupOtp} label="Back to sign up" />
              <h1>Verify Email</h1>
              <span className="form-subtitle">Enter the 6-digit OTP sent to {signupEmail}</span>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6} autoComplete="off" />
              <button type="submit" className="save-profile-btn liquid-btn mt-2">Verify & Create Account</button>
            </form>
          )}
        </div>

        {/* SIGN IN FORM */}
        <div className="form-container sign-in-container">
          {view === 'login' && (
            <form onSubmit={handleLoginSubmit} className="split-form">
              <h1>Sign In</h1>
              <span className="form-subtitle">Welcome back! Please enter your details.</span>
              <input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required autoComplete="email" />
              <div style={{ position: 'relative', width: '100%' }}>
                <input type={showLoginPassword ? "text" : "password"} placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required autoComplete="new-password" style={{ width: '100%' }} />
                <button 
                  type="button" 
                  onClick={() => setShowLoginPassword(!showLoginPassword)} 
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }}
                  aria-label={showLoginPassword ? "Hide password" : "Show password"}
                >
                  {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '2px', marginBottom: '16px' }}>
                <a href="#" className="forgot-password-link" style={{ fontSize: '11px', color: 'var(--text-secondary)' }} onClick={(e) => { e.preventDefault(); openForgotView(); }}>Forgot your password?</a>
              </div>
              
              <button type="submit" className="save-profile-btn liquid-btn">Sign In</button>
              
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '16px 0', opacity: 0.6 }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)' }}></div>
                <span style={{ margin: '0 10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)' }}></div>
              </div>
              
              <div className="social-container" style={{ width: '100%' }}>
                <button type="button" className="social-btn liquid-hover" onClick={() => triggerGoogleAuth('login')}>
                  <GoogleIcon /> <span style={{marginLeft: '8px'}}>Continue with Google</span>
                </button>
              </div>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="split-form">
              <BackButton onClick={goToLoginView} label="Back to sign in" />
              <h1>Reset Password</h1>
              <span className="form-subtitle">Enter your email to receive an OTP</span>
              <input type="email" placeholder="Email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required autoComplete="email" />
              <button type="submit" className="save-profile-btn liquid-btn mt-2">{isLoading ? 'Sending...' : 'Send OTP'}</button>
            </form>
          )}

          {view === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="split-form" autoComplete="off">
              <BackButton onClick={goBackFromOtp} label="Back to reset password" />
              <h1>Enter OTP</h1>
              <span className="form-subtitle">Check your email for the 6-digit code</span>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6} autoComplete="off" />
              <button type="submit" className="save-profile-btn liquid-btn mt-2">Verify OTP</button>
            </form>
          )}
          
          {view === 'reset-password' && (
            <form onSubmit={handleResetPasswordSubmit} className="split-form" autoComplete="off">
              <input type="password" name="fakepasswordremembered" style={{ opacity: 0, position: 'absolute', top: '-9999px' }} autoComplete="new-password" />
              <h1>Set New Password</h1>
              <span className="form-subtitle">For {forgotEmail}</span>
              <input type="password" placeholder="New Password" value={resetPassword} onChange={e => setResetPassword(e.target.value)} required autoComplete="new-password" />
              <input type="password" placeholder="Confirm Password" value={confirmResetPassword} onChange={e => setConfirmResetPassword(e.target.value)} required autoComplete="new-password" />
              <button type="submit" className="save-profile-btn liquid-btn mt-2">Update Password</button>
            </form>
          )}
        </div>

        {/* OVERLAY */}
        <div className="overlay-container">
          <div className="overlay liquid-overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost-btn liquid-hover" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>New Here?</h1>
              <p>Enter your personal details and start your fashion journey with us</p>
              <button className="ghost-btn liquid-hover" onClick={() => setIsRightPanelActive(true)}>Create Account</button>
            </div>
          </div>
        </div>
      </div>

      {/* TOP-RIGHT CORNER TOASTS */}
      <div className="tr-toast-container" aria-live="polite" aria-atomic="true">
        {toastList.map((toast) => {
          const IconComp =
            toast.type === 'success' ? Check :
            toast.type === 'error'   ? AlertCircle :
            toast.type === 'warning' ? AlertTriangle :
            Info;
          return (
            <div key={toast.id} className={`tr-toast ${toast.type} ${toast.closing ? 'closing' : ''}`}>
              <div className="tr-toast-icon">
                <IconComp size={18} strokeWidth={2.5} />
              </div>
              <div className="tr-toast-body">
                <div className="tr-toast-title">{toast.title}</div>
                {toast.desc ? <div className="tr-toast-desc">{toast.desc}</div> : null}
              </div>
              <button
                type="button"
                className="tr-toast-close"
                aria-label="Dismiss notification"
                onClick={() => removeToast(toast.id)}
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Login;
