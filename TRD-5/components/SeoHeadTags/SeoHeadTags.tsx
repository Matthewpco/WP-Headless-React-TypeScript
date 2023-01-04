import parse from 'html-react-parser';
import Head from 'next/head';
import React, { FC } from 'react';
import { SeoFullHead } from '../../graphql';

export interface SeoHeadTagsProps {
  seo: SeoFullHead;
}

export const SeoHeadTags: FC<SeoHeadTagsProps> = ({ seo }) => {
  const fullHeadElements = parse(seo?.fullHead ?? '');

  return (
    <Head>
      <title>{seo?.title ?? ''}</title>
      {fullHeadElements}
    </Head>
  );
};
