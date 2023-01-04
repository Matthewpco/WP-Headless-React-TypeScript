import React, { FC, useEffect, useState, useContext } from 'react';
import { ContextTheme } from '../../generic/theme/ContextTheme';
import { IdTheme } from '../../generic/theme/IdTheme';

export interface HubSpotProps {
  id: string;
  region: string;
  portalId: string;
  formId: string;
  sectionId?: string;
}

export const HubSpot: FC<HubSpotProps> = ({
  id,
  region,
  portalId,
  formId,
  sectionId,
}) => {
  const [isFormReady, setIsFormReady] = useState(false);
  const [isStylesAdded, setIsStylesAdded] = useState(false);
  const { theme } = useContext(ContextTheme);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/shell.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      const hbspt = (window as any)?.hbspt;

      hbspt?.forms.create({
        region,
        portalId,
        formId,
        target: `#${id}`,
      });
    });

    const handler = (event: MessageEvent) => {
      if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
        setIsFormReady(true);
      }
    };

    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (isFormReady && !isStylesAdded) {
      const iframe = document.querySelector<HTMLIFrameElement>('.hs-form-iframe');
      const iframeDocument = iframe?.contentWindow?.document;
      const styleElement = document.createElement('style');
      styleElement.innerHTML = 'body.dark label {color: white !important}';
      iframeDocument?.head?.appendChild(styleElement);
      setIsStylesAdded(true);
    }
  }, [isFormReady, isStylesAdded]);

  useEffect(() => {
    if (isFormReady) {
      const iframe = document.querySelector<HTMLIFrameElement>('.hs-form-iframe');
      const iframeDocument = iframe?.contentWindow?.document;
      if (IdTheme.Dark === theme) {
        iframeDocument?.body?.classList.add('dark');
      } else {
        iframeDocument?.body?.classList.remove('dark');
      }
    }
  }, [theme, isFormReady]);

  return (
    <div className="HubSpot" id={sectionId}>
      <div id={id} />
    </div>
  );
};
