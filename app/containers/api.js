import axios from 'axios'
import API_URL from '../utils/config'

export const doLogin = ({ email, password }) => {
    const url = API_URL + '/auth/login'

    return axios(url, {
        email,
        password        
    })
    .then()
    .catch()
}

export const doSignup = ({ email, password }) => {
    const url = API_URL + '/auth/signup'
    return axios(url, {
        email,
        password        
    })
    .then()
    .catch()
    // axios.get('/user', {
    //     params: {
    //       ID: 12345
    //     }
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });  
    
    // Want to use async/await? Add the `async` keyword to your outer function/method.
    
}

async function getUser() {
    try {
      const response = await axios.get('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }