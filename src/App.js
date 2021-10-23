import "semantic-ui-css/semantic.min.css"
import "./App.css"
import Editor from "./components/Editor"
import Navbar from "./components/Navbar"
import Gallery from "./components/Gallery"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Editor />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route> 
          <Redirect to="/"/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
