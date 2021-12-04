import Main from './Components/main';
import Auth from './Components/auth';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
