import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, AlertTriangle, ArrowLeft, Check, Info, X, Eye, EyeOff } from 'lucide-react';
import { isAuthProviderEnabled, supabase } from '../lib/supabaseClient';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function isAuthRateLimitError(error) {
  return error?.status === 429 || /rate.?limit|too many requests/i.test(error?.message || '');
}

function Login({ onLogin, onDemoLogin, recoveryMode = false, onPasswordResetSuccess }) {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [view, setView] = useState('login'); 
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [toastList, setToastList] = useState([]);
  const toastIdRef = useRef(0);
  const toastTimerRef = useRef({});

  useEffect(() => {
    if (recoveryMode) setView('reset-password');
  }, [recoveryMode]);

  const finishAuthLogin = async (authUser) => {
    const metadata = authUser.user_metadata || {};
    const user = {
      id: authUser.id,
      name: metadata.name || metadata.full_name || authUser.email?.split('@')[0] || 'Fashion Creator',
      email: authUser.email || '',
      phone: metadata.phone || authUser.phone || '',
      handle: metadata.handle || `@${(authUser.email?.split('@')[0] || 'fashionista').replace(/[^a-z0-9_]/gi, '').slice(0, 24)}`,
      bio: metadata.bio || '',
      photo: metadata.photo || metadata.avatar_url || null,
    };
    onLogin?.(user);
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

  const handleGoogleLogin = async () => {
    try {
      if (!await isAuthProviderEnabled('google')) {
        showToast('Google sign-in is not enabled for this app. Configure the Google provider in Supabase Auth first.');
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) showToast(error.message || 'Google sign-in could not be started.');
    } catch (error) {
      showToast(error?.message || 'Google sign-in could not be started.');
    }
  };

  const goToLoginView = () => {
    setForgotEmail('');
    setResetPassword('');
    setConfirmResetPassword('');
    setIsLoading(false);
    setView('login');
  };

  const openForgotView = () => {
    setForgotEmail('');
    setResetPassword('');
    setConfirmResetPassword('');
    setIsLoading(false);
    setView('forgot');
  };

  const triggerGoogleAuth = () => {
    handleGoogleLogin();
  };

  const BackButton = ({ onClick, label = 'Go back' }) => (
    <button type="button" className="liquid-back-btn" onClick={onClick} aria-label={label}>
      <span className="liquid-back-btn-glow" aria-hidden="true" />
      <ArrowLeft size={18} strokeWidth={2.25} />
    </button>
  );

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const baseHandle = signupName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20) || 'fashionista';
    const handle = `@${baseHandle}${Math.floor(100 + Math.random() * 900)}`;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail.trim().toLowerCase(),
        password: signupPassword,
        options: {
          data: { name: signupName.trim(), phone: signupPhone.trim(), handle },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        if (isAuthRateLimitError(error)) {
          showToast('Too many email requests. Wait before trying again; repeated signup attempts will not bypass the provider limit.');
        } else {
          showToast(error.message.includes('already registered') ? 'This email is already registered. Please sign in.' : error.message);
        }
        return;
      }
      if (data.user?.identities?.length === 0) {
        showToast('This email is already registered. Please sign in.');
        return;
      }
      if (data.session) {
        await finishAuthLogin(data.user);
      } else {
        setSignupEmail('');
        setSignupPassword('');
        setIsRightPanelActive(false);
        setView('login');
        showToast('Check your email to confirm your account, then sign in.', 'success');
      }
    } catch (error) {
      showToast(error?.message || 'Could not create your account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const currentEmail = loginEmail.trim().toLowerCase();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: loginPassword,
      });
      if (!error && data.user) {
        const savedLegacyUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const remainingLegacyUsers = savedLegacyUsers.filter((user) => String(user.email || '').toLowerCase() !== currentEmail);
        if (remainingLegacyUsers.length !== savedLegacyUsers.length) {
          localStorage.setItem('mockUsers', JSON.stringify(remainingLegacyUsers));
        }
        await finishAuthLogin(data.user);
        return;
      }

      if (isAuthRateLimitError(error)) {
        showToast('Too many sign-in attempts. Wait before trying again; email rate limits are enforced by the Auth provider.');
        return;
      }

      const credentialsRejected = error?.status === 400 && /invalid login credentials/i.test(error.message || '');
      if (!credentialsRejected) {
        showToast(error?.message || 'Could not sign in. Check your connection and try again.');
        return;
      }

      const legacyUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const legacyUser = legacyUsers.find((user) => (
        String(user.email || '').toLowerCase() === currentEmail && user.password === loginPassword
      ));
      if (legacyUser) {
        const baseHandle = String(legacyUser.handle || `@${currentEmail.split('@')[0]}`).replace(/^@/, '');
        const { data: migrated, error: migrationError } = await supabase.auth.signUp({
          email: currentEmail,
          password: loginPassword,
          options: {
            data: {
              name: legacyUser.name || currentEmail.split('@')[0],
              phone: legacyUser.phone || '',
              handle: `@${baseHandle}`,
              bio: legacyUser.bio || '',
            },
            emailRedirectTo: window.location.origin,
          },
        });
        if (migrationError) {
          showToast(isAuthRateLimitError(migrationError)
            ? 'Your legacy account migration email was rate-limited. Wait before retrying, or configure custom SMTP in Supabase Auth.'
            : migrationError.message.includes('already registered')
              ? 'Email or password is incorrect.'
              : migrationError.message);
          return;
        }
        if (migrated.user?.identities?.length === 0) {
          showToast('Email or password is incorrect.');
          return;
        }
        if (migrated.session) {
          localStorage.setItem('mockUsers', JSON.stringify(legacyUsers.filter((user) => user !== legacyUser)));
          await finishAuthLogin(migrated.user);
        } else {
          showToast('Your old account is now linked. Check your email to confirm, then sign in.', 'success');
        }
        return;
      }

      showToast('Email or password is incorrect.');
    } catch (error) {
      showToast(isAuthRateLimitError(error)
        ? 'Too many sign-in attempts. Wait before trying again; email rate limits are enforced by the Auth provider.'
        : error?.message || 'Could not sign in. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim().toLowerCase(), {
        redirectTo: window.location.origin,
      });
      if (error) {
        showToast(error.message);
        return;
      }
      setView('login');
      showToast('If an account exists for that email, a password reset link has been sent.', 'success');
    } catch (error) {
      showToast(error?.message || 'Could not send a reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (resetPassword !== confirmResetPassword) {
      showToast('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: resetPassword });
      if (error) {
        showToast(error.message);
        return;
      }
      await supabase.auth.signOut({ scope: 'local' });
      setResetPassword('');
      setConfirmResetPassword('');
      setView('login');
      onPasswordResetSuccess?.();
      showToast('Password updated successfully. Please sign in again.', 'success');
    } catch (error) {
      showToast(error?.message || 'Could not update the password. Please try again.');
    } finally {
      setIsLoading(false);
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
              <button type="submit" className="save-profile-btn liquid-btn mt-2" disabled={isLoading}>{isLoading ? 'Creating account...' : 'Sign Up'}</button>
              
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '16px 0', opacity: 0.6 }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)' }}></div>
                <span style={{ margin: '0 10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--text-secondary)' }}></div>
              </div>
              
              <div className="social-container" style={{ width: '100%' }}>
                <button type="button" className="social-btn liquid-hover" onClick={triggerGoogleAuth}>
                  <GoogleIcon /> <span style={{marginLeft: '8px'}}>Continue with Google</span>
                </button>
              </div>
            </form>
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
              
              <div className="social-container demo-social-container" style={{ width: '100%' }}>
                <button type="button" className="social-btn liquid-hover" onClick={triggerGoogleAuth}>
                  <GoogleIcon /> <span style={{marginLeft: '8px'}}>Continue with Google</span>
                </button>
                <button type="button" className="social-btn demo-login-btn liquid-hover" onClick={onDemoLogin}>
                  Continue as Demo
                </button>
              </div>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="split-form">
              <BackButton onClick={goToLoginView} label="Back to sign in" />
              <h1>Reset Password</h1>
              <span className="form-subtitle">Enter your email to receive a password reset link</span>
              <input type="email" placeholder="Email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required autoComplete="email" />
              <button type="submit" className="save-profile-btn liquid-btn mt-2" disabled={isLoading}>{isLoading ? 'Sending...' : 'Send reset link'}</button>
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
