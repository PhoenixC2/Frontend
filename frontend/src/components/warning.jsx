function WarningModal(props) {
    const text = props.text;
    const alert = props.alert;
    const approvedFunction = props.approvedFunction; // Function to be called when the user clicks "Yes"

    return (
        <div className="modal fade" id="warningModal" tabIndex="-1" role="dialog" aria-labelledby="warningModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="warningModalLabel">Warning</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {text}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={approvedFunction}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}