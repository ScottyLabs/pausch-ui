import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import ImageGrid from "./ImageGrid"
import LoginPanel from "./LoginPanel"
import { checkAccessToken } from "../utils/authUtils"
import { useLocation, useHistory } from "react-router-dom"
import Footer from "./Footer"

const appContainerStyle = {
  display: "grid",
  gridTemplateColumns: "95fr 5fr",
  padding: "3em",
}

const controlsContainerStyle = {
  marginLeft: "2em",
  minWidth: "280px",
  width: "15vw",
}

const Gallery = () => {
  const history = useHistory()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(checkAccessToken(location))

  if (location.search) {
    history.push("/gallery")
  }

  return (
    <>
      <div className="App" style={appContainerStyle}>
        <div id="content">
          <ImageGrid />
        </div>
        <div id="controls" style={controlsContainerStyle}>
          <LoginPanel
            state={{ loggedIn: loggedIn, loading: loading }}
            setState={{ setLoggedIn: setLoggedIn, setLoading: setLoading }}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Gallery
