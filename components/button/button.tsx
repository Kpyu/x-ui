import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Col } from 'antd';
type ButtonType = 'primary' | 'ghost' | 'dashed'
type ButtonShape = 'circle' | 'circle-outline'
type ButtonSize = 'small' | 'large'

export interface ButtonProps {
  type?: ButtonType;
  htmlType?: string;
  icon?: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  onClick?: React.FormEventHandler;
  onMouseUp?: React.FormEventHandler;
  loading?: boolean;
  disabled?: boolean; 
  style?: React.CSSProperties;
  prefixCls?: string;
}
export default class Button extends React.Component<ButtonProps, any>{
  static Group: any;
  static defaultProps = {
    prefixCls: 'ant-btn',
    onClick() { },
    loading: false,
  };
  static propTypes = {
    type: React.PropTypes.string,
    shape: React.PropTypes.oneOf(['circle', 'circle-outline']),
    size: React.PropTypes.oneOf(['large', 'default', 'small']),
    htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: React.PropTypes.func,
    loading: React.PropTypes.bool,
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
  };
  constructor(props) {
    super(props);
  }
  handleClick = (e) => {
    const btnNode = findDOMNode(this);
    this.props.onClick(e);
  }
  handleMouseUp = (e) => {
    (findDOMNode(this) as HTMLElement).blur();
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  }
  render() {
      const props = this.props;
      return (
        <Col>
        <button 
        type='button'
        className='className'
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
          >
      按钮    
      </button></Col>
      )
  }
}