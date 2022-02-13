import { useEffect,useState} from "react";

import SignIn from "./components/Signin";
import Loader from "./components/Loader";

import Userprofile from "./Userprofile";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Main from "./Main";
function App() {
  
  return (
    <div className="bg-gray-background overflow-x-hidden">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/p/:username'>
            <Userprofile />
          </Route>
          <Route exact path='/login'>
            <SignIn />
          </Route>
          <Route >
           
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
