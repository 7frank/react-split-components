import * as React from "react";
import create from "./create";


async function request(){

    return await {data:{something:"123"}}
}

type DemoProps = {
    theme: string;
    setTheme: Function;
};


const log= (...args:any)=> process.env.NODE_ENV=="development" && console.log(...args)


function demo({ props, atom, onMount, onEffect }:{props:DemoProps}) {
    const state = atom({
      // for useState
      loading: true,
      data: null,
      count: 0,
  
      // for useMemo
      power: () => state.count * state.count,
      text: () => `${props.theme} ~ ${state.count}`,
    });
  
    // for useRef
    const countRef = { current: null };
  
    // for useCallback
    const onClick = () => {
      const { setTheme } = props;
      setTheme();
      state.count += 1;
    };
  
    const getData = () => {
      request().then((res) => {
        state.data = res.data;
        state.loading = false;
      });
    };
  
    // for useEffect
    onMount(() => {
      getData();
      log('mount!');
  
      return () => {
        log('unmount!');
      };
    });
  
    onEffect(state.power, (val, prevVal) => {
      log('enter state.power', val, prevVal);
  
      return () => {
        log('clear state.power', val, prevVal);
      };
    });
  
    const onReload = () => {
      state.loading = true;
      getData();
    };
  
    return () => {
      const { theme } = props;
      const { loading, data, count, power, text } = state;
  
      return (
        <>
          <h1>{loading ? 'loading...' : JSON.stringify(data)}</h1>
          <button onClick={onReload}>Reload data</button>
          <h1>{theme}</h1>
          <h1 ref={countRef}>{count}</h1>
          <h1>{power}</h1>
          <h1>{text}</h1>
          <button onClick={onClick}>Click me</button>
        </>
      );
    };
  }
  
  export 
  const Demo = create(demo);