import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://nuvolagraph.staging.oregon.platform-os.com/api'
});

class ClientAPI {
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    async getAll() {
        const result = await  axiosInstance.get(this.endpoint).then(res => res.data)
        return result;
    }


}

export default ClientAPI;