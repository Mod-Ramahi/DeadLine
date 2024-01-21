import React, { useEffect, useState } from "react";
import { getItem } from "../../utils/localStorge";
import { SettingsRequest, getUserById } from "../../api";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Payment() {
    const [userBalance, setUserBalance] = useState(0)
    const [user, setUser] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const token = await getItem('token');
                if (token) {
                    const jwtDecodeToken = jwtDecode(token)
                    const userId = jwtDecodeToken.id;
                    const response = await getUserById(userId)
                    if (response.status === 200) {
                        setUser(response)
                    }
                } else {
                    alert('you need to sign in')
                    navigate('/')
                }
            } catch (error) {
                console.error('error')
            }
        }
        getUserInfo()
    }, [])
    const handleBalanceChange = (event) => {
        setUserBalance(event.target.value)
    }
    const submitPay = async () => {
        if (userBalance) {
            try {
                const data = { userBalance }
                const res = await SettingsRequest(data)
                console.log(res, userBalance)
                navigate('/userhome')
            } catch (error) {
                console.error(error)
            }
        }else{
            console.log('enter amount')
        }

    }
    return (
        <div style={{ margin: '20rem 0', display: 'flex', flexDirection: 'column' }}>
            <span style={{ padding: '10rem', fontSize: '23px', fontWeight: 'bold' }}> Payment </span>
            <span>Enter amount:</span>
            <input type="number" onChange={handleBalanceChange} />
            <button onClick={submitPay}>Submit payment</button>
        </div>
    )
}