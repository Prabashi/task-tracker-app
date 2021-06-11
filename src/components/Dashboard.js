import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import DashboardService from "../services/dashboard.service";
import TaskService from "../services/task.service";
import DashboardTaskListItem from './DashboardTaskListItem'

const Dashboard = (props) => {
  const [dashboard, setDashboard] = useState({});
  const [tasks, setTasks] = useState([]);

  const getDashboard = id => {
    DashboardService.get(id)
      .then(response => {
        setDashboard(response.data);
      })
      .catch(e => {
        console.error(e)
      })

    DashboardService.getTasks(id)
      .then(response => {
        setTasks(response.data);
        console.error(response.data);
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    getDashboard(props.match.params.id);
  }, [props.match.params.id]);

  const updateStatus = (id, selectedValue) => {
    TaskService.updateTask(id, {status: selectedValue})
      .then(response => { // TODO
        // setTasks(response.data);
        console.error(response.data);
        if (response.data.status == "success") {
          setTasks(tasks.map((task) => task.id === id ? {...task, status: selectedValue} : task));
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <div>
        <Link to={`/dashboard/${dashboard.id}/view`}>{dashboard.name}</Link>
            <DashboardTaskListItem headerName={'TODO'} tasks={tasks.filter((task) => task.status === 'TODO')} 
            onSelectStatus={updateStatus} />
            <DashboardTaskListItem headerName={'In Progress'} tasks={tasks.filter((task) => task.status === 'In Progress')} 
            onSelectStatus={updateStatus} />
            <DashboardTaskListItem headerName={'Done'} tasks={tasks.filter((task) => task.status === 'Done')}
            onSelectStatus={updateStatus} />
    </div>
  );
};

export default Dashboard;