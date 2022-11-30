import { ComponentMeta } from '@storybook/react';
import Select from './index';

export default {
  title: 'Select',
  component: Select,
  id: 'Select',
  subcomponents: { 'Option': Select.Option },
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Select>;

export const DefaultSelect = (args: any) => (
  <Select
    {...args}
    placeholder="请选择"
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="disabled" disabled/>
    <Select.Option value="nihao5" />
  </Select>
);
DefaultSelect.storyName = 'Default Select';

export const MultipleSelect = (args: any) => (
  <Select
    {...args}
    placeholder="支持多选欧！"
    multiple
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="ant" />
    <Select.Option value="ant2" />
  </Select>
)
MultipleSelect.storyName = 'Mutiple Select';

export const DisabledSelect = (args: any) => (
  <Select
    {...args}
    placeholder="禁用啦！"
    disabled
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
  </Select>  
);
DisabledSelect.storyName = 'Disabled Select'