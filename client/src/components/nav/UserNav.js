import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {  
  HistoryOutlined,
  StarOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons"

const { Item } = Menu;


const UserNav = () => (
  <Menu>
    <Item icon={<HistoryOutlined />}>
      <Link to="/user/history">
        Povijest
      </Link>
    </Item>
    <Item icon={<EyeInvisibleOutlined />}>
      <Link to="/user/password">
        Lozinka
      </Link>
    </Item>
    <Item icon={<StarOutlined />}>
      <Link to="/user/wishlist">
        Popis želja
      </Link>
    </Item>
  </Menu>
);

export default UserNav;
