import React from 'react'
import UserDashboard from '../../components/userDashboard/UserDashboard'
import MostPopular from '../../components/homemostpoopular/MostPopular'
import {Cards} from "../../Cards"

export default function UserHome() {
  return (
    <>
        <UserDashboard/>
        <MostPopular title={"User Interested"} cards={Cards} number={8}/>
        <hr className='hr'></hr>
        <MostPopular title={"Most Popular"} number={4} cards={Cards}/>
        <hr className='hr'></hr>
    </>
  )
}
