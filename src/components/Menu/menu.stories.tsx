import Menu from './menu';
import SubMenu from './sub-menu';
import MenuItem from './menu-item';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const menuMeta: ComponentMeta<typeof Menu> = {
  title: 'Component Menu',
  id: 'Menu',
  component: Menu,
  subcomponents: {
    'SubMenu': SubMenu,
    'Item': MenuItem,
  },
  args: {
    defaultIndex: '1',
  },
  argTypes: {
    /**
     * 可以通过配置属性帮助 Controls 识别数据类型
    */
    defaultIndex: {
      // control: 'color',
      description: 'normal test',
    },
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#333' },
      ],
    },
    controls: {
      matchers: {
        // date: /^mode$/,
      },
    },
  },
};

export default menuMeta;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>Self Link1</MenuItem>
    <MenuItem>Self Link2</MenuItem>
    <MenuItem disabled>Self Link3</MenuItem>
    <SubMenu title="下拉选项">
      <MenuItem>SubMenItem1</MenuItem>
      <MenuItem>SubMenItem2</MenuItem>
    </SubMenu>
  </Menu>
);

export const HorizontialMenu = Template.bind({});
HorizontialMenu.storyName = 'Horizontial Menu';

export const VerticalMenu = Template.bind({});
VerticalMenu.args = {
  defaultIndex: '0',
  mode: 'vertical',
};
VerticalMenu.storyName = 'Vertical Menu';


