import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ToggleSwitchTypeRender} from './SwitchType/toggle'
import {SingleSwitchTypeRender} from './SwitchType/single'

export const BASE_CLASS = 'sui-AtomSwitch'

export const SIZES = {
  DEFAULT: 'default',
  LARGE: 'large'
}

export const TYPES = {
  TOGGLE: 'toggle',
  SELECT: 'select',
  SINGLE: 'single'
}

const SUPPORTED_KEYS = [' ', 'Enter', 'Spacebar']

class AtomSwitch extends Component {
  state = {
    isToggle: this.props.initialValue,
    isFocus: false
  }

  _onKeyDown = event => {
    if (this.props.disabled === true) return

    if (SUPPORTED_KEYS.includes(event.key)) {
      this._onToggle()
      event.preventDefault()
    }
  }

  _onToggle = forceValue => {
    const {isToggle: stateToggle} = this.state
    const {onToggle} = this.props
    const isToggle = forceValue !== undefined ? forceValue : !stateToggle
    this.setState({isToggle}, () => onToggle(isToggle))
  }

  _onBlur = () => {
    this.setState({isFocus: false})
  }
  _onFocus = () => {
    this.setState({isFocus: true})
  }

  render() {
    const {isToggle, isFocus} = this.state

    const commonProps = {
      ...this.props,
      isFocus,
      isToggle,
      onBlur: this._onBlur,
      onFocus: this._onFocus,
      onKeyDown: this._onKeyDown,
      onToggle: this._onToggle
    }

    return this.props.type === TYPES.SINGLE ? (
      <SingleSwitchTypeRender {...commonProps} />
    ) : (
      <ToggleSwitchTypeRender {...commonProps} />
    )
  }
}

AtomSwitch.displayName = 'AtomSwitch'

AtomSwitch.propTypes = {
  /**
   * Wheter switch is checked on init
   */
  initialValue: PropTypes.bool,
  /**
   * Size of switch: 'default', 'large'
   */
  size: PropTypes.oneOf([SIZES.DEFAULT, SIZES.LARGE]),
  /**
   * Type of switch: 'toggle' (default), 'select', 'single'
   */
  type: PropTypes.oneOf([TYPES.TOGGLE, TYPES.SELECT, TYPES.SINGLE]),
  /**
   * Is Input disabled?
   */
  disabled: PropTypes.bool,
  /**
   * Left label to be printed
   */
  labelLeft: PropTypes.string,
  /**
   * Right label to be printed
   */
  labelRight: PropTypes.string,
  /**
   * Form element name
   */
  name: PropTypes.string.isRequired,
  /**
   * The label itself. Proxy from label
   */
  label: PropTypes.string.isRequired,
  /**
   * The optional label text. Proxy from label
   */
  labelOptionalText: PropTypes.string,
  /**
   * Callback to be called when switch. Flag whenever switch is active or not sent
   */
  onToggle: PropTypes.func.isRequired
}

AtomSwitch.defaultProps = {
  disabled: false,
  initialValue: false,
  labelLeft: 'Off',
  labelRight: 'On',
  size: SIZES.DEFAULT,
  type: TYPES.TOGGLE
}

export default AtomSwitch