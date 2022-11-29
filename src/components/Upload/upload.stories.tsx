import React from 'react'
import { ComponentMeta } from '@storybook/react';
import { Upload } from './upload';
import Button from '../Botton/botton';
import Icon from '../Icon/icon';

export default {
  title: 'Upload',
  id: 'Upload',
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof Upload>;

export const SimpleUpload = (args: any) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  >
    <Button size="lg" btnType="primary"><Icon icon="upload" /> 点击上传 </Button>
  </Upload>
);
SimpleUpload.storyName = 'Simple Upload';

export const CheckUpload = (args: any) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false;
    }
    return true;
  }
  return (
    <Upload
      {...args}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={checkFileSize}
    >
      <Button size="lg" btnType="primary"><Icon icon="upload" /> 不能传大于50Kb！ </Button>
    </Upload>
  );
};
CheckUpload.storyName = 'SizeLimit Upload';

export const DragUpload = (args: any) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br />
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
);
DragUpload.storyName = 'Drag Upload';