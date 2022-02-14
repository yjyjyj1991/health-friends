import * as React from "react";
import {useNavigate,} from "react-router-dom";

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

export function RequireAuth(props) {
  // console.log('requireauth');
  const auth = React.useContext(AuthContext);
  if (!auth.user) {
    props.setDialog('login')
    return null
  }
  return props.children;
}

