import classNames from 'classnames/bind'

type Styles = Record<string, string>

export const cb = (styles: Styles) => classNames.bind(styles)
