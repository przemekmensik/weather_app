import React, { Component } from 'react';

function AppDetails2 (props) {
  return (
    <div className="col-5 content" id="header">
      <div className="second">
        <img className="img-fluid" src={props.icon}></img>
      </div>
        <div className="localization">
            <div>
              <p  >{props.location}</p>
              <p>
                Tokyo, International Airport
              </p>
            </div>
        </div>
      </div>
);
}

export default AppDetails2;
