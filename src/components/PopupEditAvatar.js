import { PopupWithForm } from './PopupWithForm';
import { useRef, useEffect } from 'react';

function PopupEditAvatar({ isOpened, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef();

  useEffect(() => {
    if (!isOpened) {
      avatarInputRef.current.value = '';
    }
  });

  function handleSubmit(e) {
    e.preventDefault();

    // console.log(avatarInputRef.current.value);

    onUpdateAvatar(avatarInputRef.current.value);
  }

  return (
    <PopupWithForm
      popupType="edit-avatar"
      name="Обновить аватар"
      isOpened={isOpened}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar-link"
        id="avatar-link"
        placeholder="Ссылка на аватар"
        name="cards-input-avatar-link"
        defaultValue=""
        required=""
        type="url"
        ref={avatarInputRef}
      />
      <span className="popup__error popup__error_type_avatar-link" id="avatar-link-error" />
    </PopupWithForm>
  );
}

export { PopupEditAvatar };
