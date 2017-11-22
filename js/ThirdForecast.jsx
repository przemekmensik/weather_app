import React, { Component } from 'react';


function thirdForecast (props) {
  return (
    <div className="firstDayBox">

        <p>{props.thirdDayforecastTitle}</p>
        <p>{props.thirdDayforecastDay}.{props.thirdDayforecastMonth}.{props.thirdDayforecastYear}</p>
        <img className="fluid" src= { "images/white/svg/" + props.thirdDayforecastIcon + ".svg"}  alt="Weather icon"></img>
        <p>{props.thirdDayforecastCond}</p>
        <p>{props.thirdDayforecastTemp}<span className="units">° C</span></p>

    </div>
  );
}

export default thirdForecast;
