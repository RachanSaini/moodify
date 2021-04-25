var jwt = require('jsonwebtoken');
const config = require('../config.json')
var backendService = require('../services/backend.service')

export function Auth(token){
    const privateKey = 'secretkey';
    try {
        var decoded = jwt.verify(token, privateKey);
        //store the info inside the browser
        localStorage.setItem("auth", JSON.stringify(decoded.data))
        let expiryTime = Math.floor(Date.now() / 1000) + 3600 // I added 3600 seconds because according to the OAuth2 Practise, tokens max validity is 3600s i.e. 1hr
        localStorage.setItem("expire_at", expiryTime)
        return {
            "isAuthenticated": true,
            "data": decoded.data

        }
      } catch(err) {
            if(err){
               console.log("error")
                return {
                    "isAuthenticated":false,
                    "data": {}
                }
            }
      }
}


//This is just for demonstration not a good approach to check the auth state of the user
//As anyone can add the localStorage variable named as auth to fool this method out.
export function isAuthenticated(){
    if(localStorage.getItem('auth')){
        return true
    }
    return false
}

export function checkExpiryTime(){
    let expiryTime = localStorage.getItem('expire_at')
    let authData = localStorage.getItem('auth')
    let timeNow = Math.floor(Date.now() / 1000)
    return new Promise((resolve, reject) => {

        if(expiryTime){ //If expiry time exist inside localstorage
            if(timeNow > expiryTime){ //Renew the token
                console.log(`${timeNow} > ${expiryTime}`)
                //If expired renew the access token immediately
                backendService.refreshToken()
                    .then((data) => {
                        console.log('backendService ', data)
                        //update the token in json
                        authData.accessToken = data.access_token
                        //store the info inside the browser
                        localStorage.setItem("auth", JSON.stringify(authData))
                        //And update the expiry time
                        let expiryTime = Math.floor(Date.now() / 1000) + 3600 
                        localStorage.setItem("expire_at", expiryTime)
                       
                    }).catch((err) => {
                        reject({'status': 'error occured while refreshing token'})
                    })
            }
            resolve()
        }else{
            reject({'status': 'no token'})
        }
        
       
    })
}

export function getAuthToken(){
    if(localStorage.getItem('auth')){
        //Parse the string to JSON and return the result
        return JSON.parse(localStorage.getItem('auth'))
    }
    return {}
}