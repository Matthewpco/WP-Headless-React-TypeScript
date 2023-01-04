import React, { FC } from 'react';
import parse from 'html-react-parser';
import styles from './MainBlock.module.scss';
import { pipeAll, TransformerConfig } from '../../ArticleBody/pipeAll';
import { pipeCategoryBlock } from './pipeCategoryBlock';
import { pipeVideo } from './pipeVideo';
import { pipeQuickLinks } from './pipeQuickLinks';
import { pipeNewsletterSignupForm } from './pipeNewsletterSignupForm';
import { pipeEventBlock } from './pipeEventBlock';

interface MainBlockProp {
  data: string;
}

const config: TransformerConfig = new Map([
  ['QuickLinks__JSON', pipeQuickLinks],
  ['TaxonomyFilterSection__JSON', pipeCategoryBlock],
  ['AnyClip__JSON', pipeVideo],
  ['NewsletterSignupForm__JSON', pipeNewsletterSignupForm],
  ['EventsBlock_root', pipeEventBlock],
]);

export const MainBlock: FC<MainBlockProp> = ({ data }) => {
  const nodes = parse(data);

  if (Array.isArray(nodes)) {
    pipeAll(nodes, config);
  }

  return <div className={styles.root}>{nodes}</div>;
};
