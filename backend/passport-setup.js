const passport = require('passport'),
      SpotifyStrategy = require('passport-spotify').Strategy,
      env = require('./config'),
      AuthModel = require('./models/auth.model')

passport.use(
  new SpotifyStrategy(
    {
      clientID: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      callbackURL: env.BASE_URL_DEV + '/auth/spotify/callback',
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      console.log("accessToken is", accessToken);
      console.log("refreshToken is ", refreshToken)
      console.log("expires in ", expires_in)
      console.log("passport-setup file user profile ", profile)

      var authModel = new AuthModel();
      var spotifyId = profile.id;
      var name = profile._json.display_name;
    
      console.log("passport spotifyId", spotifyId)

      //Step-1 Check the user exist or not
      authModel.checkUserBySpotifyId(spotifyId).then((userexist)=>{
        
        console.log("checkUserBySpotifyId result", userexist.status)

        //Step-2 If don't exist create new one else update the existing user
        if(!userexist.status && name != "" && spotifyId != ""){
          console.log("passportSetup creating user")
          authModel.createUser(name, spotifyId, accessToken, refreshToken);
        }else{
          console.log("passportSetup updating user")
          authModel.updateTokens(accessToken, refreshToken, spotifyId);
        }

      })

      //update the profile, removing the extra info indirectly
      profile = {
        name: name,
        spotifyId: spotifyId,
        accessToken: accessToken
      }

      //returning the data
      return done(null, profile);
    }
  )
);