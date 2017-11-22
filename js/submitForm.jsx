import React from 'react';
import ReactDOM from 'react-dom';

function SubmitForm(props) {
  return (
    <form onSubmit={props.submit} className="submitForm">
      <input
        value={props.inputValue}
        onChange={props.change}
        className="form-control mb-4 mb-sm-0"
        type="text" placeholder="City, State or zipcode">
      </input>
      <button type="submit" className="myButton submitButton">Submit</button>

    </form>
  );
}

export default SubmitForm;
