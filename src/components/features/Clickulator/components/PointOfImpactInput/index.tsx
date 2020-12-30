/**
 * PointOfImpactInput
 * Specify distance and direction deltas between actual and desired points-of-impact
 */

import React, { Dispatch, SetStateAction } from "react";

import { IListOption } from "../../../../../interfaces/ListOption";
import { getLocalizedStringByKey } from "../../../../../util/L10n";
import randomizeInputName from "../../../../../util/RandomizeInputName";
import RestrictedNumericInput from "../../../../RestrictedNumericInput";

interface IProps {
  axis: string;
  directions: Array<IListOption>;
  directionValue: string;
  directionUpdaterFn: Dispatch<SetStateAction<string>>;
  distanceValue: number | undefined;
  distanceUpdaterFn: Dispatch<SetStateAction<number | undefined>>;
  name?: string;
}

export default function PointOfImpactInput(props: IProps) {
  const selectName = randomizeInputName("offsetDirectSelect");
  const directionLabel = `${props.name}DirectionLabel`;
  const distanceLabel = `${props.name}DistanceLabel`;

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.directionUpdaterFn(event.currentTarget.value);
  }

  return (
    <>
      <div className="field__cell">
        <RestrictedNumericInput
          className="field__input--cell_width_fix"
          labelledBy={distanceLabel}
          name={props.name}
          value={props.distanceValue}
          updaterFn={props.distanceUpdaterFn}
        />
        <label
          aria-hidden="true"
          className="u-visually-hidden"
          hidden
          id={directionLabel}
        >
          {props.axis} offset distance
        </label>
      </div>
      <div className="field__cell">
        <select
          aria-labelledby={directionLabel}
          className="field__select field_select--cell_width_fix"
          defaultValue={props.directionValue}
          id={selectName}
          name={selectName}
          onChange={onSelectChange}
        >
          {props.directions.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {getLocalizedStringByKey(option.labelKey)}
              </option>
            );
          })}
        </select>
        <label
          aria-hidden="true"
          className="u-visually-hidden"
          hidden
          id={directionLabel}
        >
          {props.axis} offset direction
        </label>
      </div>
    </>
  );
}

PointOfImpactInput.defaultProps = {
  name: "",
};
