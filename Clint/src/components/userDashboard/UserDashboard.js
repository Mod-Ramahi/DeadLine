import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './UserDashboard.scss'
import { getItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";
import { getUserById } from "../../api";


export default function UserDashboard() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const [popTitle, setPopTitle] = useState()
  const [isPopOpen, setIsPopOpen] = useState(false)
  const [seller, setSeller] = useState(false)
  const [balance, setBalance] = useState()

  useEffect(() => {
    const checkType = () => {
      const token = getItem('token');
      const decodeToken = jwtDecode(token)
      const IdUser = decodeToken.id
      if (IdUser) {
        getUserById(IdUser).then((user) => {
          const type = user.userType;
          const balance = user.balance;
          setBalance(balance)
          if (type === 'seller') {
            setSeller(true)
          } else {
            setSeller(false)
          }
        }).catch((error) => {
          console.error(error)
        })
      } else {
        setSeller(false)
        navigate('/')
      }
    }
    checkType()
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
    ClosePopUp()
    navigate('/myjobs')
  }
  const MyStatesClicked = () => {
    ClosePopUp()
    navigate('/myplanstates')
  }
  const MyProposalClicked = () => {
    ClosePopUp()
    navigate('/myproposals')
  }


  // const handlePopUp = (event) => {
  //   const title = (event.target.value)
  //   setPopTitle(title)
  //   setIsPopOpen(!isPopOpen)
  //   ClosePopUp()
  // }
  const ClosePopUp = () => {
    setIsPopOpen(!isPopOpen)
  }


  const SmallScreenDashboard = (
    <>
      {
        seller ?
          <button className="dashboard-button" onClick={MyProposalClicked}>
            My Proposals
          </button>
          :
          <button className="dashboard-button" onClick={MyJobsClicked}>
            My Jobs
          </button>
      }
      <button className="dashboard-button" onClick={MyJobsClicked}>
        My live orders
      </button>
      {/* <button className="dashboard-button" value='Number of following' >
        Number of following
      </button> */}
      <button className="dashboard-button" onClick={MyStatesClicked}>
        My plan stats
      </button>
      <button className="dashboard-button" onClick={() => navigate('/myfollowing')}>
        My following
      </button>
      <button className="dashboard-button" onClick={MyJobsClicked}>
        My favorite list
      </button>
      <button className="dashboard-button" value='Balance' onClick={()=>navigate('/payment')}>
        Balance: {balance}
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
      {/* {isPopOpen &&
      <div className="modal-div">
        <div className="pop-up2">
          <div className='close-pop-up2'>
            <button className='btn-closepopup2' onClick={ClosePopUp}>X</button>
          </div>
          <div className="pop-window2">
            <span>{popTitle} : </span>
            <span>0</span>
          </div>
        </div>
      </div>
        

      } */}

    </>
  )
}
