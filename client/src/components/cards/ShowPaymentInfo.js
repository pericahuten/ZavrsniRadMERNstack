import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <table className="table table-bordered">
    <thead className="thead-light">
      <tr>
        <th>ID narudžbe</th>
        <th>Cijena</th>
        <th>Način plačanja</th>
        <th>Status plačanja</th>
        <th>Datum narudžbe</th>
        {showStatus && (
          <th>
            Datum narudžbe
          </th>
        )}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{order.paymentIntent.id}</td>
        <td>{(order.paymentIntent.amount / 100).toLocaleString("hr-HR", {style: "currency", currency: "HRK"})}</td>
        <td>{order.paymentIntent.payment_method_types[0]}</td>
        <td>{order.paymentIntent.status.toUpperCase()}</td>
        <td>{new Date(order.paymentIntent.created * 1000).toLocaleString()}</td>
        {showStatus && (
          <td>
            <span className="badge bg-primary text-white">
              STATUS: {order.orderStatus}
            </span>
          </td>
        )}
      </tr>
    </tbody>

  </table>
);

export default ShowPaymentInfo;
