import React, { useEffect } from 'react'

import { useHistory } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow
} from '@coreui/react'
import { Auth, isAuthenticated } from '../../../helpers/auth.helpers';
import { RiSpotifyLine } from 'react-icons/ri';
const queryString = require('query-string');
const configData = require('../../../config.json')

const Login = (props) => {

  const history = useHistory();
  var qs = queryString.parse(props.location.search);


/******************************
  
  Login module 
  Check for the jwt token from the query string, if the query string found, check it by using decode key.
  If  token decodes successfully, authorized the user to access the further components
  
 *******************************/

  //If query string found in the url, parse the token to further decode the jwt
  if(qs.token){
    if(Auth(qs.token)){
      //Redirect the user to next step
       history.push('camera');
    }
  }



  function authHandler(){
    window.location.href = `${configData.development.BACKEND_URL}/auth/spotify/authorize`
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className="text-center">
                    <h1>Moodify</h1>
                    <p className="text-muted">Authentication </p>
                    <CButton onClick={authHandler} color="success" variant="outline" size="lg" className="px-4">Login with Spotify  <RiSpotifyLine size={50} /></CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
