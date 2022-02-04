import * as React from "react";
import {
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

export let AuthContext = React.createContext(null);


// 하위 컴포넌트들이 user, signin, signout을 사용하게 해준다.
export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  let login = (newUser, callback) => {
    // fakeAuthProvider.signin
    setUser(newUser);
    callback();
  };
  let signout = (callback) => {
    setUser(null);
    callback();
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

export function RequireAuth({ children }) {
  let auth = React.useContext(AuthContext);
  // let location = useLocation();
  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // return <Navigate to="/login" state={{ from: location }} replace />;
    return 
  }
  return children;
}

