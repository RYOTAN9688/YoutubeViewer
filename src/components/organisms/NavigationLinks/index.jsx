import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../../atoms/Typography';

const LinkText = styled(Typography).attrs({
  size: 's',
  color: 'gray',
  align: 'center',
  display: 'inline-block',
})`
  margin: 0 10px;
`;

const links = [{
  pathRegExp: /^\/$/,
  path: '/',
  text: 'TOP',
}, {
  pathRegExp: /^\/favorites/,
  path: '/favorites',
  text: 'お気に入り',
}];

// プレゼンテーショナル・コンポーネントでは、currentPathで現在のURLパスを受けとり、各リンクに描画する
export const NavigationLinksPresenter = ({ className, currentPath }) => (
  <div className={className}>
    {links.map(({ pathRegExp, path, text }) => {
      const isCurrentPath = pathRegExp.test(currentPath);
      const Text = <LinkText underline={!isCurrentPath}>{text}</LinkText>;
      return (
        <React.Fragment key={path}>
          {isCurrentPath ? Text : <Link to={path}>{text}</Link>}
        </React.Fragment>
      );
    })}
  </div>
);

NavigationLinksPresenter.propTypes = {
  className: PropTypes.string,
  currentPath: PropTypes.string,
};

NavigationLinksPresenter.defaultProps = {
  className: '',
  currentPath: '',
};

const NavigationLinkContainer = ({ className, presenter }) => {
  // useLocationを使って現在のURLのパスを取得
  const { pathname } = useLocation();
  return presenter({
    className,
    currentPath: pathname,
  });
};

NavigationLinkContainer.propTypes = {
  className: PropTypes.string,
  presenter: PropTypes.func.isRequired,
};

NavigationLinkContainer.defaultProps = {
  className: '',
};

export default (props) => (
  <NavigationLinkContainer
    presenter={NavigationLinksPresenter}
    {...props}
  />
);
