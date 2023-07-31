import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './UserDashboard.scss'

export default function UserDashboard() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const [popTitle, setPopTitle] = useState()
  const [isPopOpen, setIsPopOpen] = useState(false)

  useEffect(() => {
    const screenSize = () => {
      setIsSmallScreen(window.innerWidth <= 880)
    }
    screenSize();
    window.addEventListener('resize', screenSize);

    return () => {
      window.removeEventListener('resize', screenSize)
    }
  }, [])

  const MyJobsClicked = () => {
    navigate('/myjobs')
    ClosePopUp()
  }

  const handlePopUp = (event) => {
    const title = (event.target.value)
    setPopTitle(title)
    setIsPopOpen(!isPopOpen)
    ClosePopUp()
  }

  const ClosePopUp = () => {
    setIsPopOpen(!isPopOpen)
  }

  const SmallScreenDashboard = (
    <>
      <button className="dashboard-button" onClick={MyJobsClicked}>
        My Jobs
      </button>
      <button className="dashboard-button" onClick={MyJobsClicked}>
        My proposal/orders
      </button>
      <button className="dashboard-button" value='Number of following' onClick={handlePopUp}>
        Number of following
      </button>
      <button className="dashboard-button" onClick={MyJobsClicked}>
        My reportst
      </button>
      <button className="dashboard-button" onClick={MyJobsClicked}>
        My follow Post's
      </button>
      <button className="dashboard-button" onClick={MyJobsClicked}>
        My favorite list
      </button>
      <button className="dashboard-button" value='Balance' onClick={handlePopUp}>
        Balance
      </button>
    </>
  )
  return (
    <>
      {isSmallScreen ?
        (
          <div className="category-head">
            <div className="category-button">
              {SmallScreenDashboard}
            </div>
          </div>
        )
        :
        (
          <div className="category-head">
            <div className="category-button">
              {SmallScreenDashboard}
              <button className="dashboard-button" onClick={() => navigate('/resultssearch')}>
                Hire freelancer
              </button>
              <button className="dashboard-button" onClick={() => navigate('/resultssearch')}>
                Find a job
              </button>
              <button className="dashboard-button" onClick={() => navigate('/getidea')}>
                Get idea
              </button>
            </div>
          </div>
        )
      }
      {isPopOpen &&
        <div className="pop-up2">
          <div className='close-pop-up2'>
            <button className='btn-closepopup2' onClick={ClosePopUp}>X</button>
          </div>
          <div className="pop-window2">
            <span>{popTitle} : </span>
            <span>0</span>
          </div>
        </div>

      }
    </>
  )
}
