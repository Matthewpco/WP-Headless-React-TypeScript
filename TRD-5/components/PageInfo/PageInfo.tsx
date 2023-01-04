import React, { FC } from 'react';
import { useRouter } from 'next/router';
import styles from './PageInfo.module.scss';
import { IPageInfo } from './IPageInfo';
import { Link } from '../Link';

export interface PageInfoProps {
  pageInfo: IPageInfo;
}

export const PageInfo: FC<PageInfoProps> = ({ pageInfo }) => {
  const router = useRouter();

  const currentPath = router.asPath;
  const currentPage = parseInt((router.query.pageNumber as string) || '1', 10);
  const currentPageString = `/page/${currentPage}`;
  const pathIncludesPage = currentPath.includes(currentPageString);

  const prevLink = pathIncludesPage
    ? currentPath.replace(currentPageString, `/page/${currentPage - 1}`)
    : `${currentPath}/page/${currentPage - 1}`;
  const nextLink = pathIncludesPage
    ? currentPath.replace(currentPageString, `/page/${currentPage + 1}`)
    : `${currentPath}/page/${currentPage + 1}`;

  return (
    <nav className={styles.root}>
      {pageInfo?.hasPreviousPage && <Link href={prevLink}>Previous page</Link>}
      {pageInfo?.hasNextPage && <Link href={nextLink}>Next page</Link>}
    </nav>
  );
};
