import BSModal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

export default function Modal(props) {
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    setShow(props.show);
  }, [props]);

  return (
    <>
      <BSModal
        show={show}
        onHide={() => {
          setShow(false);
          props.setShow(false);
        }}
        id={props.id || "modal"}
        contentClassName="dark-background"
        {...props.options}
      >
        <BSModal.Header>
          <BSModal.Title as="h5" id="ModalTitle">
            {props.title}
          </BSModal.Title>
        </BSModal.Header>

        <BSModal.Body>{props.body}</BSModal.Body>
      </BSModal>
    </>
  );
}
