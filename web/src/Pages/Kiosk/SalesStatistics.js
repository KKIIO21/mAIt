import React from "react";

const salesData = [
  { productName: '기네스 와퍼', price: 5000, quantity: 0 },
  { productName: '치킨킹 BLT', price: 4500, quantity : 0},
  { productName: '코카콜라', price: 2000, quantity: 0 },
  { productName: '환타', price: 2000, quantity: 0},
  { productName: '감자튀김', price: 1500, quantity: 0},
  { productName: '치즈스틱', price: 2000, quantity: 0}
];

var totalSales = 0;

export class SalesStatistics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <h2>관리자 모드: 매출 통계</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ minWidth: '600px', borderCollapse: 'collapse', textAlign: 'center' }}>
              <thead>
              <tr>
                <th style={{ borderRight: '1px solid black' }}>상품명</th>
                <th style={{ borderRight: '1px solid black' }}>상품 가격</th>
                <th style={{ borderRight: '1px solid black' }}>수량</th>
                <th>총 결제 금액</th>
              </tr>
              </thead>
              <tbody>
              {salesData.map((item, index) => (
                  <tr key={index}>
                    <td style={{ borderRight: '1px solid black' }}>{item.productName}</td>
                    <td style={{ borderRight: '1px solid black' }}>{item.price}</td>
                    <td style={{ borderRight: '1px solid black' }}>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div>
            <p id="totalSales">총 매출 금액: {totalSales} </p>
          </div>

        </div>
    );
  }
}

export const fetchSalesData = async (updatedSalesData) => {
  var newTotalSales = 0

  updatedSalesData.forEach(updatedItem => {
    const correspondingItem = salesData.find(item => item.productName == updatedItem.name)
    correspondingItem.quantity += parseInt(updatedItem.count);
    newTotalSales += correspondingItem.price * parseInt(updatedItem.count)
  })

  // Calculate total sales based on updated salesData
  totalSales += newTotalSales

  // Return the updated sales data
  return { salesData: updatedSalesData, totalSales : totalSales + newTotalSales };
};

export default SalesStatistics;