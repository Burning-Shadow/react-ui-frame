import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from './menu-item';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  className?: string;
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode,
  style?: React.CSSProperties;
  /**点击菜单项触发的回掉函数 */
  onSelect?: SelectCallback;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
  children?: React.ReactNode;
};

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
};

export const MenuContext = createContext<IMenuContext>({ index: '0' });

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * 
 * ```javascript
 * import { Menu } from 'react-ui-frame'
 * 
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ```
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const { className, defaultIndex, mode, style, children, defaultOpenSubMenus, onSelect } = props;
  const [currActive, setActive] = useState(defaultIndex);

  const classes = classNames('ant-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal',
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) onSelect(index);
  };
  const passedContext: IMenuContext = {
    index: currActive ? currActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { name } = childElement.type;
      if (name === 'MenuItem' || name === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
