import { GitPullRequestIcon, IconProps } from '@primer/octicons-react';
import React from 'react';

type Props = IconProps;

export default (props: Props) => {
  return <GitPullRequestIcon size="medium" {...props} />;
};
