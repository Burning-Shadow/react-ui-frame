import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper?: boolean,
  children?: React.ReactNode,
}

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...resetProps } = props;

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...resetProps}
    >
      {/* 若 wrapper 属性存在则外包一层 div【用以承载相应的动画】，防止污染内部动画效果 */}
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true,
};
export default Transition;
