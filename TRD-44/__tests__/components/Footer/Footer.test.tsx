import * as React from 'react';
import { render } from '@testing-library/react';
import { Footer } from 'components/Footer/Footer';
import { SocialLinkItem } from 'graphql';
import { IdSharable } from 'components/SocialLinks';

describe('Footer component', () => {
  it('should render', () => {
    const { container } = render(
      <Footer
        items={[]}
        socialItems={[]}
        addressText=""
        copyrightText=""
        phoneText=""
        footerRef={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should have footer texts', () => {
    const addressText = 'Address Text';
    const copyrightText = 'Copyright Text';
    const phoneText = '000000000';

    const { container } = render(
      <Footer
        items={[]}
        socialItems={[]}
        addressText={addressText}
        copyrightText={copyrightText}
        phoneText={phoneText}
        footerRef={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should have footer links', () => {
    const addressText = '';
    const copyrightText = '';
    const phoneText = '';
    const items = [
      {
        id: '0',
        label: 'Home',
        target: '_blank',
        url: '#',
      },
    ];
    const itemsMobile = [
      {
        id: '0',
        label: 'Home Mobile',
        target: '_blank',
        url: '#',
      },
    ];

    const socialItems: SocialLinkItem[] = [
      {
        icon: IdSharable.facebook,
        url: '#',
      },
    ];

    const { container } = render(
      <Footer
        items={items}
        itemsMobile={itemsMobile}
        socialItems={socialItems}
        addressText={addressText}
        copyrightText={copyrightText}
        phoneText={phoneText}
        footerRef={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
