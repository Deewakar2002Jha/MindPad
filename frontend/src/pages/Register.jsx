import { SignUp } from '@clerk/react';

export default function Register() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
      <SignUp routing="path" path="/register" signInUrl="/login" fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
