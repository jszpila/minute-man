/**
 * DirectionListOptions
 * List options with which to populate direction select elements
 */

import { IListOption } from "../../../../interfaces/ListOption";
import { Direction } from "../../../../enum/Direction";

export const HorizontalDirectionOptions: Array<IListOption> = [
  {
    labelKey: 'clickulator.directions.left',
    value: Direction.Left
  },
  {
    labelKey: 'clickulator.directions.right', 
    value: Direction.Right
  },
]

export const VerticalDirectionOptions: Array<IListOption> = [
  {
    labelKey: 'clickulator.directions.up',
    value: Direction.Up
  },
  {
    labelKey: 'clickulator.directions.down',
    value: Direction.Down
  },
]
