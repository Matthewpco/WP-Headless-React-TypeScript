import { WithAdBlock } from '../../ArticleScroller/WithAdBlock';

export const getInitialPostsWithAds = <T>(nodes: T[]) => {
  const newArr: WithAdBlock<T>[] = nodes?.slice() ?? [];
  newArr.splice(5, 0, { type: 'ad', id: 6 });
  return newArr;
};
