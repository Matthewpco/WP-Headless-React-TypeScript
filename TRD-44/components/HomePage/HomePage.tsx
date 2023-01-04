import React, { FC } from 'react';
import { Container } from '../Container';
import { MarketHeading } from '../MarketPage/MarketHeading/MarketHeading';
import { HeaderDropdownMenuItem } from '../../graphql';
import { HeroSection } from './HeroSection/HeroSection';
import { MainBlock } from './MainBlock/MainBlock';
import { HomePageProps } from '../../graphql/getHomePage';

import { SeoHeadTags } from '../SeoHeadTags';
import { AdUnitFooter } from '../Ad/units/AdUnitFooter';

export interface IProps {
  marketMenu: HeaderDropdownMenuItem[];
  homePage: HomePageProps;
}

export const HomePage: FC<IProps> = ({ marketMenu, homePage }) => (
  <Container>
    <SeoHeadTags seo={homePage?.page?.seo} />

    <MarketHeading
      menuItems={marketMenu}
      showSelectedMarket={false}
      isTabSelected
      latestStories={homePage?.latestStoriesLink}
    />
    <HeroSection
      topStories={homePage?.topStories}
      mostViewed={homePage?.mostViewed}
    />
    <MainBlock data={homePage?.page?.contentFiltered} />
    <AdUnitFooter />
  </Container>
);
