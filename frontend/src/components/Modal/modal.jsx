import ModalContainer from "./styledmodal";

const Modal = ({ setOpen, newPassword }) => {
  return (
    <ModalContainer>
      <section>
        <div
          onClick={() => {
            setOpen(false);
          }}
        >
          X
        </div>
        <h4>Nova senha: </h4>
        <p>{newPassword}</p>
      </section>
    </ModalContainer>
  );
};

export default Modal;
