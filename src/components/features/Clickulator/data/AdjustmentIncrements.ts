/**
 * OpticAdjumstmentIncrement
 * List options with which to populate optic adjustment select elements
 */

import { IListOption } from "../../../../interfaces/ListOption";

export const AdjustmentIncrements: Array<IListOption> = [
	{
		label: '.25 MOA/click',
		value: 0.25,
	},
	{
		label: '.50 MOA/click',
		value: 0.5,
	},
	{
		label: '1 MOA/click',
		value: 1,
	},
]
