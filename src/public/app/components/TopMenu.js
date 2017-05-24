import React from 'react';

const TopMenu = ({handleCountryChange, handleTrendChange, getPlaylist, toggleTrackInfo, currentCountry, currentTrend, availableCountries, availableTrends}) => {
  return (
    <div className="Menu">
      <i className="Mobile--icon fa fa-bars fa-2x fa-fw"></i>
      <h1 className='Menu--logo'>world.fm</h1>
      <div className="Desktop">
        <label>Pick a country!</label>
        <select
          className="Menu--dropdown"
          value={currentCountry}
          onChange={handleCountryChange}
        >
          {availableCountries.map((country, idx) => <option key={idx}>{country}</option>)}
        </select>
        <label>Pick a category!</label>
        <select
          className="Menu--dropdown"
          value ={currentTrend}
          onChange={handleTrendChange}
        >
          {availableTrends.map((trend, idx) => <option key={idx}>{trend}</option>)}
        </select>
        <span className="Menu--login" href="/auth/spotify">Login</span>
        <span onClick={toggleTrackInfo}>Toggle Info</span>
      </div>
    </div>
  )
}

export default TopMenu;
