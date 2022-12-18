import '../styles/actions.css';
import React from 'react';
import AddClient from "./AddClient";
import Update from "./Update";
import { observer } from 'mobx-react'


function Actions() {

    return (
        <div>
            <Update />
            <hr></hr>
            <AddClient />
        </div>
    )

}

export default observer(Actions)