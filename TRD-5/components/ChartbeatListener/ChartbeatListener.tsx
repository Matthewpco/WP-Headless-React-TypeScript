import React, { FC, useEffect } from 'react';
import { ResponseGetChartbeat } from '../../graphql';

// we need this to add possibility to extend window by new property.
declare const window: any;

export type ChartbeatListenerProps = {
  uid: string;
  useCanonical: boolean;
  useCanonicalDomain: boolean;
  sections?: string;
  authors?: string;
  chartbeat: ResponseGetChartbeat;
  isArticlePage: boolean;
};

export const ChartbeatListener: FC<ChartbeatListenerProps> =
  React.memo<ChartbeatListenerProps>(
    ({
      uid,
      useCanonical,
      useCanonicalDomain,
      isArticlePage,
      chartbeat = {
        chartbeat: {
          sections: '',
          authors: '',
          title: '',
          type: 'Landing Page',
        },
      },
    }) => {
      const { sections, authors, title, type } = chartbeat.chartbeat;

      useEffect(() => {
        /* eslint-disable no-underscore-dangle */
        window._sf_async_config = {};
        window._sf_async_config.uid = uid;
        window._sf_async_config.domain = window.location.host;
        window._sf_async_config.useCanonical = useCanonical;
        window._sf_async_config.useCanonicalDomain = useCanonicalDomain;
        window._sf_async_config.sections = sections;
        window._sf_async_config.authors = authors;
        window._sf_async_config.type = type;
        if (title) {
          window._sf_async_config.title = title;
        }
        /* eslint-enable no-underscore-dangle */

        if (window?.trd?.user_type) {
          let _cbq = (window._cbq = window._cbq || []);
          _cbq.push(['_acct', window.trd.user_type]);
        }

        const e = document.createElement('script');
        const n = document.getElementsByTagName('script')[0];
        e.type = 'text/javascript';
        e.async = true;
        e.src = '//static.chartbeat.com/js/chartbeat.js';
        n.parentNode?.insertBefore(e, n);
      }, []);

      useEffect(() => {
        const pSUPERFLY = window?.pSUPERFLY || {};

        if (Object.keys(pSUPERFLY).length !== 0) {
          window._sf_async_config.type = type;

          pSUPERFLY.virtualPage({
            sections: isArticlePage ? sections : '',
            authors: isArticlePage ? authors : '',
            path: window.location.pathname,
            title: title ? title : '',
            type: type,
          });
        }
      }, [chartbeat?.chartbeat?.post_id, sections, authors, title, type]);

      return null;
    },
  );
