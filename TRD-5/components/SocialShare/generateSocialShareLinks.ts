import { SocialLinksItem } from '../SocialLinks/SocialLinks';
import { IdSharable } from '../SocialLinks';
import { SocialShareProps } from './SocialShareProps';

export const generateSocialShareLinks = ({
  sharedUrl,
  sharedTitle,
  shortVersion,
}: Pick<
  SocialShareProps,
  'sharedUrl' | 'sharedTitle' | 'shortVersion'
>): SocialLinksItem[] => {
  const items: SocialLinksItem[] = shortVersion
    ? []
    : [
        {
          icon: IdSharable.facebook,
          url: `https://www.facebook.com/sharer.php?u=${sharedUrl}`,
        },
        {
          icon: IdSharable.twitter,
          url: `https://twitter.com/intent/tweet?url=${sharedUrl}&text=${sharedTitle}`,
        },
        {
          icon: IdSharable.linkedin,
          url: `https://www.linkedin.com/shareArticle?mini=true&url=${sharedUrl}`,
        },
        {
          icon: IdSharable.newsletter,
          url: `mailto:?subject=${sharedTitle}&body=${sharedUrl}`,
        },
      ];

  if (typeof navigator !== 'undefined') {
    if (typeof navigator.share !== 'undefined') {
      const itemShare: SocialLinksItem = {
        icon: IdSharable.share,
        onClick: () => navigator.share({ url: sharedUrl }),
      };

      items.push(itemShare);
    } else if (typeof navigator.clipboard !== 'undefined') {
      const itemShare: SocialLinksItem = {
        icon: IdSharable.share,
        onClick: () => navigator.clipboard.writeText(sharedUrl),
        successTooltipText: 'Link copied',
      };

      items.push(itemShare);
    }
  }

  return items;
};
