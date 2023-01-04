import React from 'react';
import { NewsletterSmall } from '../Newsletter';

interface NewsletterData {
  list: string;
  title: string;
  message: string;
  cta: string;
  place: string;
  success: string;
  error: string;
  lists: string[];
}

// Changes the reference array
export const pipeNewsletterShort = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: NewsletterData = JSON.parse(node.props?.children);

      nodes.splice(
        index,
        1,
        <NewsletterSmall
          key={`newsletter_${index}`}
          place={data.place}
          market={data.list}
          marketTitle=""
          title={data.title}
          message={data.message}
          cta={data.cta}
          success={data.success}
          error={data.error}
          isClosable
        />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
