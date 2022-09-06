import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const disableUser = async (userId, disabled, authtoken) => 
  await axios.put(
    `${process.env.REACT_APP_API}/admin/disableUser`,
    { userId, disabled },
    {
      headers: {
        authtoken,
      },
    }
  );