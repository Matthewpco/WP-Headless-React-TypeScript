import React from 'react';
import { render } from '@testing-library/react';
import { MainMenu } from 'components/MainMenu/MainMenu/MainMenu';

describe('MainMenu component', () => {
  it('should render without crash with default props (smoke test)', () => {
    const { container } = render(<MainMenu data={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should render variant with link-only menu item', () => {
    const id = 'Test id';
    const label = 'Test title';
    const url = 'test';
    const parentId = null;
    const childItems = undefined;

    const { container } = render(
      <MainMenu data={[{ id, label, url, parentId, childItems }]} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render variant with inherit menu items', () => {
    const id = 'Test id';
    const label = 'Test title';
    const url = 'test';
    const parentId = null;
    const childItems = {
      nodes: [
        {
          id: 'test id',
          label: 'Inherit test title',
          url: 'test',
          parentId: null,
        },
      ],
    };

    const { container } = render(
      <MainMenu data={[{ id, label, url, parentId, childItems }]} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render variant with inherit menu items and subitems', () => {
    const id = 'Test id';
    const label = 'Test title';
    const url = 'test';
    const parentId = null;
    const childItems = {
      nodes: [
        {
          id: 'test id',
          label: 'Inherit test title',
          url: 'test-inner-1',
          parentId: null,
          childItems: {
            nodes: [
              {
                id: 'test id',
                label: 'Inherit sutitem test title',
                url: 'test-inner-2',
                parentId: null,
              },
            ],
          },
        },
      ],
    };

    const { container } = render(
      <MainMenu data={[{ id, label, url, parentId, childItems }]} />,
    );
    expect(container).toMatchSnapshot();
  });
});
