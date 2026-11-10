/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import FilterBar from '../FilterBar';

test('renders on the server with the desktop Segmented Control', () => {
  // SegmentedControl warns about useLayoutEffect on the server; the markup is still complete.
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
  const view = renderToString(
    <FilterBar
      filters={[{ label: 'Paid' }]}
      segmentedControl={{
        options: [{ label: 'Store', count: 3 }, { label: 'Network' }],
        selectedIndex: 0,
        onChange: () => undefined,
      }}
    />
  );

  expect(view).toContain('ods-filter-bar');
  expect(view).toContain('ods-segmented-control__count');
});
