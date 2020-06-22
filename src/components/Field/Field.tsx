import React from 'react';

import './field.scss';

export enum LabelElementType {
  Span = 'span',
  Label = 'label',
}

interface IProps {
  children: React.ReactChild,
  inputName: string,
  labelText: string | React.ReactChild,
  labelElementType?: LabelElementType,
}

export default function Field(props: IProps) {
  const labelEl = props.labelElementType === LabelElementType.Label ? 
      <label
        className="field__label"
        htmlFor={ props.inputName }>
          { props.labelText }
        </label>
    :
      <span className="field__label">
        { props.labelText }
      </span>;

  return (
    <div className="field">
      { labelEl }
      <div className="field__input__container">
        { props.children }
      </div>
    </div>
  );
}

Field.defaultProps = {
  labelElementType: LabelElementType.Label,
}
