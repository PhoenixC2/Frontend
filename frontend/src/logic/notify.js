import $ from 'jquery';
import "bootstrap-notify";
import queryClient from '../query';
export default function showNotification(message, status) {
    queryClient.invalidateQueries('unseen');
    return $.notify({
        message: message
    }, {
        type: status,
        timer: 1500,
        placement: {
            from: "top",
            align: "right"
        },
        z_index: 9999,
        allow_duplicates: false,
    });
}