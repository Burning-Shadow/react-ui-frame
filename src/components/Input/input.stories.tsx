import { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './input';

export default {
  title: 'Input',
  id: 'Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '漂亮的 Input'
};
Default.storyName = 'Default Input';

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'disabled input',
  disabled: true,
}
Disabled.storyName = 'Disabled Input';

export const Icon = Template.bind({});
Icon.args = {
  placeholder: 'input with icon',
  icon: 'search',
}
Icon.storyName = 'Input With Icon';

export const SizeInput = () => (
  <>
    <Input
      defaultValue="large size"
      size="lg"
    />
    <Input
      placeholder="small size"
      size="sm"
    />
  </>
);
SizeInput.storyName = 'Input With Diff Size';

export const ApandInput = () => (
  <>
    <Input
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      defaultValue="google"
      append=".com"
    />
  </>
);
ApandInput.storyName = 'Input With Append';

export const ControlInput = () => {
  const [value, setValue] = useState('value');
  return (
    <Input value={value} defaultValue={'defaultValue'} onChange={(e) => setValue(e.target.value)}></Input>
  );
};
ControlInput.storyName = 'ControlInput Input';
