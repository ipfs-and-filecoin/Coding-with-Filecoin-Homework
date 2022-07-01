import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from 'reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from 'App';
import Home from 'home/index.js'
import Dapp from 'dapp'
// import Home from './home/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
        <Route path="home" element={<Home />} />
        <Route path="dapp" element={<Dapp />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
