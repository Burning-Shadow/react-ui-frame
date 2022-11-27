/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menu-item';
import SubMenu from './sub-menu';

const testProps: MenuProps = {
  className: 'test',
  defaultIndex: '0',
  onSelect: jest.fn(),
};

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>link3</MenuItem>
      <li>hello</li>
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .ant-submenu {
      display: none;
    }
    .ant-submenu.menu-opened {
      display: block;
    }
  `;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerText = cssFile;
  return style;
};

describe('test Menu & MenuItem component', () => {
  let menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

  it('should render correct Menu & MenuItem based on default props', () => {
    render(generateMenu(testProps));
    menuElement = screen.getByTestId('test-menu');
    activeElement = screen.getByText('active');
    disabledElement = screen.getByText('disabled');

    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('ant-menu test');
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('click item should change active & call the right callback', () => {
    render(generateMenu(testProps));
    menuElement = screen.getByTestId('test-menu');
    activeElement = screen.getByText('active');
    disabledElement = screen.getByText('disabled');

    const thirdItem = screen.getByText('link3');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');

    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  });

  it('should render vertical mode when mode is set to "vertical"', () => {
    render(generateMenu(testVerticalProps));
    menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

  it('should show dropdown items when hover on subMenu', async () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(generateMenu(testProps));
    // eslint-disable-next-line testing-library/no-container
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');

    expect(wrapper.queryByText('drop1')).toBe(null);
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    })
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('4-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBe(null);
    })
  })
});
