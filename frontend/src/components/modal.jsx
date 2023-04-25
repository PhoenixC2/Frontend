import BSModal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

export function ModalBefore(props) {
  return (
    <div
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
      id={props.id}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalLongTitle">
              {props.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{props.body}</div>
        </div>
      </div>
    </div>
  );
}
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
        fullscreen={true}
        centered
        id={props.id}
      >
        <BSModal.Dialog centered role="document">
          <BSModal.Header>
            <BSModal.Title>
              {props.title}
            </BSModal.Title>
          </BSModal.Header>

          <BSModal.Body>{props.body}</BSModal.Body>
        </BSModal.Dialog>
      </BSModal>
    </>
  );
}
