import React from 'react';
import ContentList from '../../../packages/ocean-react/src/_shared/components/ContentList';
import AmountDetails from '../../../packages/ocean-react/src/_shared/components/AmountDetails';
import type {
  ContentListAmountProps,
  ContentListDefaultProps,
} from '../../../packages/ocean-react/src/_shared/components/TransactionListParts';

/*
 * The two blocks shown on their own (stories and docs of Content List Default and Content
 * List Amount). They render the same internal blocks the Transaction List items use; the
 * blocks are not exported by @useblu/ocean-react, only their prop types.
 */

export const ContentListDefault = ({
  title,
  description,
  caption,
  strikethroughDescription,
  inverted = true,
  status = 'default',
  size = 'md',
}: ContentListDefaultProps): React.ReactElement => (
  <div className="odoc-block odoc-block--content">
    <ContentList
      title={title}
      description={description}
      caption={caption}
      strikethroughDescription={strikethroughDescription}
      inverted={inverted}
      type={status}
      size={size}
    />
  </div>
);
ContentListDefault.displayName = 'ContentListDefault';

export const ContentListAmount = ({
  value,
  type = 'default',
  strikethroughValue,
  tag,
  info,
  size = 'md',
}: ContentListAmountProps): React.ReactElement => (
  <div className="odoc-block odoc-block--amount">
    <AmountDetails
      amount={value}
      type={type}
      size={size}
      strikethroughAmount={strikethroughValue}
      tag={tag}
      additionalData={info}
      showAdditionalData={Boolean(info)}
    />
  </div>
);
ContentListAmount.displayName = 'ContentListAmount';
