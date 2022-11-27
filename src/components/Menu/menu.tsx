import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from './menu-item';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  className?: string;
  defaultIndex?: string;
  mode?: MenuMode,
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
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
