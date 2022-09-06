import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import ModalImage from "react-modal-image";

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Proizvod</th>
          <th scope="col">Cijena</th>
          <th scope="col">Boja</th>
          <th scope="col">Slika</th>
          <th scope="col">Količina</th>
          <th scope="col">Dostava</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.color}</td>
            <td>
              <div style={{ width: "100px", height: "auto" }}>
                <ModalImage small={p.customImageURL} large={p.customImageURL} />
              </div>
            </td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Da" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4">Status narudžbe</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Nije procesirano">Nije procesirano</option>
                  <option value="Plaćanje pouzećem">Plaćanje pouzećem</option>
                  <option value="Procesiranje">Procesiranje</option>
                  <option value="Otpremljeno">Otpremljeno</option>
                  <option value="Otkazano">Otkazano</option>
                  <option value="Završeno">Završeno</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
