import React, { FC, useEffect } from 'react';

export interface JotFormProps {
  id: string;
}

const style = {
  minWidth: '100%',
  border: 'none',
};

export const JotForm: FC<JotFormProps> = ({ id }) => {
  // THIS CODE IS PROVIDED BY JOTFORM
  useEffect(() => {
    const iframeElement = document.getElementById(
      `JotFormIFrame-${id}`,
    ) as HTMLIFrameElement;

    if (iframeElement) {
      let { src } = iframeElement;
      let iframeParams: string[] = [];

      if (window.location.href && window.location.href.indexOf('?') > -1) {
        iframeParams = iframeParams.concat(
          window.location.href
            .substr(window.location.href.indexOf('?') + 1)
            .split('&'),
        );
      }
      if (src && src.indexOf('?') > -1) {
        iframeParams = iframeParams.concat(
          src.substr(src.indexOf('?') + 1).split('&'),
        );
        src = src.substr(0, src.indexOf('?'));
      }
      iframeParams.push('isIframeEmbed=1');
      iframeElement.src = `${src}?${iframeParams.join('&')}`;
    }

    const isPermitted = (originUrl: string, whitelisted_domains: string[]) => {
      const url = document.createElement('a');
      url.href = originUrl;
      const { hostname } = url;
      let result = false;
      if (typeof hostname !== 'undefined') {
        whitelisted_domains.forEach((element) => {
          if (
            hostname.slice(-1 * element.length - 1) === '.'.concat(element) ||
            hostname === element
          ) {
            result = true;
          }
        });
      }
      return result;
    };

    const handleIFrameMessage = (e: any) => {
      if (typeof e.data === 'object') {
        return;
      }
      const args = e.data.split(':');
      let iframe: HTMLIFrameElement;

      if (args.length > 2) {
        iframe = document.getElementById(
          `JotFormIFrame-${args[args.length - 1]}`,
        ) as HTMLIFrameElement;
      } else {
        iframe = document.getElementById('JotFormIFrame') as HTMLIFrameElement;
      }
      if (!iframe) {
        return;
      }

      switch (args[0]) {
        case 'scrollIntoView':
          iframe.scrollIntoView();
          break;
        case 'setHeight':
          iframe.style.height = `${args[1]}px`;
          break;
        case 'collapseErrorPage':
          if (iframe.clientHeight > window.innerHeight) {
            iframe.style.height = `${window.innerHeight}px`;
          }
          break;
        case 'reloadPage':
          window.location.reload();
          break;
        case 'loadScript': {
          if (!isPermitted(e.origin, ['jotform.com', 'jotform.pro'])) {
            break;
          }
          const script = document.createElement('script');
          script.src = args.length > 3 ? `${args[1]}:${args[2]}` : args[1];
          script.type = 'text/javascript';
          document.body.appendChild(script);
          break;
        }
        default:
          break;
      }

      const isJotForm = e.origin.indexOf('jotform') > -1;

      if (
        isJotForm &&
        'contentWindow' in iframe &&
        'postMessage' in (iframe as any).contentWindow
      ) {
        const urls = {
          docurl: encodeURIComponent(document.URL),
          referrer: encodeURIComponent(document.referrer),
        };
        (iframe as any).contentWindow.postMessage(
          JSON.stringify({ type: 'urls', value: urls }),
          '*',
        );
      }
    };

    if (window.addEventListener) {
      window.addEventListener('message', handleIFrameMessage, false);
    }
  }, [id]);

  return (
    <iframe
      id={`JotFormIFrame-${id}`}
      title="Form"
      onLoad={() => window.parent.scrollTo(0, 0)}
      allowFullScreen
      allow="geolocation; microphone; camera"
      src={`https://form.jotform.com/${id}`}
      frameBorder="0"
      style={style}
      scrolling="no"
    />
  );
};
