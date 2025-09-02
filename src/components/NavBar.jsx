import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { NavLink, Routes, Route } from "react-router-dom";

import Movies from './Movies';
import TvShows from './TvShows';
import Trending from './Trends';
import Pricing from './Pricing';
import '../styles/NavBarStyle.css';

export const container = React.createContext()

function NavBar() {
  const [toggle, setToggle] = useState(true)
  const [inputValue, setInputValue] = useState('')
  console.log()

  return (
    <container.Provider value={{toggle, inputValue}}>

    <>
      <nav id={toggle ? "" : "navBarColor"}>
        <div className="nav-options">
          <h1 id="heading">REACTFLIX</h1>

          <NavLink to="/">
            <span id={toggle ? "" : "HomeLight"}>Movies</span>
          </NavLink>

          <NavLink to="/TvShows">
            <span id={toggle ? "" : "MoviesLight"}>Tv Shows</span>
          </NavLink>

          <NavLink to="/Trending">
            <span id={toggle ? "" : "TrendingLight"}>Trending</span>
          </NavLink>

          <NavLink to="/Pricing">
            <span id={toggle ? "" : "PricingLight"}>Pricing</span>
          </NavLink>
        </div>

        <div className="input-group">
          <input type="text" placeholder="Search Whatever You Want" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
          <HiSearch fontSize={21} color="black" id="search" />

          <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
            <div id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}></div>
          </div>
        </div>
      </nav>
      {/* {inputValue} */}

      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/TvShows" element={<TvShows />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Pricing" element={<Pricing />} />
      </Routes>
    </>
    </container.Provider>
  );
}

export default NavBar;
