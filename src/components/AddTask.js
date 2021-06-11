import React, { useState, useEffect } from "react";

import DashboardService from "../services/dashboard.service";
import TaskService from "../services/task.service";

// TODO: Add Assignee and Reporter
const AddTask = (props) => {
  const [dashboard, setDashboard] = useState(props && props.location && props.location.taskProps ?
     props.location.taskProps.dashboard : "609d77a2228f6e5088ad565e"); // TODO
  const [priority, setPriority] = useState(props && props.location && props.location.taskProps ?
    props.location.taskProps.priority : "Medium");
  const [status, setStatus] = useState(props && props.location && props.location.taskProps ?
    props.location.taskProps.status : "TODO");

  const initialTaskState = props && props.location && props.location.taskProps ? props.location.taskProps : {
    title: "",
    description: "",
    dashboard: dashboard, // TODO: Should be mapped with Dashboard model
    estimate: "", // TODO: Should be able to do calculations on this
    priority: priority, // Enum
    status: status // Enum
  };

  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [dashboards, setDashboards] = useState([]);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setTask({...task, [name]: value});
  }

  // useEffect(() => {
  //   setDashboards([{id: 1, name: "Dashboard1"}]);
  // }, []);

  const saveTask = () => {
    var data = {
      title: task.title,
      description: task.description,
      dashboard: dashboard,
      estimate: task.estimate,
      priority: priority,
      status: status
    };

    if (props && props.location && props.location.taskProps) {
      TaskService.updateTask(task.id, data)
        .then(response => {
          setUpdated(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      TaskService.create(data)
      .then(response => {
        setTask({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          dashboard: response.data.dashboard,
          estimate: response.data.estimate,
          priority: response.data.priority,
          status: response.data.status
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  const newTask = () => {
    setTask(initialTaskState);
    setDashboard("609d77a2228f6e5088ad565e");
    setPriority("Medium");
    setStatus("TODO")
    setSubmitted(false);
  };

  return (
    <div className="container">
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>Task added successfully!</h4>
            <button className="btn btn-success" onClick={newTask}>
              Add
            </button>
          </div>
        )  : updated ? (
          <div>
            <h4>Task updated successfully!</h4>
            <button className="btn btn-success" onClick={newTask}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                defaultValue={task.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="textarea"
                className="form-control"
                id="description"
                required
                defaultValue={task.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>


            <div className="form-group">
              <label htmlFor="dashboard">Dashboard</label>
              <select defaultValue={dashboard} onChange={(e) => setDashboard(e.target.value)}>
                    <option value="609d77a2228f6e5088ad565e">Board1</option>
                    <option value="609ebdf2228f6e5088ad565f">Board2</option>
                    {/* {dashboards.map((dashboard) => {
                        <option key={dashboard.id} value={dashboard.name}>{dashboard.name}</option>
                    })} */}
                </select>
            </div>

            <div className="form-group">
              <label htmlFor="estimate">Estimate</label>
              <input
                type="text"
                className="form-control"
                id="estimate"
                required
                defaultValue={task.estimate}
                onChange={handleInputChange}
                name="estimate"
              />
            </div>

            <div className='form-group'>
                <label htmlFor="priority">Priority</label>
                <select defaultValue={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Highest">Highest</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Lowest">Lowest</option>
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor="status">Status</label>
                <select defaultValue={status}  onChange={(e) => setStatus(e.target.value)}>
                    <option value="TODO">TODO</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                    <option value="Remove">Remove</option>
                </select>
            </div>

            <button onClick={saveTask} className="btn btn-success">
              {props && props.location && props.location.taskProps ? "Update" : "Create"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTask;