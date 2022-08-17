import React, { FC, useEffect } from 'react';
import { applyScheme, getSystemScheme } from '../../colorSchemeUtils';
import classNames from 'classnames';
import './ColorSchemeSwitcher.css';

type ColorSchemeSwitcherValues = 'auto' | 'dark' | 'light';

export const ColorSchemeSwitcher: FC = () => {
  const [userScheme, setUserScheme] = React.useState<ColorSchemeSwitcherValues>('auto');

  useEffect(() => {
    if (userScheme === 'auto') {
      applyScheme(getSystemScheme());
    } else {
      applyScheme(userScheme);
    }
  }, [userScheme]);

  return (
    <select
      className={classNames('color-scheme-switcher')}
      onChange={(evt) => setUserScheme(evt.target.value as ColorSchemeSwitcherValues)}
      value={userScheme}
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="auto">Auto</option>
    </select>
  );
};
