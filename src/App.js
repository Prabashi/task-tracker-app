import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
// import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import AddDashboard from "./components/AddDashboard";
import DashboardsList from "./components/DashboardsList";
import AddTask from "./components/AddTask";
import DashboardDetails from "./components/DashboardDetails";

// import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [showAddDashboard, setShowAddDashboard] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDashboards, setShowDashboards] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAddDashboard(user.roles.includes("ROLE_USER_LVL_1"));
      // TODO: Once Admin panel is completed (Admin can change users' role), remove or clause. If a user's role changes to level 1, he automatically should a assigned role level 2 also
      setShowAddTask(user.roles.includes("ROLE_USER_LVL_1") || user.roles.includes("ROLE_USER_LVL_2"));
      setShowDashboards(user.roles.includes("ROLE_USER_LVL_1") || user.roles.includes("ROLE_USER_LVL_2"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          The Tracker
        </Link>
        <div className="navbar-nav mr-auto">
          {showAddDashboard && (
            <li className="nav-item">
              <Link to={"/dashboard/add"} className="nav-link">
                Add Dashboard
              </Link>
            </li>
          )}

          {showAddTask && (
            <li className="nav-item">
              <Link to={"/task/add"} className="nav-link">
                Add Task
              </Link>
            </li>
          )}

          {showDashboards && (
            <li className="nav-item">
              <Link to={"/dashboard/all"} className="nav-link">
                Dashboards
              </Link>
            </li>
          )}

          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )} */}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            {/* <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li> */}
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div>
        <Switch>
          {/* <Route exact path={["/", "/home"]} component={Home} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* <Route exact path="/profile" component={Profile} /> */}
          {/* <Route path="/user" component={BoardUser} /> */}
          <Route path="/dashboard/add" component={AddDashboard} />
          <Route exact path="/dashboard/all" component={DashboardsList} />
          <Route path="/task/add" component={AddTask} />
          <Route path="/dashboard/:id/tasks" component={Dashboard} />
          <Route path="/dashboard/:id/view" component={DashboardDetails} />
          <Route path="/dashboard/:id/edit" component={AddDashboard} />
          {/* <Route path="/task/add" render={props =>
          (<AddTask {...props} dashboards={dashboards} />)} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default App;