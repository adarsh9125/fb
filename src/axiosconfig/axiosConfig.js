import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://testspringapp.eu-gb.cf.appdomain.cloud/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
  });

  export default instance;