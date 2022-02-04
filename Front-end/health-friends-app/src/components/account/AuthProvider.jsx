import * as React from "react";
import {useNavigate,} from "react-router-dom";

export let AuthContext = React.createContext(null);


// 하위 컴포넌트들이 user, signin, signout을 사용하게 해준다.
export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  let login = (newUser) => {
    // fakeAuthProvider.signin
    setUser(newUser);
    console.log(user);
  };

  let signout = () => {
    setUser(null);
  };
  let value = { user, login, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

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
  
  let auth = React.useContext(AuthContext);

  if (!auth.user) {
    props.setDialog('login')
    return <h1>Protected</h1>
  }
  return props.children;
}

