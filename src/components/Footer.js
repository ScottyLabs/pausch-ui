import { Segment } from "semantic-ui-react"

const footerStyle = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  textAlign: "center"
}

const footerTextStyle = {
  color: "white"
}

const Footer = (props) => {
  return (
    <div style={{ position: "relative", marginTop: "1em" }}>
      <Segment style={footerStyle}>
        <p style={footerTextStyle}>
          Developed with ❤️ by 
          <a href="https://scottylabs.org/" target="_blank" rel="noreferrer"> ScottyLabs</a>
        </p>
      </Segment>
    </div>
  )
}

export default Footer
