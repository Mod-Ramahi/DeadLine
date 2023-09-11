import React, { useState, useEffect } from "react";
import './Freelancer.scss'
import UserProfile from "../../components/freelancer/UserProfile";
import { Users } from "../../data/Users";
import { useParams } from "react-router-dom";
import { getProfileById, getallProfiles } from "../../api";

export default function Freelancer () {
    const {UserID} = useParams();
    const [clickedUser, setClickedUser] = useState(null);

    useEffect (() => {
        const getProfile = async () => {
            const response = await getProfileById(UserID)
            console.log(response)
            setClickedUser(response)
        }
        getProfile()
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