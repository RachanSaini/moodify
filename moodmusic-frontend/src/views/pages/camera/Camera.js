import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import {

  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CSpinner
} from  '@coreui/react'
import Webcam from 'react-webcam'
import { 
  deepfaceService,
  SpotifyService
}  from '../../../services'

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

const authHelper = require('../../../helpers/auth.helpers')  

const Camera = () => {

  var albums = [];
  var albumsURI = [];


  var emotionState =  "Capture the image to avail results."
  const history = useHistory();
  const [image, setImage] = useState(null); //For storing the clicked image
  const [imageClicked, setImageClickedStatus] = useState(false) //For storing the imageClicked Status
  const [emotion, setEmotion] = useState(null); //To record emotional expression only
  const [cardResultText, setTextResult] = useState(emotionState)
  const [spinnerStatus, setSpinnerStatus] = useState(false)


  const webcamRef = React.useRef(null);
  
  useEffect(() => {
    if(emotion){
      localStorage.setItem("emotion", emotion)
    }
    //Check the expiry time
    authHelper.checkExpiryTime().then().catch((err) => {
      //no token => redirect the user to login screen
      history.push('login');
    })
  })

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      //JSON.stringify converts the image to base64 
   
      if(imageSrc){
        setImageClickedStatus(true)
        setImage(imageSrc)
        setSpinnerStatus(true)
          deepfaceService.analyze(imageSrc).then((data) => {
            setEmotion(data.instance_1.dominant_emotion)
            setTextResult("You seems to be " + data.instance_1.dominant_emotion) 
            setSpinnerStatus(false)
          })
      }
      
    },
    [webcamRef]
  );

  //Fetch the playlist from the Spotify Server and redirect user to playback component
  var getMyPlaylist = () => {
    SpotifyService.getSearchResult(emotion)
    .then( (data) => {
      data.tracks.items.map( (items) => {
         albums.push({
           "name": items.album.name,
           "uri": items.album.uri,
           "cover":items.album.images
         })
         albumsURI.push(items.album.uri)
      })

      //Store the albums for the current emotion inside the localStorage
      localStorage.setItem('albums', JSON.stringify(albums));
      localStorage.setItem('albumsURI', albumsURI)

      //Redirect user to next component => playback component
      let path = `playback`; 
      history.push(path);
    } ).catch( (err) =>{
      console.log("Spotify error occured ", err)
    } )

  }

  return (
    <>
      <CRow className="justify-content-center">
      
        <CCol xs="6" sm="6" md="8" lg="8">
          <CCard>
            <CCardHeader className="text-center">
             <h3>Camera</h3>
            </CCardHeader>
            <CCardBody className="d-flex justify-content-center">
              {imageClicked ? 
              ( <img src={image} alt={'clickedImage'} /> ) : (<Webcam 
                audio={false}
                ref={webcamRef}
                className="img-fluid"
                mirrored="true"
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />)
              }

            </CCardBody>
            {imageClicked ? (
              <div></div>
            ):(
              <CCardFooter className="d-flex justify-content-center">
               <CButton color="success" onClick={capture} variant="outline" size="lg" className="px-4">Capture </CButton>
            </CCardFooter>
            )}
            
          </CCard>
        </CCol>
      </CRow> 

      <CRow>
          <CCol className="justify-content-center text-center">
                <CCard>
                <CCardBody >
                  {spinnerStatus ? (
                    <CSpinner />
                  ):(
                  <h1>{ cardResultText }</h1>
                  )}
                  
                </CCardBody>
                { emotion ? (
                  <CCardFooter className="d-flex justify-content-center">
                     <CButton color="success" onClick={ getMyPlaylist }   size="lg" className="px-4">Get My Playlist</CButton>
                  </CCardFooter>
                  ): (<div></div>)}
                
                </CCard>
            </CCol>
          </CRow> 

    </>
  )

}



export default Camera
