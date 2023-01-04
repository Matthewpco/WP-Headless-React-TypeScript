import { FC, useEffect } from 'react';

interface CustomScriptProps {
  id: string;
  text: string;
}

export const CustomScriptText: FC<CustomScriptProps> = ({ text }) => {
  useEffect(() => {
    // eslint-disable-next-line no-eval
    eval(text);
  }, []);

  return null;
};
