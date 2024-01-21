import React, { useState, useEffect } from "react";
import { getItem } from "../../utils/localStorge";
import jwtDecode from "jwt-decode";
import { getAndDeleteProposal, getProposalByCreatorId } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import Proposal from "../../components/proposal/Proposal";
import JobRelated from "./JobRelated";
import './MyProposals.scss'

export function MyProposals() {
    const [proposals, setProposals] = useState([])
    const [isProposals, setIsProposals] = useState(false)
    const [bidStatus, setBidStatus] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const getBids = () => {
            const token = getItem('token')
            const decodeToken = jwtDecode(token)
            const id = decodeToken.id
            if (id) {
                getProposalByCreatorId(id).then((proposal) => {
                    if (proposal.length === 0 || !proposal) {
                        setIsProposals(false)
                        console.log('nullllll')
                    }
                    else {
                        setProposals(proposal)
                        setIsProposals(true)
                        console.log('propoooosal:', proposal)
                    }

                }).catch((err) => {
                    setIsProposals(false)
                    console.error(err)
                })
            }
        }
        getBids()
    }, [])
    const deleteProposal = (id) => {
        getAndDeleteProposal(id).then((deleted) => {
            if (deleted) {
                navigate('/myproposals')
            }
        })
    }
    const renderProposals = proposals.map((bid) => (
        <div className="bid-block" key={bid._id}>
            <div className="bid">
                <span className="bid-span">Proposal Status: {bid.status}</span>
                <Link to={`/proposalPage/${bid._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Proposal bid={bid} />
                </Link>
                <button className="delete-bid-button" onClick={() => deleteProposal(bid._id)}>Delete Proposal</button>
            </div>
            <hr className="hr" />
            <span className="job-span">Job related:</span>
            <div className="job">
            <Link to={`/jobprofile/${bid.forJobId}`} style={{color:'inherit', textDecoration:'none'}}>
                <JobRelated jobId={bid.forJobId} />
            </Link>
                
            </div>
        </div>
    ))
    return (
        <>{!isProposals ?
            (
                <div className="no-proposals">
                    <div className="message">
                        <span className="message-span">You Dont have any proposal yet</span>
                        <button className="Home" onClick={() => navigate('/userhome')}> Home Page</button>
                    </div>
                </div>
            )
            :
            (
                <div className="column">
                    { renderProposals }
                </div>
                

            )
        }

        </>


    )
}