import axios from 'axios';
const configData = require('../config.json')

export const deepfaceService = {
    analyze
};

function analyze(base64Image) {
    const postData = {
        "img":[
            base64Image
        ]
    }

   return new Promise((resolve, reject) => {
       axios.post(`${configData.development.DEEPFACE_URL}/analyze`, postData )
       .then(res => {
        resolve(res.data)
       }).catch((err) => {
           reject(err)
       })
   })
}
