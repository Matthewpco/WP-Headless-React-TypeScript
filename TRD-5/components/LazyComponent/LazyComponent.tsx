import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

const option: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.25, 0.5, 0.75, 1],
};

export const LazyComponent: FC = ({ children }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const [renderChildren, setRenderChildren] = useState(false);

  const handleObserver = useCallback((entries: any[]) => {
    const element = entries[0];

    if (element.isIntersecting) {
      setRenderChildren(true);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, option);
    if (elRef.current) {
      observerRef.current.observe(elRef.current);
    }
  }, []);

  return <div ref={elRef}>{renderChildren && children}</div>;
};
