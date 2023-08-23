import { IconProps, RepoIcon } from '@primer/octicons-react';

type Props = IconProps;

export default (props: Props) => {
  return <RepoIcon size="medium" {...props} />;
};
