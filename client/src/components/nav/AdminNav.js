import {React} from "react";
import {  AppstoreOutlined,
  ContainerOutlined,
  PercentageOutlined,
  EyeInvisibleOutlined,
  FileAddOutlined,
  FolderOpenOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Link } from "react-router-dom";
import { Menu } from "antd";

const { SubMenu, Item } = Menu;

const AdminNav = () => (
  <Menu>
    <Item icon={<ContainerOutlined />}>
      <Link to="/admin/dashboard">
        Upravljačka ploča
      </Link>
    </Item>
    <SubMenu
      icon={<AppstoreOutlined />}
      title="Proizvodi">
      <Item
        icon={<FileAddOutlined />}>
        <Link to="/admin/product">
          Dodaj novi proizvod
        </Link>
      </Item>
      <Item
        icon={<FolderOpenOutlined />}>
        <Link to="/admin/products">
          Upravljaj proizvodima
        </Link>
      </Item>
    </SubMenu>
    <SubMenu
      icon={<AppstoreOutlined />}
      title="Kategorije">
      <Item
        icon={<FileAddOutlined />}>
        <Link to="/admin/category">
          Kreiraj kategoriju
        </Link>
      </Item>

      <Item
        icon={<FileAddOutlined />}>
        <Link to="/admin/sub">
          Kreiraj podkategoriju
        </Link>
      </Item>
    </SubMenu>

    <Item
      icon={<UserOutlined />}>
      <Link to="/admin/users">
        Korisnici
      </Link>
    </Item>

    <Item
      icon={<PercentageOutlined />}>
      <Link to="/admin/coupon">
        Kupon
      </Link>
    </Item>

    <Item
      icon={<EyeInvisibleOutlined />}>
      <Link to="/user/password">
        Lozinka
      </Link>
    </Item>
  </Menu>
);
export default AdminNav;
