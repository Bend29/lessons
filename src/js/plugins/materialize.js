import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

//Init select

const select = document.querySelectorAll('.js-select');
M.FormSelect.init(select);


export function getSelectInstance(elem) {
    return M.FormSelect.getInstance(elem);
}

//Init autocomlete select

const autocompleteSelect = document.querySelectorAll('.js-select-autocomplete');
M.Autocomplete.init(autocompleteSelect, {
    data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
    },
});

export function getAutocompleteSelectInstance(elem) {
    return M.Autocomplete.getInstance(elem);
}

//Init datepicker

const datepicker = document.querySelectorAll('.js-datepicker');
M.Datepicker.init(datepicker, {
    showClearBtn: true,
    format:'yyyy-mm'
});

export function getdatepickerInstance(elem) {
    return M.Datepicker.getInstance(elem);
}
