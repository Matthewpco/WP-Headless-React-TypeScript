import React, { FC } from 'react';
import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

const Document: FC<DocumentProps> = () => (
  <Html lang="en">
    <Head />
    <body>
      <div id="fb-root" />
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
