import React, { Component } from "react";
import { observer, inject } from 'mobx-react'

import { XAxis, YAxis, Legend, LineChart, Line } from "recharts";
import "../styles/analytics.css";

function SalesSinceDate(props){
    
  const getFormmatedDate = date => {
    date = new Date(date);
    let day = date.getDate();
    return day;
  };
  const getMonth = (date) => {
    let month = new Date(date).toLocaleString("ru", { month: "long" });
    return month;
  };

  const getDataForChart = () => {
    let mapData = props.clientsStore.clients.map(m => {return { sold: m.sold, date: new Date(m.firstContact)}})
    let filterData = mapData.filter(f => f.sold === true && getMonth(f.date) == getMonth(new Date()) && f.date.getFullYear() == new Date().getFullYear())

    let arr = [];
    let obj = {};

    filterData.forEach(d => {
      obj[getFormmatedDate(d.date)] ? obj[getFormmatedDate(d.date)]++ : (obj[getFormmatedDate(d.date)] = 1);
    });

    Object.keys(obj).forEach( c => 
      arr.push({ day: c, sales: obj[c]})

    )
    console.log(arr)
    return arr;
  };

  
    return (
      <div>
        <span id="salesByMonthHeader">Продажи за {getMonth(Date.now())} </span>
        <LineChart
          width={1000}
          height={450}
          data={getDataForChart()}
          margin={{ top: 10, right: 30, left: 47, bottom: 5 }}
        >
          <XAxis dataKey="day" />
          <YAxis dataKey="sales" />
          <Legend />
          <Line
            strokeWidth={3}
            type="monotone"
            dataKey="sales"
            stroke="#FF0000"
          />
        </LineChart>
      </div>
    );
  
}

export default inject("clientsStore")(observer(SalesSinceDate))