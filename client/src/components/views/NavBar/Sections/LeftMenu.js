import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode} theme="dark">
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="favorite">
      <a href="/favorite">Favorites</a>
    </Menu.Item>

    <SubMenu title={<span>ETC</span>}>
      <MenuItemGroup title={<span style={{color: 'white'}}>Item 1</span>} style={{color: 'white'}}>
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title={<span style={{color: 'white'}}>Item 2</span>} style={{color: 'white'}}>
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item></MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu