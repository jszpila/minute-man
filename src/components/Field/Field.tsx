import React from 'react';

import './field.css';

interface IProps {
  children: React.ReactChild,
  inputName: string,
  labelText: string | React.ReactChild,
}

function Field(props: IProps) {
  return (
    <div className="field">
      <div className="field__cell">
        <label
          className="field__label"
          htmlFor={props.inputName}>{props.labelText}</label>
      </div>
      <div className="field__cell">
        {props.children}
      </div>
    </div>
  );
}

export default Field;
