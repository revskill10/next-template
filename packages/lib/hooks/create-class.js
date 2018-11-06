import { useLayoutEffect, useEffect, useRef, useState } from "react";

const usePrevValue = val => {
  const prevRef = useRef(null);
  useEffect(() => {
    prevRef.current = val;
  });
  return prevRef.current;
};

const baseClassInstance = () => ({
  getInitialState() {
    return null;
  },
  componentDidMount() {},
  componentDidUpdate() {},
  componentWillUnmount() {},
  render() {
    return null;
  }
});

const useCreateClass = (props, _classConfig) => {
  const instanceRef = useRef(Object.assign(baseClassInstance(), _classConfig));
  const [state, setState] = useState(instanceRef.current.getInitialState());

  instanceRef.current.props = props;
  instanceRef.current.state = state;

  const initializedRef = useRef(false);

  if (!initializedRef.current) {
    Object.keys(instanceRef.current).forEach(key => {
      const propValue = instanceRef.current[key];
      if (typeof propValue === "function") {
        instanceRef.current[key] = propValue.bind(instanceRef.current);
      }
    });

    instanceRef.current.setState = updatedState => {
      if (typeof updatedState === "function") {
        setState(updatedState);
      } else {
        setState(Object.assign({}, instanceRef.current.state, updatedState));
      }
    };
  }

  const prevProps = usePrevValue(props);
  const prevState = usePrevValue(state);

  useLayoutEffect(() => {
    if (initializedRef.current) {
      instanceRef.current.componentDidUpdate(prevProps, prevState);
    }
  });

  useLayoutEffect(() => {
    initializedRef.current = true;

    instanceRef.current.componentDidMount();
    return () => {
      instanceRef.current.componentWillUnmount();
    };
  }, []);

  return instanceRef.current.render();
};

export default useCreateClass;
