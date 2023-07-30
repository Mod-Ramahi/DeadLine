import React from "react";

export default function AdminSingleUser() {
    return (
        <div className="user-result-box">
            <div className="user-result-top-box">
                <div className="user-result-left-box">
                    <div className="user-result-profile">
                        <p>user proile</p>
                    </div>
                    <div className="user-result-info">
                        <p>user main info ex: email, skills, interested...</p>
                    </div>
                </div>
                <div className="user-result-right-box">
                    <p>Admin Actions: Block, Delete, and Add</p>
                </div>
            </div>
            <div className="user-result-bottom-box">
                <div className="user-related">
                    <p>related jobs: 0</p>
                </div>
                <div className="user-related">
                    <p>related proposals: 0</p>
                </div>
                <div className="user-related">
                    <p>related reviews: 0</p>
                </div>
                <div className="user-related">
                    <p>related reports: 0</p>
                </div>
                <div className="user-related">
                    <p>related payments: 0</p>
                </div>
                <div className="user-related">
                    <p>related jobs: 0</p>
                </div>
            </div>
        </div>
    )
}