import React, { FC, useCallback } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Index,
  InfiniteLoader,
  List,
  ListRowRenderer,
  WindowScroller,
} from 'react-virtualized';
import ResizeObserver from 'rc-resize-observer';
import { InfiniteLoaderProps } from 'react-virtualized/dist/es/InfiniteLoader';
import { isAd, WithAdBlock } from './WithAdBlock';
import styles from '../Ad/Ad.module.scss';
import { AdUnit } from '../Ad/units/AdUnit';
import { adSizes } from '../Ad/config/adSizes';
import { useContextAds } from '../Ad/ContextAds';

export interface ArticleScrollerBaseComponentProps<T> {
  article: T;
}

const styleAutoSizer = {
  height: '100%',
};

export interface ArticleScrollerProps<T extends WithAdBlock<{}>>
  extends Pick<InfiniteLoaderProps, 'loadMoreRows'> {
  posts: WithAdBlock<T>[];
  component: FC<ArticleScrollerBaseComponentProps<T>>;
  fullWidth?: boolean;
}

const cache = new CellMeasurerCache({
  defaultHeight: 160,
  fixedWidth: true,
});

export const ArticleScroller = <T extends {}>({
  loadMoreRows,
  posts,
  component: Component,
  fullWidth = false,
}: ArticleScrollerProps<T>) => {
  const { device } = useContextAds();

  const isRowLoaded = useCallback(
    ({ index }: Index) => !!posts[index],
    [posts],
  );

  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, parent, style }) => (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        rowIndex={index}
        key={key}
        parent={parent}
      >
        {({ measure }) => {
          const post = posts[index];

          return (
            <div style={style} key={key}>
              {post && (
                <ResizeObserver onResize={measure}>
                  {isAd(post) ? (
                    <div className={styles.root}>
                      <AdUnit
                        id={`div-id-for-mid-${post.id}`}
                        className="trd-ad trd-ad-center"
                        size={
                          fullWidth && device === 'desktop'
                            ? adSizes.mid.desktopFull
                            : adSizes.mid[device]
                        }
                        destroyOnUnmount={false}
                      />
                    </div>
                  ) : (
                    <div>
                      <Component article={post} />
                    </div>
                  )}
                </ResizeObserver>
              )}
            </div>
          );
        }}
      </CellMeasurer>
    ),
    [posts],
  );

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={Infinity}
    >
      {({ onRowsRendered }) => (
        <WindowScroller>
          {({ height, registerChild, scrollTop }) => (
            <AutoSizer style={styleAutoSizer}>
              {({ width }) => (
                <div ref={(el) => registerChild(el)}>
                  <List
                    ref={registerChild}
                    width={width}
                    height={height}
                    autoHeight
                    rowCount={posts.length}
                    overscanRowCount={posts.length + 10}
                    deferredMeasurementCache={cache}
                    rowHeight={cache.rowHeight}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                  />
                </div>
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  );
};
