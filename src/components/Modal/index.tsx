/**
 * Modal
 */

import React, { useEffect, SyntheticEvent, Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom';

import './modal.scss';

interface IProps {
  children: React.ReactNode;
  closeButtonText: string,
  onClose: (Dispatch<SetStateAction<boolean>>),
  shouldShow: boolean,
}

export default function Modal(props: IProps) {
  const htmlEl: HTMLElement | null = document.querySelector<HTMLElement>('html');

  function toggleScrollLock(lock: boolean): void {
    htmlEl?.classList.toggle('scroll-lock', lock);
  }

  function onCloseModal(event: SyntheticEvent): void {
    event.preventDefault();
    toggleScrollLock(false);
    props.onClose(false);
  }

  useEffect(() => {
    toggleScrollLock(props.shouldShow);
  });

  return ReactDOM.createPortal(
    <>
      { props.shouldShow &&
        <>
          <div
            className="modal__cover"
            onClick={onCloseModal}>
          </div>
          <div className="modal">
            <div className="modal__body">
              { props.children}
              <div className="modal__footer">
                <button 
                  type="button"
                  className="button button--primary"
                  onClick={onCloseModal}>
                    { props.closeButtonText }
                  </button>
              </div>
            </div>
          </div>
        </>
      }
    </>,
    document.body
  );
}
