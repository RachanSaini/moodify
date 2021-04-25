import axios from 'axios';
const configData = require('../config.json')

export const backendService = {
    refreshToken
};

function refreshToken() {
    let authData = JSON.parse(localStorage.getItem('auth'))
    const postData = {
        "Spotify_Id": authData.spotifyId
    }

   return new Promise((resolve, reject) => {
       axios.post(`${configData.development.BACKEND_URL}/auth/spotify/refresh`, postData )
            .then(res => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
   })
}
