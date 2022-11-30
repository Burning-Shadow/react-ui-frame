import { ComponentStory, ComponentMeta } from '@storybook/react';
import Alert from './alert';

export default {
  title: 'Alert',
  id: 'Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const DefaultAlert = Template.bind({});
DefaultAlert.args = {
  title: 'this is alert!',
};
DefaultAlert.storyName = 'DefaultAlert';

export const DescAlert = Template.bind({});
DescAlert.args = {
  title: '提示标题欧亲',
  description: 'this is a long description',
};;
DescAlert.storyName = 'Desc Alert';

export const StylesAlert = () => {
  return (
    <>
      <Alert title="this is Success" type="success"></Alert>
      <Alert title="this is Danger!" type="danger"></Alert>
      <Alert title="this is Warning!" type="warning" closable={false}></Alert>
    </>
  );
};
StylesAlert.storyName = 'Diff Style Alert';