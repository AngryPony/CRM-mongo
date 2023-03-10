import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import '../styles/clients.css';
import Client from "./Client";
import axios from "axios";

function Clients(props) {
    const [search, setSearch] = useState("")
    const [select, setSelect] = useState("name")


    const handleSearch = (e) => {
        setSearch(e.target.value)


    }
    const handleSelect = (e) => {
        setSelect(e.target.value)
    }

    useEffect(async () => {
        let clientsData = await axios.get('/clients')
        props.clientsStore.clients = clientsData.data
    }, [])



    return (
        <div className="ordersComp">
        {props.clientsStore.clients.length > 0 ?
        <div>
            <div id="search-nav">
                <input
                    placeholder="Search"
                    id="search"
                    value={search}
                    onChange={handleSearch}
                />
                <select id="selectInput" value={select} onChange={handleSelect}>
                    <option value="name">Имя</option>
                    <option value="country">Страна</option>
                    <option value="owner">Ответственный</option>
                    <option value="sold">Продажи</option>
                </select>
            </div>
            <div id="header" >
                <span>Имя</span>
                <span>Фамилия</span>
                <span>Страна</span>
                <span>Первое действие</span>
                <span>Тип письма</span>
                <span>Продажа</span>
                <span>Ответственный</span>
                <span>Удалить клиента</span>
            </div>
            <div id ='clients'>
            {select === 'sold'
                ? props.clientsStore.clients.filter(fd => fd[select]).map(c => <Client key={c._id} client={c} />)
                : (!select)
                    ? props.clientsStore.clients.map(c => <Client key={c._id} client={c} />)
                    : props.clientsStore.clients.filter(fd =>
                        fd[select]
                            .toUpperCase()
                            .toLowerCase()
                            .includes(search))
                        .map(c => <Client key={c._id} client={c} />)
            }
            </div>
        </div>
        : null}
        </div>
    )

}

export default inject("clientsStore")(observer(Clients))