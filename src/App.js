import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
// import logo from './logo.svg';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';

function App() {
    return (
        <div className="App">
            <SortingVisualizer/>
        </div>
    );
}
export default App
