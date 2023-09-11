import axios from "axios";
import { getItem } from "./utils/localStorge";

export const registerRequest = async (data) =>{
    try {
        const response = await axios.post("http://localhost:4000/api/v1/auth/register",data)
        return response 
    } catch (error) {
        console.error(error)
    }
}
export const loginRequest = async (data) =>{
    try {
        const response= await  axios.post("http://localhost:4000/api/v1/auth/login",data)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const completeRegisterRequest = async(data) => {
    const token = getItem()
    try{
        const response = await axios.post('http://localhost:4000/api/v1/auth/complete-register', data, { headers: { Authorization: `${token}` }})
        return response
    }catch(error){
        console.error(error)
    }
}

export const postJobRequest = async (data) =>{
    const token = getItem()
    try {
        const response= await  axios.post("http://localhost:4000/api/v1/job/addJob", {data}, {headers: { Authorization: `${token}` }})
        return response
    } catch (error) {
        console.error(error)
    }
}
export const getAllProject = async () =>{
    try {
        const response = await axios.get("http://localhost:4000/api/v1/job")
        return response.data
    } catch (error) {
        console.error(error)
    }
}
export const getProjectById = async (id) =>{
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const postProposalRequest = async (data) =>{
    const token = getItem()
    try {
        const response= await  axios.post("http://localhost:4000/api/v1/proposal/",{ headers: { Authorization: `${token}` },
        data})
        return response
    } catch (error) {
        console.error(error)
    }
}


export const getUserById = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/user/${id}`)
        return response.data;
    }catch(error) {
        console.error(error)
    }
}

export const postProfileRequest = async(formData) => {
    const token = getItem()
    try{
        const response = await axios.post('http://localhost:4000/api/v1/profile/postProfile', {formData}, {headers:{Authorization: `${token}`}})
        return response
    }catch(error){
        console.error(error)
    }
}
export const getallProfiles = async () => {
    try{
        const response = await axios.get('http://localhost:4000/api/v1/profile')
        return response.data
    }catch (error) {
        console.error(error)
    }
}
export const getProfileById = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/profile/${id}`);
        return response.data
    }catch(error){
        console.error(error)
    }
}
export const getProfileByCreator = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/profile/creator/${id}`);
        return response.data
    } catch(error){
        console.error(error)
    }
}

export const postProjectRequest = async (data) => {
    const token = getItem()
    try{
        const response = await axios.post('http://localhost:4000/api/v1/project/postProject', {data}, {headers: {Authorization: `${token}`}})
        return response
    }catch(error){
        console.error(error)
    }
}