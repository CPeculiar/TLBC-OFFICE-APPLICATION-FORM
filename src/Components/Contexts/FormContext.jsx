import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showSupportForm, setShowSupportForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
    setShowSupportForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
    setShowForgotPasswordForm(false);
    setShowSupportForm(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordForm(true);
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowSupportForm(false);
  };

  const handleSupportClick = () => {
    setShowSupportForm(true);
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
  };

  const handleBackToHome = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
    setShowSupportForm(false);
  };

  return (
    <FormContext.Provider
      value={{
        showLoginForm,
        showRegisterForm,
        showForgotPasswordForm,
        showSupportForm,
        handleLoginClick,
        handleRegisterClick,
        handleForgotPasswordClick,
        handleSupportClick,
        handleBackToHome,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
