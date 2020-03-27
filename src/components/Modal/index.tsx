/**
 * Modal
 */

import React, { useContext, useEffect, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';
import { FeatureContext } from '../features/Clickulator/context';

import './modal.css';

interface IProps {
  children: React.ReactNode;
}

export default function Modal(props: IProps) {
  const context = useContext(FeatureContext);
  const htmlEl: HTMLElement | null = document.querySelector<HTMLElement>('html');

  function toggleScrollLock(lock: boolean): void {
    htmlEl?.classList.toggle('scroll-lock', lock);
  }

  function onCloseModal(event: SyntheticEvent): void {
    event.preventDefault();
    toggleScrollLock(false);
    context.updateShouldShowResults(false);
  }

  useEffect(() => {
    toggleScrollLock(true);
  });

  return ReactDOM.createPortal(
    <>
      { context.shouldShowResults &&
        <div
          className="modal__cover"
          onClick={onCloseModal}>
          <div className="modal">
            <div className="modal__content">
              { props.children}
              <div className="modal__button-bar">
                <button 
                  type="button"
                  className="button button--primary"
                  onClick={onCloseModal}>
                    OK Boomer
                  </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>,
    document.body
  );
}
