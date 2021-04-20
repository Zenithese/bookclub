import React from 'react';
import Greeting from './components/book_session_forms/greeting_container'
import Ereader from './components/ereader'
import Highlights from './components/highlights'
import Books from './components/books'
import { ProtectedRoute } from './util/route_util';
import { Switch } from 'react-router-dom';
import Header from './components/header'
import Readers from './components/readers'
import ReaderProfile from './components/reader_profile'
import Modal from './components/modal/modal'

function App() {
  return (
    <div className="App" style={{position: "absolute", height: "100%", width: "100%"}}>
      <Greeting />
      <Switch>
        <ProtectedRoute path="/book/:book" component={Ereader} />
        <ProtectedRoute path="/" component={Header} />
      </Switch>
      <ProtectedRoute path="/search/books" component={Books} />
      <ProtectedRoute path="/search/readers" component={Readers} />
      <ProtectedRoute path="/book/:book" component={Highlights} />
      <ProtectedRoute path="/reader/:id" component={ReaderProfile} />
      <ProtectedRoute path="/" component={Modal} />
    </div>
  );
}

export default App;
