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
        const response= await  axios.post("http://localhost:4000/api/v1/job/addJob", {data}, {headers: { Authorization: `${token}` }})
        return response
    } catch (error) {
        return error
        // console.log("auth errorrr", error)
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
export const getProjectById = async (id) =>{
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/${id}`)
        return response.data
    } catch (error) {
        
    }
}
export const completeRegisterRequest = async(data) => {
    const token = getItem()
    try{
        const response = await axios.post('http://localhost:4000/api/v1/auth/complete-register', data, { headers: { Authorization: `${token}` }})
        return response
    }catch(error){
        return error
    }
}

export const getUserById = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/user/${id}`)
        return response.data;
    }catch(error) {
        return error
    }
}

export const postProfileRequest = async(formData) => {
    const token = getItem()
    try{
        const response = await axios.post('http://localhost:4000/api/v1/profile/postProfile', {formData}, {headers:{Authorization: `${token}`}})
        return response
    }catch(error){
        return error
    }
}

export const postProjectRequest = async (data) => {
    const token = getItem()
    try{
        const response = await axios.post('http://localhost:4000/api/v1/project/postProject', {data}, {headers: {Authorization: `${token}`}})
        return response
    }catch(error){
        return error
    }
}