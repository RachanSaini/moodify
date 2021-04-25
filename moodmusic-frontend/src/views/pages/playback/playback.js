import React from 'react'

import { useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CHeader,
} from '@coreui/react'

import {
  getAuthToken
} from '../../../helpers'
import { 
  SpotifyService
}  from '../../../services'
const Playback = () => {

  const history = useHistory();
  var albums = [];
  var tracks = [];
  var tracksURI = [];

  if (localStorage.getItem('albums')) {
    albums = JSON.parse(localStorage.getItem('albums'));
   
  } else {
    //Redirect back to previous status
    history.push('camera');
  }


  //Step-0 Set the Auth Token State for the Spotify Player
  let auth = getAuthToken();

  if (!auth) {
    history.push('login')
  }


  function playerListClickEvent(uri) {
    //Parse the albumId from the URI to use for the API call
    //Next step would be to get the tracks of album
    let albumId = uri.split(':')[2];
    SpotifyService.getAlbumFromURI(albumId).then((data) => {
        data.items.map( (items) => {
          tracks.push({
            "name": items.name,
            "uri": items.uri
          })
          tracksURI.push(items.uri)
        })

        //Store the tracks & tracksURI for the current emotion inside the localStorage
        localStorage.setItem('tracks', JSON.stringify(tracks));
        localStorage.setItem('tracksURI', JSON.stringify(tracksURI));

        //Redirect user to next component => playback component
        let path = `tracks`;
        history.push(path) 
    })
  }

  return (
    <>

      <CRow className="justify-content-center p-0 m-0">

        <CCol xs="12" sm="12" md="12" lg="12" >
          <CCard style={{ 'minHeight': '700px' }}>
            <CCardBody className="justify-content-center">
              <CRow>
                {albums.map((album, index) => (
                   <CCol key={index} xs="12" sm="6" md="6" lg="3">
                      <CCard onClick={ (e) => playerListClickEvent(album.uri, e) } className="cardHover">
                          <CHeader className="justify-content-center mt-1" ><h4 className="m-2">{album.name}</h4></CHeader><CCardBody><img className="img-fluid"  src={album.cover[0].url} alt={album.name} /></CCardBody>
                      </CCard>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}



export default Playback;
