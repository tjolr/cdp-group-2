import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Dispatch } from 'react';
import { MutableRefObject } from 'react';

export const useRefState: {
  <T>(initialValue: T): [MutableRefObject<T>, Dispatch<T>];
} = (initialValue) => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  return [stateRef, setState];
};
