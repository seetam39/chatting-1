import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
function App() {
  return (
    <div className='App'>

      <Route path='/' component={Home} exact/>
      <Route path='/chats' component={Chat}/>
    </div>
  );
}

export default App;
