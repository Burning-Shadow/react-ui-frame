import React, { useState } from 'react';
import './styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Button from './components/Botton/botton';
import Menu from './components/Menu/menu';
import SubMenu from './components/Menu/sub-menu';
import MenuItem from './components/Menu/menu-item';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';

library.add(fas);

const App: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='coffee' theme='danger' size='10x' />
        <Icon icon='arrow-down' theme='primary' size='10x' />
        <Menu
          mode='horizontal'
          defaultIndex={'0'}
          onSelect={(index) => { alert(index) }}
          defaultOpenSubMenus={[]}
        >
          <MenuItem>link1</MenuItem>
          <MenuItem disabled>link2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
          <MenuItem>link3</MenuItem>
        </Menu>
        <Button className='custom' autoFocus onClick={e => { e.preventDefault(); alert(123) }}>Hello</Button>
        <Button disabled>Disabled</Button>
        <Button btnType='primary' size='lg'>Large Primary</Button>
        <Button btnType='danger' size='sm'>Small Danger</Button>
        <Button btnType='link' href="http://www.baidu.com">Baidu Link</Button>
        <Button btnType='link' href="http://www.baidu.com" disabled>Disabled Link</Button>
        <h1>haihaihai</h1>
        <h2>haihaihai</h2>
        <h3>haihaihai</h3>
        <code>
          const a = 1;
        </code><br />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ><br />
          Learn React
        </a><br />
        <Button size='lg' onClick={() => { setShow(!show) }}>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <div>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
          </div>
        </Transition>

        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
          wrapper
        >
          <Button btnType='primary' size='lg'>A Large Button</Button>
        </Transition>
      </header>
    </div>
  );
}

export default App;
