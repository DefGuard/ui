/** biome-ignore-all lint/correctness/useExhaustiveDependencies: runs only on mount once */
import { useEffect, useRef } from 'react';

export const useEffectOnce = (propCallback: () => void) => {
  const runRef = useRef(false);

  useEffect(() => {
    if (!runRef.current) {
      runRef.current = true;
      propCallback();
    }
  }, []);
};
