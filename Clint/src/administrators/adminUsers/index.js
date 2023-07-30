import React from "react";
import './AdminUsers.scss';
import { Link } from "react-router-dom";

export default function AdminUser() {
    return (
        <div className="user-box">
            <div className="search-user">
                <div className="search-field">
                    <span>User ID:</span>
                    <input type="text" id="id-input" />
                </div>
                <div className="search-field">
                    <span>User Email:</span>
                    <input type="text" id="email-input" />
                </div>
                <div className="search-field">
                    <span>User Name:</span>
                    <input type="text" id="name-input" />
                </div>
            </div>
            <div className="users-result">
                <div className="result-user">
                    <Link className="result-user" to='/administration/single-user' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span>user name</span>
                        <span>user info</span>
                        <span>user id</span>
                        <span>user email</span>
                    </Link>
                </div>
                <div className="result-user">
                    <span>user name</span>
                    <span>user info</span>
                    <span>user id</span>
                    <span>user email</span>
                </div>
                <div className="result-user">
                    <span>user name</span>
                    <span>user info</span>
                    <span>user id</span>
                    <span>user email</span>
                </div>
                <div className="result-user">
                    <span>user name</span>
                    <span>user info</span>
                    <span>user id</span>
                    <span>user email</span>
                </div>
            </div>
        </div>
    )
}