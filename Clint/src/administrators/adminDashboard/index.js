import React from "react";
import './AdminDashboard.scss'
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashnoard() {
    const navigate = useNavigate()
    return (
        <>
            <div className="admin-dashboard">
                <div className="admin-section">
                    <div className="left-menu">
                        <Link to='/administration/users' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className="users-box">Users</p>
                        </Link>
                        <Link to='/administration/jobs' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className="users-box">Jobs</p>
                        </Link>
                        <Link to='/administration/proposals' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className="users-box">Proposals</p>
                        </Link>
                        <Link to='/administration/membership' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className="users-box">Memberships</p>
                        </Link>

                        <Link to='/administration/reports' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className="users-box">Reports</p>
                        </Link>
                        <Link to='/administration/payments' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className="users-box">Payments</p>
                        </Link>
                        <Link to='/administration/chat' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className="users-box">Chat</p>
                        </Link>
                    </div>
                    <div className="right-section">
                        <img alt="test" src="https://www.tibco.com/sites/tibco/files/media_entity/2022-01/LineChart-01.svg" />
                        <div className="description">
                            <span className="circle-name">Users <span className="circle-red"></span></span>
                            <span className="circle-name">Jobs <span className="circle-blue"></span></span>
                            <span className="circle-name">Proposals <span className="circle-yellow"></span></span>
                            <span className="circle-name">Subscriptions <span className="circle-green"></span></span>
                        </div>
                    </div>
                </div>
                <div className="management-section">
                    <div className="management-options">
                        <p className="mngmnt-option">Users</p>
                        <p className="mngmnt-option">Jobs</p>
                        <p className="mngmnt-option">Proposals</p>
                        <p className="mngmnt-option" onClick={() => navigate('/administration/membershipedit')}>Memberships</p>
                        <p className="mngmnt-option">Admin actions</p>
                    </div>
                </div>
            </div>
        </>
    )


}