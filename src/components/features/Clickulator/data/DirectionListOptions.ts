/**
 * DirectionListOptions
 * List options with which to populate direction select elements
 */

import { IListOption } from "../../../../interfaces/ListOption";
import { Direction } from "../../../../enum/Direction";
import { getLocalizedStringByKey } from "../../../../util/L10n";

export const HorizontalDirectionOptions: Array<IListOption> = [
  {
    label: getLocalizedStringByKey('clickulator.directions.left'),
    value: Direction.Left
  },
  {
    label: getLocalizedStringByKey('clickulator.directions.right'), 
    value: Direction.Right
  },
]

export const VerticalDirectionOptions: Array<IListOption> = [
  {
    label: getLocalizedStringByKey('clickulator.directions.up'),
    value: Direction.Up
  },
  {
    label: getLocalizedStringByKey('clickulator.directions.down'),
    value: Direction.Down
  },
]
