import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import DashboardService from "../services/dashboard.service";

const DashboardDetails = (props) => {
    const [dashboard, setDashboard] = useState({});

    const getDashboard = id => {
        DashboardService.get(id)
          .then(response => {
            setDashboard(response.data);
          })
          .catch(e => {
            console.error(e)
          })
    };

    const editDashboard = () => {

    }

    useEffect(() => {
        getDashboard(props.match.params.id);
      }, [props.match.params.id]);

    return (
        <div>
            <h3>{dashboard.name}</h3>
            <h5>{dashboard.description}</h5>

            <Link to={`/dashboard/${dashboard.id}/edit`} className="btn btn-primary">Edit</Link>
        </div>
    );
};

export default DashboardDetails;