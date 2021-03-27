import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Editor from "./components/Editor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Editor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
