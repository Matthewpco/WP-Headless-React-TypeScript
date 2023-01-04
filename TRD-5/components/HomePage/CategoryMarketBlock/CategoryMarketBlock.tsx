import React, { FC, useState } from 'react';
import styles from './CategoryMarketBlock.module.scss';
import { TopStories } from '../../../graphql/getHomePage';
import { List } from '../../List';
import { Article } from '../HeroSection/Article';
import ArrowDropDown from '../../../assets/icons/arrowDropdoun.svg';
import { useGraphqlLazyQuery } from '../../../generic/graphql/useGraphqlLazyQuery';
import {
  RequestGetSectionHomePage,
  ResponseGetSectionHomePage,
} from '../../../graphql/getSectionHomePage';
import { IdGraphqlQuery } from '../../../generic/graphql/IdGraphqlQuery';

export interface Market {
  label: string;
  value: string;
}
export interface CategoryMarketBlockProp {
  articles: TopStories[];
  category: string;
  markets: Market[];
  id: string;
  slug: string;
}

const DropDownList = ({ label }: Market, onClick: () => void) => (
  <li key={label}>
    <div onClick={onClick}>{label}</div>
  </li>
);

export const CategoryMarketBlock: FC<CategoryMarketBlockProp> = ({
  category,
  articles,
  markets,
  id,
  slug,
}) => {
  const [data, setData] = useState<TopStories[] | undefined>();

  const [fetch] = useGraphqlLazyQuery<
    ResponseGetSectionHomePage,
    RequestGetSectionHomePage
  >(IdGraphqlQuery.getSectionHomePage);

  const [isDropdownHidden, setIsDropdownHidden] = useState(true);
  const [activeMarket, setActiveMarket] = useState('all markets');

  const onChangeMarket = (el: string) => {
    setActiveMarket(el);
    setIsDropdownHidden(true);
  };

  if (markets?.[0].value !== '') {
    markets?.unshift({ label: 'all markets', value: '' });
  }

  return (
    <div id={id} className={styles.root}>
      <div className={styles.heading}>
        <h2 className={styles.categoryTitle}>{category}</h2>
        {markets && (
          <div
            className={styles.dropDown}
            onClick={() => {
              setIsDropdownHidden(!isDropdownHidden);
            }}
          >
            <span>{activeMarket}</span>
            <ArrowDropDown />
            <ul className={styles.marketListActive} hidden={isDropdownHidden}>
              <List
                items={markets}
                render={(item) =>
                  DropDownList(item, () => {
                    onChangeMarket(item.label);
                    if (item.value === '') {
                      setData(undefined);
                    } else {
                      fetch({ market: item.value, id: slug }).then(
                        ({ data: responseData }) =>
                          setData(responseData?.sector?.posts?.nodes),
                      );
                    }
                  })
                }
              />
            </ul>
          </div>
        )}
      </div>
      {(data ? data.length : articles.length) < 6 ? (
        <div className={styles.categoryBlockRow}>
          <List
            items={data || articles}
            render={(article) => (
              <Article
                key={article.title}
                classNameRoot={styles.article}
                classNameImage={styles.img}
                classNameTitle={styles.title}
                classNameDescription={styles.description}
                classNameContainer={styles.container}
                classNameHeading={styles.articleHeading}
                article={article}
                classNameCategoryCityLabel={styles.label}
              />
            )}
          />
        </div>
      ) : (
        <div className={styles.categoryBlock}>
          <div>
            <List
              items={data ? data.slice(0, 3) : articles.slice(0, 3)}
              render={(article, index) => (
                <Article
                  key={article.title}
                  classNameRoot={!index ? styles.bigArticle : styles.article}
                  classNameImage={styles.img}
                  classNameTitle={styles.title}
                  classNameDescription={styles.description}
                  classNameContainer={styles.container}
                  classNameHeading={styles.articleHeading}
                  article={article}
                  classNameCategoryCityLabel={styles.label}
                  squareImg={!!index}
                />
              )}
            />
          </div>
          <div className={styles.rightBlock}>
            <List
              items={data ? data.slice(3, 6) : articles.slice(3, 6)}
              render={(article, index) => (
                <Article
                  key={article.title}
                  classNameRoot={
                    index === 2 ? styles.bigArticle : styles.article
                  }
                  classNameImage={styles.img}
                  classNameTitle={styles.title}
                  classNameDescription={styles.description}
                  classNameContainer={styles.container}
                  article={article}
                  classNameCategoryCityLabel={styles.label}
                  squareImg={index !== 2}
                />
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};
