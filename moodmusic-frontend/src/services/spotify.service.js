import axios from 'axios';
const configData = require('../config.json')

export const SpotifyService = {
    getSearchResult,
    getAlbumFromURI
};

function getSearchResult(query){

    return new Promise((resolve, reject) => {

        //Get the spotify OAuth access Token
        
        var auth = localStorage.getItem('auth');
        if(auth != ""){
            auth = JSON.parse(auth)
            const data = {
                headers: {
                  'Authorization': `Bearer ${auth.accessToken}`
                }
            }
            const url = `${configData.development.SPOTIFY_URL}/search?q=${query}%20music&type=track&market=US&limit=10`
            axios.get(url, data).then(res => {
                
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        }
        
    })

}

function getAlbumFromURI(albumId){
    return new Promise((resolve, reject) => {
        var auth = localStorage.getItem('auth');
        if(auth != ""){
            auth = JSON.parse(auth)
            const data = {
                headers: {
                  'Authorization': `Bearer ${auth.accessToken}`
                }
            }
            const url = `${configData.development.SPOTIFY_URL}/albums/${albumId}/tracks?market=US`
            axios.get(url, data).then(res => {
                console.log(`tracks of ${albumId}`, res.data)
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        }
    })
}




