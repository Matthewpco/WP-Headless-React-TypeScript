import React, { FC } from 'react';
import { ScriptData } from './pipeScript';
import { CustomScriptText } from './CustomScriptText';
import { CustomScriptLink } from './CustomScriptLink';

export interface CustomScriptProps extends Pick<ScriptData, 'type'> {
  id: string;
  link: ScriptData['script_link'];
  text: ScriptData['script_text'];
}

export const CustomScript: FC<CustomScriptProps> = ({
  id,
  type,
  link,
  text,
}) => {
  if (type === 'text') {
    return <CustomScriptText id={id} text={text!} />;
  }

  return <CustomScriptLink id={id} link={link!} />;
};
