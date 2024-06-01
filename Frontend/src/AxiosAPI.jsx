import axios from "axios"
export const url = "http://localhost:3500/";
const AxiosAPI=axios.create({
    baseURL:url
});
export default AxiosAPI;