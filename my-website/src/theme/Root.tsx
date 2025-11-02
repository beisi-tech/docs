import React from 'react';
import {useLocation} from '@docusaurus/router';
import ChatWidget from '../components/ChatWidget/chatwidget';

export default function Root({children}) {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname.endsWith('/index.html');

  return (
    <>
      {children}
      {!isHome && <ChatWidget />}
    </>
  );
}
