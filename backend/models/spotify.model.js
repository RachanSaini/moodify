const config = require('../config')
var rp = require('request-promise')
const encoder = require('nodejs-base64-encode');

module.exports = {
    refreshToken(Refresh_Token){
        const apiUrl = `https://accounts.spotify.com/api/token`
        var token = `${config.SPOTIFY_CLIENT_ID}:${config.SPOTIFY_CLIENT_SECRET}`
        var options = {
            uri: apiUrl,
            method: 'POST',
            headers:{
                'Authorization': `Basic ${encoder.encode(token, 'base64')}`
            },
            form:{
                "grant_type":"refresh_token",
                "refresh_token": Refresh_Token
            },
        }
        return rp(options)
    }
}