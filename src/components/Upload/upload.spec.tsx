/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */

import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import { Upload, UploadProps } from './upload';
import axios from 'axios';

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>;
  }
});
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector('.ant-file-input') as HTMLInputElement;
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement;
  });

  it('upload process should works fine', async () => {
    const { queryByText, getByText } = wrapper;
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'});
    // })
    mockedAxios.post.mockResolvedValue({ 'data': 'cool' });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(queryByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
      expect(queryByText('check-circle')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png',
    }));
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png',
    }));

    //remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument();
    fireEvent.click(getByText('times'));
    expect(queryByText('test.png')).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png',
    }));
  });

  it('drag and drop files should works fine', async () => {
    mockedAxios.post.mockResolvedValue({ 'data': 'cool' });
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover');
    // 不支持 js-dom 的老版本 react-testing-library 解决方案如下【Ps: 记得从 @testing-library/react 中引用】
    // const mockDropEvent = createEvent.drop(uploadArea);
    // Object.defineProperty(mockDropEvent, "dataTransfer", {
    //   value: {
    //     files: [testFile],
    //   }
    // })
    // fireEvent(uploadArea, mockDropEvent)
    fireEvent.drop(uploadArea, {
      // 老版本 react-testing-library 不支持 js-dom
      dataTransfer: {
        files: [testFile],
      },
    });
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument();
      // expect(wrapper.queryByText('check-circle')).toBeInTheDocument();
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png',
    }));
  });
});
