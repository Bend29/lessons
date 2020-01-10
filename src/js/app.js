

import {config, myFunction} from "./module1";
import {conf, myFunc} from "./module1";



import * as mod1 from "./module1"; // импорт всех экспортируемых файлов
// console.log(mod1.conf);
//
// import Product from "./module2";
//
// console.log(new Product('akadsadsjda'));

import api from "./services/apiServices";

api.getCountries().then(res => console.log(res));
api.getCities().then(res => console.log(res));
