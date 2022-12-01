import { storiesOf } from "@storybook/react";

storiesOf('Welcome Page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>Welcome to ReactUIFrame</h1>
        <p>This just a ui-frame test demo</p>
        <h3>Try to Install</h3>
        <code>
          npm install react-ui-frame --save
        </code>
      </>
    );
  }, { info: { disable: true } });
