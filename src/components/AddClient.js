import React, { useState } from "react";
import "../styles/actions.css";
import { observer, inject } from 'mobx-react'


function AddClient(props) {

    const [input, setInput] = useState({ name: "", country: "", owner: "" })

    const add = (input) => {
        if (input.name === '') {
            window.alert("Имя не должно быть пустое")
        }
        if (input.country === '') {
            window.alert("Страна должна быть заполнена")
        }
        if (input.owner === '') {
            window.alert("owner не должен быть пустым")
        }
        if (input.country !== '' && input.name !== '' && input.owner !== '') {
            props.clientsStore.addClient(input)
            window.alert('Success')
        }

    }

    return (
        <div id="Add-client">
            <h3>Новый клиент</h3>
            <div id="addClient">
                <div className="addwrapper" >
                    Имя:
                    <input
                        className="addClientInput"
                        type="text"
                        id="name"
                        value={input.name}
                        onChange={({ target }) => setInput(state => ({ ...state, name: target.value }))}
                    /> </div>

                <div className="addwrapper">Страна:
          <input
                        className="addClientInput"
                        type="text"
                        id="country"
                        value={input.country}
                        onChange={({ target }) => setInput(state => ({ ...state, country: target.value }))}
                    /></div>

                <div className="addwrapper">Ответственный:
          <input
                        className="addClientInput"
                        type="text"
                        id="owner"
                        value={input.owner}
                        onChange={({ target }) => setInput(state => ({ ...state, owner: target.value }))}
                    /></div>
            </div>
            <button className="update-btn-text" id="addClientButton" onClick={() => add(input)}>Добавить нового клиента</button>
        </div>
    );
}


export default inject("clientsStore")(observer(AddClient))
