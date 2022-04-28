import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
  z-index: 100;

  section {
    width: 250px;
    height: 150px;
    background-color: white;
    position: relative;
    border-radius: 8px;
    padding: 20px;

    div {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 12;
      right: -5px;
      top: -5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bolder;

      :hover {
        filter: brightness(0.7);
      }
    }
  }
`;

export default ModalContainer;
