// function PopupWithForm({ popupType, isOpened, onClose, name, children, buttonText, onSubmit }) {
//   return (
//     <div className={`popup ${isOpened ? 'popup_opened' : ''}`}>
//       <div className="popup__container">
//         <button className="popup__close-button" type="button" aria-label="Закрыть попап" onClick={onClose} />
//         <p className="popup__description">{name}</p>
//         <form className={`popup__form popup__form_type_${popupType}`} name={name} onSubmit={onSubmit}>
//           {children}
//           <button className="popup__save-button" type="submit">
//             {buttonText}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

function PopupWithForm({ popupType, name, onSubmit, buttonText, children }) {
  return (
    <form className={`popup__form popup__form_type_${popupType}`} name={name} onSubmit={onSubmit}>
      <p className="popup__description">{name}</p>
      {children}
      <button className="popup__save-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
}

export { PopupWithForm };
