export default function Modal(props){
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
              <div className="modal-content dark-background">
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
                <div className="modal-body">
                    {props.body}
                </div>
              </div>
            </div>
          </div>
    )
}