import React from 'react';

import './field.scss';

interface IProps {
  children: React.ReactChild,
  inputName: string,
  labelText: string | React.ReactChild,
}

function Field(props: IProps) {
  return (
    <div className="field">
      <label
        className="field__label"
        htmlFor={ props.inputName }>
          { props.labelText }
        </label>
      <div className="field__input__container">
        { props.children }
      </div>
    </div>
  );
}

export default Field;
