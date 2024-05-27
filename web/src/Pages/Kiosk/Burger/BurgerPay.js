import React, { useState } from 'react';
import "./BurgerPay.css";


function BurgerPay() {
  // 결제 수단 상태
  const [selectedMethod, setSelectedMethod] = useState('');

  // 결제 수단 선택 핸들러
  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
  };

  // 결제 버튼 비활성화 여부
  const isPayButtonDisabled = selectedMethod === '';

  return (
    <div className='main_Pay'>
        <div className='B_background'>
        
      <div className='Pay_script'>결제 수단을 선택하세요</div>
      
      <div className="button-group">
        <button
          className={`payment-button ${selectedMethod === 'kakaopay' ? 'selected' : ''}`}
          onClick={() => handlePaymentMethodChange('kakaopay')}
        >
          간편결제<br/><span>카카오페이 / 삼성페이</span> 
        </button>
        <button
          className={`payment-button ${selectedMethod === 'card' ? 'selected' : ''}`}
          onClick={() => handlePaymentMethodChange('card')}
        >
          카드 결제
        </button>
        <button
          className={`payment-button ${selectedMethod === 'coupon' ? 'selected' : ''}`}
          onClick={() => handlePaymentMethodChange('coupon')}
        >
          쿠폰/포인트 
        </button>
      </div>
      <button type="button" className="pay-button" disabled={isPayButtonDisabled}>
        결제하기
      </button>

    </div>
    </div>
  );
}

export default BurgerPay;
