import React, { ReactNode, createContext, forwardRef, useImperativeHandle } from 'react';
import { ValidateError } from 'async-validator';
import useStore, { FormState } from './useStore';

export type RenderProps = (form: FormState) => ReactNode;

export interface FormProps {
  /**表单名称，会作为表单字段 id 前缀使用 */
  name?: string;
  /**表单默认值，只有初始化以及重置时生效 */
  initialValues?: Record<string, any>;
  children?: ReactNode | RenderProps;
  /**提交表单且数据验证成功后回调事件 */
  onFinish?: (values: Record<string, any>) => void;
  /**提交表单且数据验证失败后回调事件 */
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
};

export type IFormContext =
  Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'>
  & Pick<FormProps, 'initialValues'>;
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>;

export const FormContext = createContext<IFormContext>({} as IFormContext);
export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { name, children, initialValues, onFinish, onFinishFailed } = props;
  const { form, fields, dispatch, ...restProps } = useStore(initialValues);
  const { validateField, validateAllFields } = restProps;

  // 经由此 API 可以直接定义 ref 需要暴露的属性和方法，如此通过 useRef 拿到 ref 后我们可以直接对 dom 进行操作【本案例中为重置操作】
  useImperativeHandle(ref, () => {
    return {
      ...restProps,
    };
  });

  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllFields();
    if (isValid && onFinish) {
      onFinish(values);
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors);
    }
  }
  let childrenNode: ReactNode;
  if (typeof children === 'function') {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }
  return (
    <form name={name} className="ant-form" onSubmit={submitForm}>
      <FormContext.Provider value={passedContext}>
        {childrenNode}
      </FormContext.Provider>
    </form>
  );
});
Form.defaultProps = {
  name: 'ant_form',
};

export default Form;
