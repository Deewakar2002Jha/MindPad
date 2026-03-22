import { SignIn } from '@clerk/react';

export default function Login() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
      <SignIn routing="path" path="/login" signUpUrl="/register" fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
