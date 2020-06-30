import { Lokka } from 'lokka';
import Transport from 'lokka-transport-http';

// console.log("REACT_APP_API: ", process.env.REACT_APP_API)

//let apiUrl = '/api/graphql/'
let apiUrl = 'http://localhost:8081/api/graphql/'


if (process.env.REACT_APP_API) {
  apiUrl = new URL(apiUrl, process.env.REACT_APP_API);
}

const Client = new Lokka({
  transport: new Transport(apiUrl)    
})

export default Client;

