import React from 'react';
import { Routes, BrowserRouter,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Edit from './components/Edit';
import New from './components/New';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign:"Center"}}>Electricity Board</h1>
      {/* <Router>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path={`/application/:id/`} component={Edit}/>
        </Switch>
      </Router> */}
      <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = '/application/:id' element={<Edit/>} />    
        <Route path = '/application/' element={<New/>} />        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
