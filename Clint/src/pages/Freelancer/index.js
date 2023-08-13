import React, { useState, useEffect } from "react";
import './Freelancer.scss'
import UserProfile from "../../components/freelancer/UserProfile";
import { Users } from "../../data/Users";
import { useParams } from "react-router-dom";

export default function Freelancer () {
    const {UserID} = useParams();
    const [clickedUser, setClickedUser]= useState(null);

    useEffect (() => {
        const targetUser = Users.find(user => user.id === parseInt(UserID))
        setClickedUser(targetUser);
    }, [UserID]);
    if (!clickedUser) {
        return <p>Loading...</p>;
      }
    

    return (
        <>
        <UserProfile user={clickedUser} />
        </>
    )
}