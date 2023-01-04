import { AdSize } from '../units/AdUnit';
export type AdSizes = {
  [key: string]: {
    [key: string]: AdSize;
  };
};
export const adSizes: AdSizes = {
  top: {
    desktop: [
      [970, 250],
      [970, 90],
      [728, 90],
    ],
    tablet: [[728, 90]],
    mobile: [
      [320, 100],
      [320, 50],
    ],
  },
  right: {
    desktop: [
      [300, 600],
      [300, 250],
    ],
    tablet: [[300, 250]],
    mobile: [
      [320, 100],
      [300, 250],
      [320, 50],
      [300, 252],
    ],
  },
  mid: {
    desktopFull: [
      [970, 250],
      [970, 251],
      [970, 90],
      [970, 91],
      [728, 90],
      [728, 91],
    ],
    desktop: [
      [728, 90],
      [728, 91],
      [300, 250],
      [600, 300],
    ],
    tablet: [
      [728, 90],
      [300, 250],
    ],
    mobile: [
      [320, 100],
      [300, 250],
      [320, 50],
      [300, 252],
    ],
  },
  home: {
    desktopFull: [
      [970, 250],
      [970, 251],
      [970, 90],
      [970, 91],
      [728, 90],
      [728, 91],
    ],
    desktop: [
      [728, 90],
      [728, 91],
      [300, 250],
      [970, 250],
      [600, 300],
      [1920, 400],
    ],
    tablet: [
      [728, 90],
      [300, 250],
    ],
    mobile: [
      [320, 100],
      [300, 250],
      [320, 50],
      [300, 252],
    ],
  },
  news: {
    desktopFull: [
      [970, 250],
      [728, 90],
      [600, 300],
      [1920, 400],
    ],
    desktop: [
      [970, 250],
      [728, 90],
      [600, 300],
      [1920, 400],
    ],
    tablet: [
      [728, 90],
      [300, 250],
    ],
    mobile: [
      [320, 100],
      [300, 250],
      [320, 50],
      [300, 252],
    ],
  },
  bottom: {
    desktop: [
      [970, 250],
      [970, 251],
      [970, 90],
      [970, 91],
      [728, 90],
      [728, 91],
    ],
    tablet: [
      [728, 90],
      [300, 250],
    ],
    mobile: [
      [320, 100],
      [320, 50],
    ],
  },
  footer: {
    desktop: [
      [970, 250],
      [970, 251],
      [970, 90],
      [970, 91],
      [728, 90],
      [728, 91],
    ],
    tablet: [
      [728, 90],
      [300, 250],
    ],
    mobile: [
      [320, 100],
      [320, 50],
    ],
  },
  pushdown: {
    desktop: [[1, 1]],
    tablet: [[1, 1]],
    mobile: [[1, 1]],
  },
  sponsored: {
    desktop: 'fluid',
    tablet: 'fluid',
    mobile: 'fluid',
  },
  outstream: {
    desktop: 'OutOfPage',
    tablet: 'OutOfPage',
    mobile: 'OutOfPage',
  },
};