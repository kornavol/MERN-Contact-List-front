import './App.css';

import { Switch, Route } from 'react-router-dom';

import Contacts from "./pages/Contact"
import GetContacts from "./pages/ContactForm/GetContact"
import Auth from "./pages/Auth"


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
        <Route path="/get-contacts">
          <GetContacts />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
