import React, { useState, useContext, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from './menu-item';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface SubMenuProps {
  index?: string;
  /**下拉菜单选项的文字 */
  title: string;
  /**下拉菜单选型的扩展类名 */
  className?: string;
  children?: React.ReactNode,
};

export const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened = (index && context.mode === 'vertical' && openedSubMenus.includes(index)) ? true : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
  // click 用于纵向菜单
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }
  let timer: any;
  // mouse 用于横向菜单
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 100);
  };

  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {};
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
  } : {};

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });

  const renderChildren = () => {
    const submenuClasses = classNames('ant-submenu', {
      'menu-opened': menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { name } = childElement.type;
      if (name === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }

    });

    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className={submenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
