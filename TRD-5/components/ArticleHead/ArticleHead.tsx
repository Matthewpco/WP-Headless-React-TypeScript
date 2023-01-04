import React, { FC } from 'react';
import Head from 'next/head';
import { SeoFullHead } from '../../graphql';
import { SeoHeadTags } from '../SeoHeadTags';

export interface ArticleHeadProps {
  seo: SeoFullHead;
}

export const ArticleHead: FC<ArticleHeadProps> = ({
  children,
  seo,
}) => (
  <>
    <SeoHeadTags seo={seo} />
    <Head>
      {children}
    </Head>
  </>
);
