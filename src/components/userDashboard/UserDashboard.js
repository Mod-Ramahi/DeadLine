import React from "react";
import './UserDashboard.scss'

export default function UserDashboard() {
  return (
    <div className="category_head">
      <div className="category_button">
        <button className="dashboard_button">
          My Jobs
        </button>
        <button className="dashboard_button">
          My proposal/orders
        </button>
        <button className="dashboard_button">
          Number of following
        </button>
        <button className="dashboard_button">
          My reportst
        </button>
        <button className="dashboard_button">
          Tournaments
        </button>
        <button className="dashboard_button">
          My favorite list
        </button>
        <button className="dashboard_button">
          Balance
        </button>
        <button className="dashboard_button">
          Hire freelancer
        </button>
        <button className="dashboard_button">
          Find a job
        </button>
        <button className="dashboard_button">
          Get idea
        </button>
      </div>
    </div>

  )
}
