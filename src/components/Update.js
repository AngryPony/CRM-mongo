
import React, { useState } from "react";
import { observer, inject } from 'mobx-react'
import "../styles/actions.css";

function Update(props) {

    const [input, setInput] = useState({ name: "", transfer: "", email: "", owner: "" })

    const declareSale = (input,flags) => {
        props.clientsStore.declareSale(input, flags)
    }
    const updateEmail = (input,flags) => {
        props.clientsStore.updateEmail(input,flags)
        window.alert('Письмо, типа ' + input.email + ' ,отправлено')
    }
    const updateOwner = (input,flags) => {
        props.clientsStore.updateOwner(input, flags)
        window.alert('Ответственный изменен на: ' + input.owner)
    }


    return (
        <div id="Update">
            <h3>Обновить данные</h3>
            <div className="updateWrapper">
                Клиент
          <input
                    placeholder="Имя Клиента"
                    id="clientName"
                    list="client"
                    type="text"
                    className="selectInput"
                    value={input.name}
                    onChange={({ target }) => setInput(state => ({ ...state, name: target.value }))}
                />
                <datalist id="client">
                    {props.clientsStore.clients.map(c => (
                        <option value={c.name} key={c._id} />
                    ))}
                </datalist>
            </div>

            <div className="updateWrapper">
                Изменить ответственного
          <input
                    placeholder="Имя ответственного"
                    id="transfer"
                    list="owner"
                    type="text"
                    className="selectInput"
                    value={input.transfer}
                    onChange={({ target }) => setInput(state => ({ ...state, transfer: target.value }))}
                />
                <datalist id="owner">
                    {props.clientsStore.getOwners.map((o, i) => (
                        <option value={o} key={i} />
                    ))}
                </datalist>

                <div className= "update-btn-text" onClick={() => updateOwner(input)}>Изменить</div><span id="TRANSFER"></span>
            </div>

            <div className="updateWrapper">
                Отправить письмо
          <input
                    list="email"
                    id="sendEmail"
                    placeholder="Тип письма"
                    onChange={({ target }) => setInput(state => ({ ...state, email: target.value }))}
                    className="selectInput"
                />
                <datalist id="email">
                    <option value="Info">Информационное</option>
                    <option value="Warning">Предупреждение</option>
                    <option value="Help">Помощь</option>
                    <option value="Security">Безопасность</option>
                </datalist>

                <div className="update-btn-text" onClick={() => updateEmail(input)}>Отправить</div><span id="SEND"></span>
            </div>

            <div className="updateWrapper">
                Отметить продажу
          <div></div>
                <div className="update-btn-text" id="declare" onClick={() => declareSale(input)}>Отменить</div><span id="DECLARE"></span>
            </div>
        </div>
    );
}


export default inject("clientsStore")(observer(Update))