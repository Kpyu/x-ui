import * as React from 'react';

const prefix = 'ant-btn-group-';

type ButtonSize = 'small' | 'large'

interface ButtonGroupProps {
  size?: ButtonSize;
  style?: React.CSSProperties;
  className?: string;
}

export default function ButtonGroup(props: ButtonGroupProps) {
  // large => lg
  // small => sm
  const classes = '';

  return <div  className={classes} />;
}
