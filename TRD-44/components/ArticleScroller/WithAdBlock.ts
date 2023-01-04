export interface AdBlock {
  type: 'ad';
  id?: number;
}

export type WithAdBlock<T extends {}> = AdBlock | T;

export const isAd = (post: WithAdBlock<any>): post is AdBlock => 'type' in post;
