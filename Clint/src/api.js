import axios from "axios";
import { getItem } from "./utils/localStorge";

export const registerRequest = async (data) =>{
    try {
        const response = await axios.post("http://localhost:4000/api/v1/auth/register",data)
        return response 
    } catch (error) {
        console.error(error)
        // throw new Error('Failed to register. Please try again.');
    }
}
export const loginRequest = async (data) =>{
    try {
        const response= await  axios.post("http://localhost:4000/api/v1/auth/login",data)
        return response
    } catch (error) {
        console.error(error)
        // throw new Error('Failed to login. Please try again.');
    }
}
export const googleLogIn = async (data) => {
    try{
        const response = await axios.post("http://localhost:4000/api/v1/auth/google", data)
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
        // throw new Error('Failed to complete register. Please try again.');
    }
}
export const changeEmailRequest = async (newEmail) => {
    const token = getItem ()
    try{
        const response = await axios.put('http://localhost:4000/api/v1/auth/emailchange', {newEmail} , {headers: {Authorization:`${token}`}})
        return response
    }catch(error){
        console.error(error)
    }
}
export const SettingsRequest = async (data) => {
    const token = getItem()
    try{
        const response = await axios.put('http://localhost:4000/api/v1/auth/settings', data, {headers:{Authorization:`${token}`}})
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
        // throw new Error('Failed to post job. Please try again.');
    }
}
export const getAllProject = async (pageSize, category) => {
    try{
        const response = await axios.get("http://localhost:4000/api/v1/job",
         {
            params:{
                sortBy:'createdAt',
                order:'desc',
                pageSize:pageSize,
                category: category
            }
        }
        )
        return response.data
    }catch (error) {
        console.error(error)
    }
}
export const getFilteredJobs = async (pageSize, filterData) => {
    try{
        const response = await axios.get("http://localhost:4000/api/v1/job/filter",
        {params:{
            sortBy:'createdAt',
            order:'desc',
            pageSize:pageSize,
            data:filterData
        }}
        )
        return response.data
    } catch (error){
        console.error(error)
    }
}

export const getProjectById = async (id) =>{
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/jobId/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        // throw new Error('Failed to get job. Please try again.');
    }
}
export const getProjectByCreatorId = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/job/creator/${id}`)
        return response.data
    }catch(error){
        console.error(error)
        // throw new Error('Failed to get job. Please try again.');
    }
}
export const getAndDeleteJob = async (id) => {
    const token = getItem()
    try{
        const response = await axios.delete(`http://localhost:4000/api/v1/job/delete/${id}`, {headers:{Authorization:`${token}`}})
        return response.data
    }catch(error){
        console.error(error)
        // throw new Error('Failed to delete job. Please try again.');
    }
}

export const getUserById = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/user/${id}`)
        return response.data;
    }catch(error) {
        console.error(error)
        // throw new Error('Failed to get user. Please try again.');
    }
}

export const postProfileRequest = async(formData) => {
    const token = getItem()
    try{
        const response = await axios.post('http://localhost:4000/api/v1/profile/postProfile', {formData}, {headers:{Authorization: `${token}`}})
        return response
    }catch(error){
        console.error(error)
        // throw new Error('Failed to post profile. Please try again.');
    }
}
export const editProfileRequest = async(formData) => {
    const token = getItem()
    try{
        const response = await axios.put('http://localhost:4000/api/v1/profile/editProfile', {formData}, {headers:{Authorization: `${token}`}})
        return response;
    }catch(error){
        console.error(error)
        // throw new Error('Failed to edit profile. Please try again.');
    }
}
export const getallProfiles = async (pageSize, category) => {
    try{
        const response = await axios.get('http://localhost:4000/api/v1/profile',
        {params:{
            // sortBy:'createdAt',
            // order:'desc',
            pageSize:pageSize,
            category: category
        }})
        return response.data
    }catch (error) {
        console.error(error)
        // throw new Error('Failed to get profile. Please try again.');
    }
}
export const getFilteredProfiles = async (pageSize, filterData) => {
    try{
        const response = await axios.get('http://localhost:4000/api/v1/profile/filter',
        {params:{
            sortBy:'createdAt',
            order:'desc',
            pageSize:pageSize,
            data:filterData
        }}
        )
        return response.data
    } catch (error){
        console.error(error)
    }
}
export const getProfileById = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/profile/profileId/${id}`);
        return response.data
    }catch(error){
        console.error(error)
        // throw new Error('Failed to get profile. Please try again.');
    }
}
export const getProfileByCreator = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/profile/creator/${id}`);
        return response.data
    } catch(error){
        console.error(error)
        // throw new Error('Failed to get profile. Please try again.');
    }
}

export const postProjectRequest = async (data) => {
    const token = getItem()
    try{
        const response = await axios.post('http://localhost:4000/api/v1/project/postProject', {data}, {headers: {Authorization: `${token}`}})
        return response
    }catch(error){
        console.error(error)
        // throw new Error('Failed to post portfolio. Please try again.');
    }
}
export const getPortfolioProjectById = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/project/${id}`)
        return response.data
    }catch(error){
        console.error(error)
        // throw new Error('Failed to get portfolio. Please try again.');
    }
}
export const getProfileProjectByCreatorId = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/project/getProjectByCreatorId/${id}`);
        return response.data
    }catch(error){
        console.error(error)
        // throw new Error('Failed to get portfolio. Please try again.');
    }
}

export const bidProposal = async (data, id) => {
    const token = getItem()
    try{
        const response = await axios.post(`http://localhost:4000/api/v1/proposal/bidforJob/${id}`,{data},{headers: {Authorization:`${token}`}} )
        return response
    }catch(error) {
        console.error(error)
        // throw new Error('Failed to post proposal. Please try again.');
    }
}
export const getProposalByJobId = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/proposal/forJob/${id}`)
        return response.data
    }catch(error){
        console.log(error)
        // throw new Error('Failed to get proposal. Please try again.');
    }
}
export const getProposalById = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/proposal/${id}`)
        return response.data
    }catch(error){
        console.error(error)
        // throw new Error('Failed to get proposal. Please try again.');
    }
}

export const getProposalByCreatorId = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/proposal/creator/${id}`)
        return response.data
    }catch(error){
        console.error(error)
        // throw new Error('Failed to get proposal. please try again')
    }
}

export const getAndDeleteProposal = async (id) => {
    const token = getItem()
    try{
        const response = await axios.delete(`http://localhost:4000/api/v1/proposal/delete/${id}`, {headers: {Authorization: `${token}`}})
        return response.data
    }catch(error){
        console.error(error)
        // throw new Error('Failed to get / delete proposal. please try again')
    }
}

export const getPlans = async (searchTerm) => {    
    try{
        let url = 'http://localhost:4000/api/v1/administration/membership'
        if(searchTerm){
            url += `?searchTerm=${searchTerm}`
        }
        const response = await axios.get(url)
        return response
    }catch (error) {
        console.error(error)
    }
}
export const getPlanById = async (id) => {
    try{
        const response = await axios.get(`http://localhost:4000/api/v1/administration/findmembership/${id}`)
        return response.data
    } catch(error) {
        console.error(error)
    }
}
export const editPlan = async (data, id) => {
    // const token = getItem()
    try{
        const response = await axios.put(`http://localhost:4000/api/v1/administration/membership/${id}`, {data}
        // {headers: {Authorization: `${token}`}}
        )
        return response
    }catch(error){
        console.error(error)
    }
}