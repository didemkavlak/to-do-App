import {configureStore} from '@reduxjs/toolkit'

import todosSlice from './todos/todosSlice';

export const store = configureStore({ //Parametre olarak obje alır. Obje içinde de reducer isimli feild vardır.
    reducer:{
        todos: todosSlice,
    } //Yazacağımız slicesLarle doldururuz.
});

//Store index.js dosyasına provider ile eklenir. provider ile sarmalanıp prop olarak store verilir.Bundan sonra slices oluşturulur.