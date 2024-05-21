import React from "react";
import "./PaymentChoice.css";
import {fetchSalesData} from "../SalesStatistics";
import { useNavigate, useLocation } from 'react-router-dom';

export function PaymentChoice() {
  const items = useLocation().state;
  const navigate = useNavigate();

  const movePage = () => {
    navigate('/CompletePay', { state: items });
    fetchSalesData(items);
  };

  return (
      <div>
        <h2>결제 수단을 선택해주세요.</h2>
        <div className="container">
          <button onClick={movePage} className="item">
            신용카드, 삼성페이
          </button>
          <button onClick={movePage} className="item">
            모바일 교환권
          </button>
          <button onClick={movePage} className="item">
            현금
          </button>
          <button onClick={movePage} className="item">
            QR결제
          </button>
        </div>
      </div>
  );
}

export default PaymentChoice;
