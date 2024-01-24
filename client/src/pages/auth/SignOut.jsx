import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogOut";

const SignOut = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  // signout and redirect to home page after signout
  const removeUser = () => {
    logout();
    // redirect to home page using react router dom
    // useNavigate hook
    navigate("/");
  };

  // SignOut after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      removeUser();
    }, 3000);
  }, []);

  return (
    <div>
      <p>
        You have been signed out. <br />
        Please wait while we redirect you to the home page.
      </p>
    </div>
  );
};

export default SignOut;
