/// AuthModel  Class ////
/*****************************************************
 * To update the user auth credentials in the 
 * database for maintaining sessions on the frontend side
 *****************************************************/

const Database = require('../services/database.service')

module.exports = class AuthClass{
    constructor(){
        this.db = new Database()
    }

    createUser(Name, Spotify_Id, Access_Token, Refresh_Token){
        var query = `INSERT into users (Name, Spotify_Id, Access_Token, Refresh_Token) VALUES (?, ?, ?, ?)`
        var params = [Name, Spotify_Id, Access_Token, Refresh_Token]

        return new Promise( (resolve, reject) => {
            this.db.run(query, params).then( (data) => {
                resolve(data);
            },  (err) => {
                reject(err)
            })
        })
    }

    updateTokens(Access_Token, Refresh_Token, Spotify_Id){
        var query = `UPDATE users SET Access_Token = ?, Refresh_Token = ? WHERE Spotify_Id = ?`
        var params = [Access_Token, Refresh_Token, Spotify_Id]
         return new Promise( (resolve, reject) => {
             this.db.run(query, params).then( (data) => {
                 resolve(data)
             },  (err) => {
                 reject(err)
             })
         })
    }

    checkUserBySpotifyId(Spotify_Id){
        var query = `SELECT * from users WHERE Spotify_Id = ?`
        var params = [Spotify_Id]
        return new Promise( (resolve, reject) => {
            this.db.run(query, params).then( (data) => {
                if(data.length != 0){
                    resolve({status: true, data: data})
                }
                resolve({status: false, data: null})
            },  (err) => {
                reject({status: false})
            })
        })
    }

    getUserById(User_Id){
        var query = `SELECT * from users WHERE User_Id = ?`
        var params = [User_Id]
        return new Promise( (resolve, reject) => {
            this.db.run(query, params).then( (data) => {
                resolve(data)
            },  (err) => {
                reject(err)
            })
        })
    }


}