import { NavLink, } from "react-router-dom";

function App() {
  return (
    <div >
      <nav style={{ display:'flex',justifyContent:'space-around' }}>
        <NavLink
          style={({ isActive }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "red" : ""
            };
          }}
          to='/signup'
        >
          signup
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "red" : ""
            };
          }}
          to='/formik'
        >
          formik
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "red" : ""
            };
          }}
          to='/both'
        >
          both
        </NavLink>
      </nav>
    </div>
  );
}

export default App;
