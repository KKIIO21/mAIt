import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const headers = [
    {
        text: '번호',
        value: 'id'
    },
    {
        text: '품목',
        value: 'name'
    },
    {
        text: '가격',
        value: 'price'
    },
    {
        text : '수량',
        value : 'quantity'
    }
];

function ItemTable({ headers, items }) {

    return (
        <table>
            <thead>
            <tr>
                {headers.map(header => (
                    <th key={header.value}>{header.text}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {items.map(({ id, name, price, count}) => (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{count}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

const CompletePay = () => {
    const items = useLocation().state;
    const navigate = useNavigate();

    const moveToFirst = () => {
        navigate('../');
    };

    return (
        <div className="Paydiv">
            <h1>결제가 완료되었습니다!</h1>
            <hr />
            <h2>주문내역</h2>
            <ItemTable className="ItemTable" headers={headers} items={items} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button onClick={moveToFirst}>처음으로 돌아가기</button>
        </div>
    );
};

export default CompletePay;
