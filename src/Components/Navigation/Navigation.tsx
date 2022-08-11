import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import { categoryNames } from '../../utils';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const Navigation: FC<Props> = ({ className = '' }) => {
  const location = useLocation();

  return (
    <nav className={classNames('navigation', className)}>
      <ul className="navigation__list">
        {['index', 'fashion', 'technologies', 'sport', 'karpov'].map((item) => {
          return (
            <li className="navigation__item" key={item}>
              <NavLink
                to={`/${item}`}
                activeClassName="navigation__link--active"
                className="navigation__link"
                isActive={(match) => {
                  if (match) {
                    return true;
                  }

                  return item === 'index' && location.pathname === '/';
                }}
              >
                {categoryNames[item]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
