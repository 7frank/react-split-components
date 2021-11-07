# React Split Components (RiC)

A new way of Function Components without Hooks.

English | [简体中文](./README.zh-CN.md)

---

## Introduction

[Introducing React Split Components →](./INTRODUCTION.md)

React Function Components in closure style.

Write React like Svelte, just natural and fluent code.

## Simple Example

```jsx
function demo() {
  let render;
  let count = 0;

  const onClick = () => {
    count += 1;
    render();
  };

  return () => {
    render = useRender();

    return (
      <>
        <h1>{count}</h1>
        <button onClick={onClick}>Click me</button>
      </>
    );
  };
}

const Demo = demo();
```

## Full Example

```jsx
function demo() {
  let render;
  let props;

  // solve useState
  let loading = true;
  let data;
  let count = 0;

  // solve useMemo
  const getPower = (x) => x * x;
  let power = getPower(count);

  // solve useRef
  const countRef = { current: null };

  // solve useCallback
  const onClick = () => {
    const { setTheme } = props;
    setTheme();

    count = count + 1;
    power = getPower(count);

    render(() => {
      // solve useEffect | useLayoutEffect
      console.log('countRef', countRef.current);
    });
  };

  // solve "useMount"
  const getData = () => {
    request().then((res) => {
      data = res.data;
      loading = false;
      render();
    });
  };

  const onReload = () => {
    loading = true;
    render();
    getData();
  };

  return (next) => {
    render = useRender(getData);
    props = next;
    const { theme } = next;

    return (
      <>
        <h1>{loading ? 'loading...' : JSON.stringify(data)}</h1>
        <button onClick={onReload}>Reload data</button>
        <h1>{theme}</h1>
        <h1 ref={countRef}>{count}</h1>
        <h1>{power}</h1>
        <button onClick={onClick}>Click me</button>
      </>
    );
  };
}
```

## Online Demo

[![Edit react-split-components-final](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-split-components-final-9ftjx?fontsize=14&hidenavigation=1&theme=dark)

## Helper Function

`useRender` implementation example:

```jsx
const useRender = (onMounted, isLayoutMount) => {
  const [, setState] = useState(false);

  const layoutMountedRef = useRef(isLayoutMount && onMounted);
  const mountedRef = useRef(!isLayoutMount && onMounted);
  useLayoutEffect(() => layoutMountedRef.current?.(), []);
  useEffect(() => mountedRef.current?.(), []);

  const [layoutUpdated, setLayoutUpdated] = useState();
  const [updated, setUpdated] = useState();
  useLayoutEffect(() => layoutUpdated?.(), [layoutUpdated]);
  useEffect(() => updated?.(), [updated]);

  return useCallback((onUpdated, isLayoutUpdate) => {
    setState((s) => !s);
    if (typeof onUpdated === 'function') {
      (isLayoutUpdate ? setLayoutUpdated : setUpdated)(() => onUpdated);
    }
  }, []);
};

export default useRender;
```

## License

[MIT License](https://github.com/nanxiaobei/react-split-components/blob/main/LICENSE) (c) [nanxiaobei](https://lee.so/)

## FUTAKE

Try [**FUTAKE**](https://sotake.com/f) in WeChat. A mini app for your inspiration moments. 🌈

![FUTAKE](https://s3.jpg.cm/2021/09/21/IFG3wi.png)
