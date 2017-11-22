import React, { Component } from 'react';

function DailyForecast (props) {
  return (
    <div className="firstDayBox">

        <p>{props.firstDayforecastTitle}</p>
        <p>{props.firstDayforecastDay}.{props.firstDayforecastMonth}.{props.firstDayforecastYear}</p>
        <img className="fluid" src= { "images/white/svg/" + props.firstDayforecastIcon + ".svg"}  alt="Weather icon"></img>
        <p>{props.firstDayforecastCond}</p>
        <p>{props.firstDayforecastTemp}<span className="units">° C</span></p>

    </div>
  );
}



export default DailyForecast;
