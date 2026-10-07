import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentList from '../ContentList';

describe('ContentList', () => {
  describe('Basic Rendering', () => {
    test('renders the title', () => {
      render(<ContentList title="Test Title" />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders description and caption when provided', () => {
      render(
        <ContentList
          title="Title"
          description="Description"
          caption="Caption"
        />
      );

      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Caption')).toBeInTheDocument();
    });

    test('does not render description or caption when omitted', () => {
      render(<ContentList title="Title" />);

      const content = screen.getByText('Title').closest('.ods-content-list');

      expect(content?.children).toHaveLength(1);
    });
  });

  describe('indicator slot', () => {
    const indicator = <span data-testid="indicator">Tag</span>;

    test('does not render the indicator when position is not provided', () => {
      render(<ContentList title="Title" indicator={indicator} />);

      const content = screen.getByText('Title').closest('.ods-content-list');

      expect(screen.queryByTestId('indicator')).not.toBeInTheDocument();
      expect(content?.children).toHaveLength(1);
    });

    test('does not render a wrapper when position is set without indicator', () => {
      render(<ContentList title="Title" indicatorPosition="above" />);

      const content = screen.getByText('Title').closest('.ods-content-list');

      expect(content?.children).toHaveLength(1);
    });

    test('renders the indicator as the first child when position is above', () => {
      render(
        <ContentList
          title="Title"
          description="Description"
          caption="Caption"
          indicator={indicator}
          indicatorPosition="above"
        />
      );

      const content = screen
        .getByText('Title')
        .closest('.ods-content-list') as HTMLElement;
      const wrapper = content.firstElementChild as HTMLElement;

      expect(wrapper).toHaveClass('ods-content-list__indicator');
      expect(wrapper).toHaveClass('ods-content-list__indicator--above');
      expect(wrapper).toContainElement(screen.getByTestId('indicator'));
    });

    test('renders the indicator as the last child when position is below', () => {
      render(
        <ContentList
          title="Title"
          description="Description"
          caption="Caption"
          indicator={indicator}
          indicatorPosition="below"
        />
      );

      const content = screen
        .getByText('Title')
        .closest('.ods-content-list') as HTMLElement;
      const wrapper = content.lastElementChild as HTMLElement;

      expect(wrapper).toHaveClass('ods-content-list__indicator');
      expect(wrapper).toHaveClass('ods-content-list__indicator--below');
      expect(wrapper).toContainElement(screen.getByTestId('indicator'));
    });

    test('keeps title, description and caption in order around the indicator', () => {
      render(
        <ContentList
          title="Title"
          description="Description"
          caption="Caption"
          indicator={indicator}
          indicatorPosition="above"
        />
      );

      const content = screen
        .getByText('Title')
        .closest('.ods-content-list') as HTMLElement;
      const texts = Array.from(content.children).map((child) =>
        child.textContent?.trim()
      );

      expect(texts).toEqual(['Tag', 'Title', 'Description', 'Caption']);
    });
  });
});
