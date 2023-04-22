import $ from 'jquery';
import "bootstrap-notify";

export default function showNotification(message, status) {
    return $.notify({
        message: message
    }, {
        type: status,
        timer: 1500,
        placement: {
            from: "top",
            align: "right"
        },
        allow_duplicates: false,
    });
}