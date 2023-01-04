import React, { FC, useEffect, useState } from 'react';

export const ClientSide: FC = ({ children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{show && children}</>;
};
