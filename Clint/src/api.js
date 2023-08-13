import axios from "axios";
import { getItem } from "./utils/localStorge";

export const loginRequest = async (data) =>{
    try {
        const response= await  axios.post("http://localhost:4000/api/v1/auth/login",data)
        return response
    } catch (error) {
        return error
    }
}

export const registerRequest = async (data) =>{
    try {
        const response = await axios.post("http://localhost:4000/api/v1/auth/register",data)
        return response 
    } catch (error) {
        return error
    }
}
export const postJobRequest = async (data) =>{
    const token = getItem()
    try {
        const response= await  axios.post("http://localhost:4000/api/v1/job/addJob",{ headers: { Authorization: `${token}` },
        data})
        return response
    } catch (error) {
        return error
    }
}
export const postProposalRequest = async (data) =>{
    const token = getItem()
    try {
        const response= await  axios.post("http://localhost:4000/api/v1/proposal/",{ headers: { Authorization: `${token}` },
        data})
        return response
    } catch (error) {
        return error
    }
}
export const getAllProject = async () =>{
    try {
        const response = await axios.get("http://localhost:4000/api/v1/job")
        return response.data
    } catch (error) {
        
    }
}