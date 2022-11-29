import Button from "./botton";
import { ComponentMeta, ComponentStory } from '@storybook/react';
// import mdx from './button.mdx'; // TODO 此处的 mdx 不知为何无法解析，故自定义页面暂时无法处理，后续研究下

const buttonMeta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    // doc: { page: mdx },
  }
};

export default buttonMeta;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
);

export const Default = Template.bind({});
Default.args = { children: 'Default Button' };
// Decorators 支持自定义生成的 Story
Default.decorators = [(Story) => (<div style={{ margin: '50px' }}><Story /></div>)];
// Default.storyName = '默认按钮样式';

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: 'Large Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Small Button',
};

export const Primary = Template.bind({});
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button',
};

export const Danger = Template.bind({});
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button',
};

export const Link = Template.bind({});
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com',
};
