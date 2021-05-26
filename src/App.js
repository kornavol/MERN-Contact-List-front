import './App.css';

import Contacts from "./pages/Contact"
import Auth from "./pages/Auth"
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
