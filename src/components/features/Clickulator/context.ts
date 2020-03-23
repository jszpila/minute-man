import React from 'react';

export interface IFeatureContext {
  horizontalOffsetDistance: number,
  verticalOffsetDistance: number,
  zeroAtDistance: number,
  opticAdjustmentIncrement: number,
}

export const FeatureContext = React.createContext({
  horizontalOffsetDistance: 0,
  verticalOffsetDistance: 0,
  zeroAtDistance: 100,
  opticAdjustmentIncrement: 0.25
});
