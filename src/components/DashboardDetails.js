import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import DashboardService from "../services/dashboard.service";

const DashboardDetails = (props) => {
    const [dashboard, setDashboard] = useState({});
    const [isDeleted, setDeleteState] = useState(false);

    const getDashboard = id => {
        DashboardService.get(id)
          .then(response => {
            setDashboard(response.data);
          })
          .catch(e => {
            console.error(e)
          })
    };

    const deleteDashboard = () => {
      DashboardService.deleteDashboard(props.match.params.id)
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
        getDashboard(props.match.params.id);
      }, [props.match.params.id]);

    return (
        <div>
            <h3>{dashboard.name}</h3>
            <h5>{dashboard.description}</h5>

            <Link to={{pathname: `/dashboard/${dashboard.id}/edit`, dashboardProps: dashboard
            }} className="btn btn-primary">Edit</Link>

            <button type="button" className="btn btn-primary" onClick={deleteDashboard}>Delete</button>

            {isDeleted && <Redirect to='/dashboard/all' />}
        </div>
    );
};

export default DashboardDetails;