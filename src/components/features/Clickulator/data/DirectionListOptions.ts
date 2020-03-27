/**
 * DirectionListOptions
 * List options with which to populate direction select elements
 */

import { IListOption } from "../../../../interfaces/ListOption";
import { Direction } from "../../../../enum/Direction";

export const HorizontalDirectionOptions: Array<IListOption> = [
  {
    label: 'Left',
    value: Direction.Left
  },
  {
    label: 'Right', 
    value: Direction.Right
  },
]

export const VerticalDirectionOptions: Array<IListOption> = [
  {
    label: 'Up',
    value: Direction.Up
  },
  {
    label: 'Down',
    value: Direction.Down
  },
]
