'use client';

import React from 'react';
import LoginModal from 'components/modalLogin';


export default function Login() {
    const [showLoginModal, setShowLoginModal] = React.useState(true);
  return (
    <LoginModal onClose={() => setShowLoginModal(false)}/>
  );
}