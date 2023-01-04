import React, { FunctionComponent, useContext } from 'react';
import cx from 'classnames';
import parse from 'html-react-parser';
import styles from './ArticleBodyBase.module.scss';
import stylesReadMore from './ArticleBodyReadMore.module.scss';
import stylesBlockquote from './ArticleBodyBlockquote.module.scss';
import stylesIssues from './ArticleBodyIssues.module.scss';
import { ContextFontSize, mapFontSizeClassName } from '../FontSize';
import { pipeNewsletterShort } from './pipeNewsletterShort';
import { pipeAll, TransformerConfig } from './pipeAll';
import { pipeAdvertiser } from '../BrandStudio/Advertiser/pipeAdvertiser';
import { pipeImageCarousel } from '../ImageCarousel/pipeImageCarousel';
import { pipeCounterSection } from '../BrandStudio/Counter/pipeCounterSection';
import { pipeHubSpot } from '../HubSpot/pipeHubSpot';
import { pipeBrandStudioForm } from '../BrandStudio/Form/pipeBrandStudioForm';
import { pipeInstaPhotos } from '../PageEvents/Insta/pipeInstaPhotos';
import { pipeTestimonialsSlider } from '../PageEvents/Testimonials/pipeTestimonialsSlider';
import { pipeAnyclipPage } from '../AnyclipContainer/pipeAnyclipPage';
import { pipeScript } from '../Script/pipeScript';

export type ArticleBodyProps = {
  className?: string;
  content: string;
  insertComponent?: (nodes: JSX.Element[]) => void;
  as?: any;
};

const config: TransformerConfig = new Map([
  ['NewsletterShort__JSON', pipeNewsletterShort],
  ['CounterSection__JSON', pipeCounterSection],
  ['NinjaForms__JSON', pipeBrandStudioForm],
  ['postsByAdvertiserBlock__JSON', pipeAdvertiser],
  ['trd-gallery', pipeImageCarousel],
  ['HubSpot__JSON', pipeHubSpot],
  // ['Script__JSON', pipeJotForm],
  ['Script__JSON', pipeScript],
  ['InstagramMedia__JSON', pipeInstaPhotos],
  ['TestimonialsSlider__JSON', pipeTestimonialsSlider],
  ['AnyClipPage__JSON', pipeAnyclipPage],
]);

export const ArticleBody: FunctionComponent<ArticleBodyProps> =
  React.memo<ArticleBodyProps>(
    ({ className, content, insertComponent, as: Component = 'div' }) => {
      const { size: fontSize } = useContext(ContextFontSize);
      const fontSizeClassName = mapFontSizeClassName.get(fontSize);

      const parsed = parse(content);
      const nodes =
        typeof parsed === 'string' || Array.isArray(parsed) ? parsed : [parsed];

      if (Array.isArray(nodes)) {
        pipeAll(nodes, config);

        if (insertComponent) {
          insertComponent(nodes);
        }
      }

      return (
        <Component
          id="the-content"
          className={cx(
            'the-content',
            className,
            styles.root,
            stylesReadMore.root,
            stylesBlockquote.root,
            stylesIssues.root,
            fontSizeClassName,
          )}
        >
          {nodes}
        </Component>
      );
    },
  );
