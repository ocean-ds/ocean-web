import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentList from '../ContentList';

describe('ContentList size', () => {
  test('md (default) keeps the original markup without size hooks', () => {
    render(
      <ContentList title="Title" description="Description" caption="Caption" />
    );

    expect(document.querySelector('.ods-content-list')).toBeInTheDocument();
    expect(document.querySelector('.ods-content-list--sm')).toBeNull();
    expect(
      document.querySelector('.ods-content-list__text')
    ).not.toBeInTheDocument();
  });

  test('sm not inverted: title 14 (description) and description 12 (caption)', () => {
    render(
      <ContentList
        size="sm"
        title="Title"
        description="Description"
        caption="Caption"
      />
    );

    expect(screen.getByText('Title')).toHaveClass(
      'ods-typography__description',
      'ods-content-list__emphasis',
      'ods-content-list__emphasis--default'
    );
    expect(screen.getByText('Description')).toHaveClass(
      'ods-typography__caption',
      'ods-content-list__support'
    );
    expect(screen.getByText('Caption')).toHaveClass(
      'ods-typography__captionbold'
    );
    expect(screen.getByText('Caption')).not.toHaveClass(
      'ods-typography__paragraph--inactive'
    );
  });

  test('sm inverted: title captionBold 12 and description 14 with the type', () => {
    render(
      <ContentList
        size="sm"
        inverted
        type="positive"
        title="Title"
        description="Description"
      />
    );

    expect(screen.getByText('Title')).toHaveClass(
      'ods-typography__captionbold',
      'ods-content-list__support'
    );
    expect(screen.getByText('Description')).toHaveClass(
      'ods-typography__description',
      'ods-content-list__emphasis--positive'
    );
  });

  test('sm highlight-lead uses paragraph 16', () => {
    render(<ContentList size="sm" type="highlight-lead" title="Title" />);

    expect(screen.getByText('Title')).toHaveClass(
      'ods-typography__paragraph',
      'ods-content-list__emphasis--highlight-lead'
    );
  });

  test('sm inactive marks support and caption as inactive', () => {
    render(
      <ContentList
        size="sm"
        type="inactive"
        title="Title"
        description="Description"
        caption="Caption"
      />
    );

    expect(screen.getByText('Description')).toHaveClass(
      'ods-content-list__support--inactive'
    );
    expect(screen.getByText('Caption')).toHaveClass(
      'ods-typography__paragraph--inactive'
    );
  });

  test('sm strikethrough renders the struck text on the title when not inverted', () => {
    render(
      <ContentList
        size="sm"
        type="strikethrough"
        title="Grátis"
        strikethroughDescription="3,99%"
        description="Description"
      />
    );

    const struck = screen.getByText('3,99%');
    expect(struck).toHaveClass('ods-typography__paragraph--strikethrough-text');
    expect(struck.parentElement).toHaveTextContent('3,99%Grátis');
  });

  test('sm strikethrough renders the struck text on the description when inverted', () => {
    render(
      <ContentList
        size="sm"
        inverted
        type="strikethrough"
        title="Title"
        strikethroughDescription="3,99%"
        description="Grátis"
      />
    );

    expect(screen.getByText('3,99%').parentElement).toHaveTextContent(
      '3,99%Grátis'
    );
  });

  test('sm does not render the struck text for other types', () => {
    render(
      <ContentList size="sm" title="Title" strikethroughDescription="3,99%" />
    );

    expect(screen.queryByText('3,99%')).not.toBeInTheDocument();
  });

  test('sm stacks the indicator above or below', () => {
    const { rerender } = render(
      <ContentList
        size="sm"
        title="Title"
        indicator={<span>Tag</span>}
        indicatorPosition="above"
      />
    );

    expect(document.querySelector('.ods-content-list')?.firstChild).toHaveClass(
      'ods-content-list__indicator--above'
    );

    rerender(
      <ContentList
        size="sm"
        title="Title"
        indicator={<span>Tag</span>}
        indicatorPosition="below"
      />
    );

    expect(document.querySelector('.ods-content-list')?.lastChild).toHaveClass(
      'ods-content-list__indicator--below'
    );
  });
});

describe('ContentList md strikethrough', () => {
  test('md not inverted renders the struck text on the title', () => {
    render(
      <ContentList
        type="strikethrough"
        title="Grátis"
        strikethroughDescription="3,99%"
      />
    );

    expect(screen.getByText('3,99%').parentElement).toHaveTextContent(
      '3,99%Grátis'
    );
  });

  test('md inverted renders the struck text on the description', () => {
    render(
      <ContentList
        inverted
        type="strikethrough"
        title="Title"
        description="Grátis"
        strikethroughDescription="3,99%"
      />
    );

    expect(screen.getByText('3,99%').parentElement).toHaveTextContent(
      '3,99%Grátis'
    );
  });
});
