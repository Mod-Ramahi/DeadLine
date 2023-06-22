import React, { useState } from "react";
import {Link} from 'react-router-dom'
import UserDashboard from "../../components/userDashboard/UserDashboard"
import './ResultSearch.scss'
import SerachFilter from "../../components/searchfilter/SearchFilter"
import CardsResults from "../../components/cardsresults/CardsResults";
import { Users } from "../../data/Users";

export default function ResultSearch() {
    const [selectedUser, setSelectedUser]= useState(null);

    // const history= useHistory();
    const HandleUserID = (UserID) => {
        setSelectedUser(UserID);
        console.log(UserID)
    }
    const userRender = Users.map((user) => {
        return (
        <Link to={`/freelancer/${user.id}`} key={user.id}>
            <CardsResults user={user}  onUserClick={HandleUserID}/>
        </Link>)
    })
    return (
        <>
            <UserDashboard />
            <div className="adcards">
                <p>Best Members</p>
                <div className="memberscards">
                    <div className="adimg"><img alt="" src="" /></div>
                    <div className="adimg"><img alt="" src="" /></div>
                    <div className="adimg"><img alt="" src="" /></div>
                    <div className="adimg"><img alt="" src="" /></div>
                </div>
            </div>
            <SerachFilter />
            <div className="results_render">
                {userRender}
            </div>
        </>
    )
}