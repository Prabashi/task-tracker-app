import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import TaskService from "../services/task.service";

const TaskDetails = (props) => {
    const [task, setTask] = useState({});
    const [isDeleted, setDeleteState] = useState(false);

    const getTask = id => {
        TaskService.get(id)
          .then(response => {
            setTask(response.data);
          })
          .catch(e => {
            console.error(e)
          })
    };

    const deleteTask = () => {
        TaskService.deleteTask(props.match.params.id)
        .then(response => {
          if (response.data.status == "success") {
            setDeleteState(true);
          }
        })
        .catch(e => {
          console.error(e)
        })
    };

    useEffect(() => {
        getTask(props.match.params.id);
      }, [props.match.params.id]);

    return (
        <div>
            <h3>{task.title}</h3>
            <h5>{task.description}</h5>

            <Link to={{pathname: `/task/${task.id}/edit`, taskProps: task
            }} className="btn btn-primary">Edit</Link>

            <button type="button" className="btn btn-primary" onClick={deleteTask}>Delete</button>

            {isDeleted && <Redirect to='/dashboard/all' />}
        </div>
    );
};

export default TaskDetails;