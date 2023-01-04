import React from 'react';
import { TestimonialsSlider } from './TestimonialsSlider';

export interface TestimonialsItem {
  testimonial: string;
  name: string;
  company: string;
}

export interface TestimonialsData {
  title: string;
  testimonials: TestimonialsItem[];
}

// Changes the reference array
export const pipeTestimonialsSlider = (nodes: JSX.Element[], index: number) => {
  if (index > -1) {
    const node = nodes[index];

    try {
      const data: TestimonialsData = JSON.parse(
        node.props?.children,
      );

      nodes.splice(
        index,
        1,
        <TestimonialsSlider
          key={`testimonials_${index}`}
          title={data?.title}
          testimonials={data?.testimonials}
        />,
      );
    } catch {
      nodes.splice(index, 1, <div key={`error_${index}`} />);
    }
  }
};
