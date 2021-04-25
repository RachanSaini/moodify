import React from 'react'
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
} from '@coreui/react'


const TheHeader = () => {
  return (
    <CHeader>

      <CHeaderBrand className="mx-auto" to="/">
        <h1>Moodify</h1>
      </CHeaderBrand>

     
 
    </CHeader>
  )
}

export default TheHeader
