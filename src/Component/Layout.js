import React from 'react';
import { useState } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { 
  Layout,
  Button, 
  Menu, 
  Dropdown, 
  message, 
  Tooltip 
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined, 
  DownOutlined,
  SettingFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import Home from './Home';
import './Layout.css';


const { Header, Sider, Content } = Layout;

function MainLayout(props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const salir = () => {
    props.history.push("/login")
  }

  const handleMenuClick = (e) => {
    // message.info('Click on menu item.');
    if (parseInt(e.key) === 2) salir();
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<SettingFilled />}>
        Configuracion
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        Salir
      </Menu.Item>
    </Menu>
  );
  
  return(
    <Layout>
      <Sider style={{height: '100vh'}} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/dashboard/home" style={{ padding: 5 }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item onClick={salir} key="7" icon={<UploadOutlined />}>
            Salir
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <Dropdown.Button style={{float: 'right', margin: '15px',}} overlay={menu} placement="bottomCenter" icon={<UserOutlined />}/>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}>
            <Route exact path="/dashboard/*">{ <Redirect to="/dashboard/home" />}</Route>
            <Route exact path="/dashboard/home" component={Home} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;