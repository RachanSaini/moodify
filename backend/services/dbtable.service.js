/******
 * Class to check the database and database tables:
 * Purpose: To check and create the missing tables 
 *******/


const Database = require('./database.service')
const config = require('../config')

module.exports = class DbTableChecker{
    constructor(){
        this.db = new Database()
        this.checkDatabase()
        this.checkUserTable()
    }

    //Check Functions: 1 Check Table Exists 2. Else Create the missing table

    checkDatabase(){
        var query = `CREATE DATABASE IF NOT EXISTS ` + config.SQL_DATABASE
        this.db.run(query)
    }

    checkUserTable(){
        var query = `CREATE TABLE IF NOT EXISTS users(
            User_Id INT PRIMARY KEY AUTO_INCREMENT,
            Name VARCHAR(50) NOT NULL,
            Spotify_Id VARCHAR(50) NOT NULL,
            Access_Token VARCHAR(255) NOT NULL,
            Refresh_Token VARCHAR(255) NOT NULL,
            Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        this.run(query);
    }

    run(query){
        this.db.run(query).then( (data) => {
            //console.log("db-table service  query ", data)
        }, (err) => {
            console.log("dbtable service error ", err)
            console.log(`Query during error: ${query}`)
        } )
    }

}