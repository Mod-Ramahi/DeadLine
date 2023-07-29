import axios from "axios";
import { getItem } from "./utils/localStorge";

export const loginRequest = async (data) =>{
    try {
        const response= await  axios.post("http://localhost:4000/api/v1/auth/login",data)
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}

export const registerRequest = async (data) =>{
    try {
        const response = await axios.post("http://localhost:4000/api/v1/auth/register",data)
        console.log(response)
        return response 
    } catch (error) {
        return error
    }
}
export const postJobRequest = async (data) =>{
    const formData = new FormData();
    formData.append(...data)
    const token = getItem()
    // formData.    
    // try {
    //     const response= await  axios.post("/job/addJob",data)
    //     return response
    // } catch (error) {
    //     return error
    // }
}