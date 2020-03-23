import React from 'react';

import './feature-with-bottom-button-layout.css';

interface IProps {
	button: React.ReactNode,
	content: React.ReactNode,
	className?: string,
};

function FeatureWithBottomButtonLayout(props: IProps) {
  return (
    <div className={`feature-with-bottom-button-layout ${props.className || ''}`}>
			<div className="feature-with-bottom-button-layout__content">
				<div className="feature-with-bottom-button-layout__content__body">
					{props.content}
				</div>
			</div>
			<div className="feature-with-bottom-button-layout__button-container">
				<div className="feature-with-bottom-button-layout__button-container__body">
					{props.button}
				</div>
			</div>
    </div>
  );
}

export default FeatureWithBottomButtonLayout;
