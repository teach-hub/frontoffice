import { IconProps, MarkGithubIcon } from '@primer/octicons-react';
import React from 'react';

type Props = IconProps;

export default (props: Props) => {
  return <MarkGithubIcon size="medium" {...props} />;
};
