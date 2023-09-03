export const getItem = () =>{
    const items = JSON.parse(localStorage.getItem('token'));
    return items
}
export const setItem = (token) =>{
    localStorage.setItem('token', JSON.stringify(token));
}
export const removeItem = () => {
    localStorage.removeItem('token')
}