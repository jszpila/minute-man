import React from 'react';

import './feature-with-bottom-button-layout.scss';

interface IProps {
	buttonAreaContent: React.ReactNode,
	mainAreaContent: React.ReactNode,
};

function FeatureWithBottomButtonLayout(props: IProps) {
  return (
    <div className="feature-with-bottom-button-layout">
			<div className="feature-with-bottom-button-layout__content">
				<div className="feature-with-bottom-button-layout__content__body">
					{ props.mainAreaContent }
				</div>
			</div>
			<div className="feature-with-bottom-button-layout__button-container">
				<div className="feature-with-bottom-button-layout__button-container__body">
					{ props.buttonAreaContent }
				</div>
			</div>
    </div>
  );
}

export default FeatureWithBottomButtonLayout;
