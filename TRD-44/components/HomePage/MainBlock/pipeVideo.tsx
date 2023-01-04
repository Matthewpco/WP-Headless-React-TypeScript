import React from 'react';
import { VideoBlock, VideoData } from '../VideoBlock/VideoBlock';
import { AdUnitHomePage } from '../../Ad/units/AdUnitHomePage';
import { LazyComponent } from '../../LazyComponent/LazyComponent';

// Changes the reference array
export const pipeVideo = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: VideoData = JSON.parse(node.props?.children);
      nodes.splice(
        index,
        1,
        <LazyComponent key={`VideoBlock_${index}`}>
          <AdUnitHomePage id={`video-${index}`} />
          <VideoBlock
            section_id={data.section_id}
            ar={data.ar}
            plid={data.plid}
            pubname={data.pubname}
            src={data.src}
            widgetname={data.widgetname}
          />
        </LazyComponent>,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
