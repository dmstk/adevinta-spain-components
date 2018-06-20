import React from 'react'
import cx from 'classnames'
import AtomLabel from '@s-ui/react-atom-label'
import {prefixClass, workClassNames} from './helpers'
import PropTypes from 'prop-types'

export const ToggleSwitchTypeRender = ({
  disabled,
  isFocus,
  isToggle,
  label,
  labelLeft,
  labelOptionalText,
  labelRight,
  name,
  onBlur,
  onFocus,
  onKeyDown,
  onToggle,
  size,
  type
}) => {
  return (
    <div
      className={workClassNames(
        size,
        type,
        'toggleType',
        isToggle,
        isFocus,
        disabled
      )}
    >
      <AtomLabel name={name} text={label} optionalText={labelOptionalText} />
      <div
        className={cx(prefixClass('container'))}
        tabIndex="0"
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <span
          className={cx(prefixClass('text'), prefixClass('left'))}
          onClick={() => onToggle(false)}
        >
          {labelLeft}
        </span>
        <div
          className={cx(prefixClass('inputContainer'))}
          onClick={() => onToggle()}
        >
          <div
            className={cx(prefixClass('circle'), {
              'sui-AtomSwitch--toggle': isToggle
            })}
          />
        </div>
        <span
          className={cx(prefixClass('text'), prefixClass('right'))}
          onClick={() => onToggle(true)}
        >
          {labelRight}
        </span>
      </div>
    </div>
  )
}

ToggleSwitchTypeRender.displayName = 'ToggleSwitchTypeRender'

ToggleSwitchTypeRender.propTypes = {
  /**
   * Form element name
   */
  name: PropTypes.string,
  /**
   * The label itself. Proxy from label
   */
  label: PropTypes.string,
  /**
   * The optional label text. Proxy from label
   */
  labelOptionalText: PropTypes.string,
  /**
   * Left label to be printed
   */
  labelLeft: PropTypes.string,
  /**
   * Right label to be printed
   */
  labelRight: PropTypes.string,
  /**
   * Size of switch: 'default', 'large'
   */
  size: PropTypes.oneOf(['default', 'large']),
  /**
   * Type of switch: 'toggle' (default), 'select', 'single'
   */
  type: PropTypes.oneOf(['toggle', 'select', 'single']),
  /**
   * Is Input disabled?
   */
  disabled: PropTypes.bool,
  /**
   * Is component toggle
   */
  isToggle: PropTypes.bool,
  /**
   * Is component focus
   */
  isFocus: PropTypes.bool,
  /**
   * Callback on focus element
   */
  onFocus: PropTypes.func,
  /**
   * Callback on blur element
   */
  onBlur: PropTypes.func,
  /**
   * Callback on toggle element
   */
  onToggle: PropTypes.func,
  /**
   * Callback on keydown on the switch
   */
  onKeyDown: PropTypes.func
}