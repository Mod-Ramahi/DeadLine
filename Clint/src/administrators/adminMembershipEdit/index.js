import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import './Plan.scss'
import { getPlans } from "../../api";

const MembershipsEdit = () => {
    const [plans, setPlans] = useState([])
    useEffect(() => {
        const getAllPlans = async () => {
            try {
                const res = await getPlans()
                if (res.status === 200) {
                    console.log('got all plans', res)
                    setPlans(res.data)
                } else {
                    console.log('cannot get plans', res)
                }
            } catch (error) {
                console.error(error)
            }

        }
        getAllPlans()
    }, [])

    const plansMap = plans.map((p) => (
        <Plan plan={p} key={p._id} />))
    return (
        <div className="plans-container">
            {plansMap}
        </div>
    )
}

export default MembershipsEdit