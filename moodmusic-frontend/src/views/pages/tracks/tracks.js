import React from 'react'
import { useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CCol,
  CRow
} from '@coreui/react'

import {
  getAuthToken
} from '../../../helpers'

const Playback = () => {

  const history = useHistory();
  var tracks = [];
  var tracksURI = [];
 
  const [tracksURI_, settracksURI_] = useState(tracksURI);


  if(localStorage.getItem('tracks')){
    tracks = JSON.parse(localStorage.getItem('tracks'));
    if(localStorage.getItem('tracksURI')){
      var temp = localStorage.getItem('tracksURI');
      tracksURI = temp.split(',');
    }
  }else{
    //Redirect back to previous status
    history.push('camera');
  }
  


  //Step-0 Set the Auth Token State for the Spotify Player
  let auth = getAuthToken();
  var accessToken = auth.accessToken;
  if(!auth){
    history.push('login')
  }

  function spotifyPlayerState(state){
    console.log(state)
  }

  function playerListClickEvent(song) {
    settracksURI_(song)
  }
  
  return (
    <>
      <CRow className="justify-content-center p-0 m-0">

        <CCol xs="12" sm="12" md="8" lg="8" >
          <CCard>
            <CCardBody className="justify-content-center">
              <CListGroup>
                {tracks.map( (album, index) => (<CListGroupItem key={index} style={{fontSize: '20px', background: (album.uri === tracksURI_) ? 'grey':'white', color: (album.uri === tracksURI_) ? 'white':'black' }} onClick={ (e) => playerListClickEvent(album.uri, e) } className="text-center">{album.name}</CListGroupItem>))}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
        
      </CRow>

      <CRow style={{'position':'fixed', 'bottom': '50px', 'width':'98%'}}>
        <CCardBody style={{'padding':'0'}}>
          { (tracksURI_.length === 0) ?(<CCard><h3 className="text-center p-3">Select a track to start the playlist</h3></CCard>):(<SpotifyPlayer
           token={accessToken}
           autoPlay={true}
           uris={tracksURI_}
           callback={(state) => spotifyPlayerState(state)}
           styles={{
             activeColor: 'red',
             bgColor: '#FFF',
             color: '#000',
             loaderColor: '#000',
             sliderColor: '#1cb954',
             trackArtistColor: '#000',
             trackNameColor: '#000',
           }} />) }
            
        </CCardBody>
      </CRow>
      
    </>
  )
}



export default Playback;
