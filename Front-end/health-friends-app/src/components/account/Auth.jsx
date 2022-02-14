import * as React from "react";
import {useNavigate,} from "react-router-dom";
import LoginForm from "./form/LoginForm";

export let AuthContext = React.createContext({
  user:localStorage.getItem('user'),
  login:()=>{},
  logout:()=>{},
});


export function AuthStatus() {
  let auth = React.useContext(AuthContext);
  let navigate = useNavigate();
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }
  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export function RequireAuth({children}) {
  const auth = React.useContext(AuthContext);
  if (!auth.user) {
    return <LoginForm />
  }
  return children;
}

