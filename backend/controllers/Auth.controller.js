/*********************************
 * Auth Controller
 * - refreshToken
 *   Takes the @param Spotify_Id from request body
 *   If the user exist with the Spotify_Id
 *   Return the NewAccessToken
 *   Else send the error to the user.
 ********************************/

const AuthModel = require('../models/auth.model.js')
const authModel = new AuthModel()
const spotifyModel = require('../models/spotify.model')


module.exports = {
    refreshToken: function(req, res){
        if(req.body.Spotify_Id){
            authModel.checkUserBySpotifyId(req.body.Spotify_Id)
             .then((reply) => {
                  if(!reply.status){
                    res.status(422).send({'status':'error', 'message': 'User does not exist with this Spotify Id.'})
                  }else{
                    spotifyModel.refreshToken(reply.data[0].Refresh_Token).then((spotifyReply) =>{
                        res.status(200).send(spotifyReply)
                    })
                  }
              })
        }
    }
}