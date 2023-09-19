import React, { useEffect, useState } from "react";
import { getProposalByJobId } from "../../api";
import { Link } from "react-router-dom";
import Proposal from "../../components/proposal/Proposal";

export default function RelatedProposals({ jobId }) {
    const [bids, setBids] = useState([])
    const [found, setFound] = useState(false)
    useEffect(() => {
        const getProposals = async () => {
            if (jobId) {
                console.log("lolololololololo:", jobId)
                try {
                    const response = await getProposalByJobId(jobId)
                    if (response.status === 200 || response.legth !==0) {
                        setBids(response)
                        setFound(true)
                    } else {
                        console.log('no bids')
                        setFound(false)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }
        getProposals()
    }, [])

    const proposalsRender = bids.map((bid) => (
        <Link to={`/proposalPage/${bid._id}`} style={{ color: 'inherit', textDecoration: 'none' }} key={bid._id}>
            <Proposal bid={bid} />
        </Link>
    ))
    return (
        <>{found && <>
            { proposalsRender }</>
        }

        </>
    )
}