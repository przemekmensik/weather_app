import React, { Component } from 'react';


function SecondForecast (props) {
  return (
    <div className="firstDayBox">

        <p>{props.secondDayforecastTitle}</p>
        <p>{props.secondDayforecastDay}.{props.secondDayforecastMonth}.{props.secondDayforecastYear}</p>
        <img className="fluid" src= { "images/white/svg/" + props.secondDayforecastIcon + ".svg"}  alt="Weather icon"></img>
        <p>{props.secondDayforecastCond}</p>
        <p>{props.secondDayforecastTemp}<span className="units">° C</span></p>

    </div>
  );
}

export default SecondForecast;
