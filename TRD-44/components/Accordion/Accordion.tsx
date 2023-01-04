import React, { FC, useState } from 'react';
import cx from 'classnames';
import AngleUp from '../../assets/icons/angle-up.svg';
import AngleDown from '../../assets/icons/angle-down.svg';
import styles from './Accordion.module.scss';

interface AccordionProps {
  className?: string;
  data: {
    title: string;
    content: string;
  }[];
}

export const Accordion: FC<AccordionProps> = ({
  className,
  data,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className={cx(className, styles.accordionWrapper)}>
      {
        data.map((item, index) => (
          <button
            key={item.title}
            className={styles.accordionItem}
            onClick={() => setSelectedIndex(index === selectedIndex ? -1 : index)}
          >
            <div className={styles.title}>
              {item.title}
              { index === selectedIndex && <AngleUp width={15} height={9} /> }
              { index !== selectedIndex && <AngleDown width={15} height={9} /> }
            </div>
            {
              index === selectedIndex && (
                <div className={styles.content}>
                  {item?.content}
                </div>
              )
            }
          </button>
        ))
      }
    </div>
  );
};
