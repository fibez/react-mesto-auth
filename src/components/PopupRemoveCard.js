import { PopupWithForm } from './PopupWithForm';

function PopupRemoveCard({ isOpened, onClose }) {
  return (
    <PopupWithForm popupType="remove-card" name="Вы уверены?" isOpened={isOpened} onClose={onClose} buttonText={'Да'} />
  );
}

export { PopupRemoveCard };
