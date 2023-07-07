import { useState } from 'react';
import { useRouter } from 'next/router';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [ resetToken, setResetToken ] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send a POST request to your backend API to reset the password
      // Include the resetToken and newPassword in the request body
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken, newPassword }),
      });

      if (response.ok) {
        // Password reset successful
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('An error occurred while resetting the password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleResetPassword}>
      <input
          type="text"
          placeholder="Reset code"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
          required
        />
      <input
          type="password"
          placeholder="Confirm Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
