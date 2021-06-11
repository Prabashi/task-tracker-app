import React, { useState, useEffect } from "react";

import DashboardService from "../services/dashboard.service";

// TODO: Fix issue: Click on Add Dashboard while in Edit Dashboard; the data in form fields still exist
const AddDashboard = (props) => {
  // const [content, setContent] = useState("");

  const initialDashboardState = props && props.location && props.location.dashboardProps ? props.location.dashboardProps : {
    id: null,
    name: "",
    description: "",
    // tasks: []
  };

  const [dashboard, setDashboard] = useState(initialDashboardState);
  const [submitted, setSubmitted] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setDashboard({...dashboard, [name]: value});
  }

  const saveDashboard = () => {
    var data = {
      name: dashboard.name,
      description: dashboard.description
    };

    if (props && props.location && props.location.dashboardProps) {
      DashboardService.update(dashboard.id, data)
        .then(response => {
          setUpdated(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      DashboardService.create(data)
      .then(response => {
        setDashboard({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      };
    }

    const newDashboard = () => {
      setDashboard(initialDashboardState);
      setSubmitted(false);
    };

    

  // useEffect(() => {
  //   DashboardService.addDashboard().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  return (
    <div className="container">
      {/* <header className="jumbotron">
        <h3>{content}</h3>
      </header> */}
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>Dashboard added successfully!</h4>
            <button className="btn btn-success" onClick={newDashboard}>
              Add
            </button>
          </div>
        ) : updated ? (
          <div>
            <h4>Dashboard updated successfully!</h4>
            <button className="btn btn-success" onClick={newDashboard}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                defaultValue={dashboard.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                defaultValue={dashboard.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>

            <button onClick={saveDashboard} className="btn btn-success">
              {props && props.location && props.location.dashboardProps ? "Update" : "Create"}
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDashboard;