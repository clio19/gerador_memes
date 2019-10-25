import React from 'react';
// import logo from './logo.svg';
import  Header  from "./components/Header";
import  MemeGenerator  from "./components/MemeGenerator";

import './App.css';

function App() {
  return (
    <div>
      <Header className ="App-header"/>
      <h1>Hello</h1> 
      <MemeGenerator/>
    </div>
      
  );
}

export default App;
