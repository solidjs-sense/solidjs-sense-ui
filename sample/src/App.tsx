import { Component, lazy } from 'solid-js';
import { useLoading, useRoutes, Router, RouteDefinition } from 'solidjs-sense-router';
import './App.module.scss';
import { Nav } from './components/nav';
import { bases } from './constant';

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(async () => import('./pages/home')),
  },
  {
    path: '/usage',
    component: lazy(() => import('./pages/usage')),
    children: [
      {
        path: '/dialog',
        component: lazy(() => import('./pages/usage/dialog')),
      },
      {
        path: '/color-picker',
        component: lazy(() => import('./pages/usage/color-picker')),
      },
    ],
  },
];

const App: Component = () => {
  const Routes = useRoutes(routes);
  const loading = useLoading();

  return (
    <div class="app">
      <Nav />
      <div
        class="loading"
        classList={{
          start: loading(),
          done: !loading(),
        }}
      ></div>
      <Routes />
    </div>
  );
};

export default () => {
  const url = new URL(window.location.href);
  const currentBase =
    bases.find((p) => url.pathname.startsWith(p)) ||
    ((navigator.language || navigator.languages[0]).startsWith('zh') ? bases[0] : bases[1]);

  if (/\/solidjs-sense-ui\/?$/.test(url.pathname)) {
    history.replaceState(history.state, document.title, currentBase);
  }

  return (
    <Router defaultBase={currentBase}>
      <App />
    </Router>
  );
};
