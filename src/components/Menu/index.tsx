import { FC } from 'react';
import Menu, { MenuProps } from './menu';
import SubMenu, { SubMenuProps } from './sub-menu';
import MenuItem, { MenuItemProps } from './menu-item';

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>,
};
const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
