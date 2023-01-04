import { WithAdBlock } from '../../ArticleScroller/WithAdBlock';

export const getMorePostsWithAds = <T>(nodes: T[], currentLength: number) => {
  const newArr: WithAdBlock<T>[] = nodes?.slice() ?? [];

  if (newArr.length) {
    newArr.splice(5, 0, { type: 'ad', id: currentLength + 5 });
    newArr.splice(0, 0, { type: 'ad', id: currentLength });
  }

  return newArr;
};
