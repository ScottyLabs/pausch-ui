import "semantic-ui-css/semantic.min.css"
import "./App.css"
import Editor from "./components/Editor"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Navbar />
            <Editor />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
