import React, { useState } from "react";
import './AdminSignin.scss';

export default function AdminSignin() {
    const [userName, setUserName] = useState();
    const [userId, setUserId] = useState();
    const [userPass, setUserPass] = useState();

    const handleAdminName = (event) => {
        setUserName(event.target.value)
    }
    const handleAdminID = (event) => {
        setUserId(event.target.value)
    }
    const handleAdminPass = (event) => {
        setUserPass(event.target.value)
    }
    const handleAdminSubmit = () => {
        console.log('ok')
    }

    return (
        <div className="signin_block">
            <h3>welcome back!</h3>
            <form onSubmit={handleAdminSubmit}>
                <div className="admin_form">
                    <span>User name:</span>
                    <input type="text" id="adminname" onChange={handleAdminName}></input>
                    <span>User ID:</span>
                    <input type="text" id="adminid" onChange={handleAdminID}></input>
                    <span>password:</span>
                    <input type="password" id="adminpass" onChange={handleAdminPass}></input>
                    <button id="adminbtn" type="submit">Enter</button>
                </div>
            </form>
        </div>
    )
}