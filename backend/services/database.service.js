const ENV = require('../config')
var mysql = require('mysql')


module.exports = class Database{
    constructor(){
        this.connection = mysql.createConnection({
            host     : ENV.SQL_HOST,
            user     : ENV.SQL_USERNAME,
            password : ENV.SQL_PASSWORD,
            database : ENV.SQL_DATABASE
          });
           
          this.connection.connect( (err) => {
                if(err){
                    console.log(err)
                    console.log("Database Connection Error")
                    return
                }
                // console.log("Database connected")
          } );
    }

    run(query, params){
       return new Promise((resolve, reject)=>{
            this.connection.query(query, params, (err, results) => {
                if(err){
                    console.log("Database.Service Query - ", query, params)
                    console.log("Database.Service Query - err", err)
                    reject(err)
                }
                var resultString = JSON.stringify(results)
                var resultJSON = JSON.parse(resultString)
               
                resolve(resultJSON)
            }) 
        })
       
    }


}