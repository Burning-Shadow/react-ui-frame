import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from './menu';


export interface MenuItemProps {
  className?: string;
  disabled?: boolean;
  index?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, disabled, index, style, children } = props;
  const context = useContext(MenuContext);

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index);
    }
  };

  return (
    <li
      className={classes}
      style={style}
      onClick={handleClick}
    >{children}</li>
  );
};

export default MenuItem;
