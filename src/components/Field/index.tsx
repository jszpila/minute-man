import React, { ReactChild } from "react";
import randomizeInputName from "../../util/RandomizeInputName";

import "./field.scss";

export enum LabelElementType {
  Span = "span",
  Label = "label",
}

interface IProps {
  children: ReactChild;
  inputName: string;
  labelText: string | ReactChild;
  labelElementType?: LabelElementType;
}

export default function Field(props: IProps) {
  const name = randomizeInputName(props.inputName);
  const labelId = `${name}Label`;

  const namedChildren = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { name, "aria-labelledby": labelId });
    }

    return child;
  });

  const labelEl =
    props.labelElementType === LabelElementType.Label ? (
      <label className="field__label" id={labelId} htmlFor={props.inputName}>
        {props.labelText}
      </label>
    ) : (
      <span className="field__label" id={labelId}>
        {props.labelText}
      </span>
    );

  return (
    <div className="field">
      {labelEl}
      <div className="field__input__container">{namedChildren}</div>
    </div>
  );
}

Field.defaultProps = {
  labelElementType: LabelElementType.Label,
};
