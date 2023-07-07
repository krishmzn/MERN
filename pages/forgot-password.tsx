import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [codeSent, setCodeSent] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Cookies.set('email', email);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/password-forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'email': email }),
      });
      
      
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setEmail('');
        setCodeSent(true)
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while processing your request');
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailCookie = Cookies.get('email')

    try {
      const response = await fetch('http://localhost:5000/api/forgot-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'email': emailCookie, 'verificationCode': verificationCode, 'newPassword': newPassword }),
      });


      const data = await response.json();
      if (response.ok) {
        
        setSuccessMessage(data.message);
        setEmail('');
        setVerificationCode('');
        setNewPassword('');
        router.push('/login');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while resetting the password');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      {codeSent === false ? (
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Verification Code</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
