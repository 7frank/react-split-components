import * as React from 'react';
import create from './create';
import { Demo } from './Demo';

function app({ atom }) {
  const state = atom({
    theme: 'light',
  });

  const setTheme = () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
  };

  return () => {
    const { theme } = state;
    return (
      <>
        <code>React Split Components (RiC)</code>
        <p />
        <a
          href="https://github.com/nanxiaobei/react-split-components"
          target="_blank"
          rel="noreferrer"
        >
          github.com/nanxiaobei/react-split-components
        </a>
        <hr />
        <Demo theme={theme} setTheme={setTheme} />
        <p />
        <button onClick={setTheme}>Change theme</button>
      </>
    );
  };
}

const App = create(app);
export default App;
