import {config, myFunction} from "./module1";
import {conf, myFunc} from "./module1";


import * as mod1 from "./module1"; // импорт всех экспортируемых файлов


import '../css/app.css';
import './plugins'
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    const form = formUI._form;

    //Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    //Handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        // сбор данных из инпутов формы
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;

        // code, code_destination, 2019-09, 2019-10, currency
        await locations.fetchTicketsParams({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        });
    }
});
