import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';

const Modal = forwardRef(({ title, content, actions }, ref) => {
    const dialogRef = useRef();
    useImperativeHandle(ref, () => {
        return {
            openModal: () => {
                dialogRef.current.showModal();
            },
            closeModal: () => {
                dialogRef.current.close();
            }
        }
    });

  return createPortal (
    <dialog className='cart modal' ref={dialogRef}>
      <h2>{title}</h2>
      {content}
      <div className='modal-actions'>
        {actions}
      </div>
    </dialog>,
    document.querySelector('#modal')
  )
})

export default Modal;
