import React, { useEffect, useState } from 'react'
import UserDashboard from '../../components/userDashboard/UserDashboard'
import MostPopular from '../../components/homemostpoopular/MostPopular'
import {Cards} from "../../Cards"
import { getItem } from '../../utils/localStorge'
import jwtDecode from 'jwt-decode'
import { getUserById } from '../../api'
import './UserHome.scss'

export default function UserHome() {
  const [userCategory, setUserCategory] = useState(null)
  useEffect(()=>{
    const token = getItem('token')
    const decodedToken = jwtDecode(token)
    const tokenId = decodedToken.id
    getUserById(tokenId).then((user) => {
      const category = user.category
      setUserCategory(category)
      console.log('most popular category:', category)
    }).catch((error) => {
      console.error(error)
    })
  },[])
  return (
    <>
        <UserDashboard/>
        {userCategory !==null? (
        <MostPopular title={"User Interested"} number={4} category={userCategory} />
        ): null}
        <hr className='hr' ></hr>
        <MostPopular title={"Most Popular"} number={8} />
        <hr className='hr'></hr>
    </>
  )
}
