import React, {useState, useEffect} from "react";
import {  Switch, Route, Link  } from "react-router-dom";
import DashboardService from "../services/dashboard.service";
import Dashboard from "./Dashboard";

const DashboardsList = () => {
    const [dashboards, setDashboards] = useState([]);

    useEffect(() => {
        retrieveDashboards();
    }, []);

    const retrieveDashboards = () => {
        DashboardService.getAll()
            .then(response => {
                setDashboards(response.data);
                console.error(response.data);
            })
            .catch(e => {
                console.error(e);
            })
    };

    return (
        <div>
            <h4>Dashboards List</h4>
            <div className="list">
                <ul className="list-group">
                    {dashboards &&
                    dashboards.map((dashboard, index) => (
                    <li className={"list-group-item "} key={index}>
                        {/* <Link to={"/dashboard/" + dashboard.id + "/tasks"} className="nav-link"> */}
                        {/* <Link to={`/dashboard/${dashboard.id}/tasks`} className="nav-link">
                            {dashboard.name}
                        </Link> */}
                        <Link to={`/dashboard/${dashboard.id}/tasks`} className="nav-link">
                            {dashboard.name}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardsList;