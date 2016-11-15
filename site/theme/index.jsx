module.exports = {
  home: '/',
  sitename: 'One',
  routes: [
    {
      path: '/',
      component: './template/Layout/index',
      indexRoute: { component: './template/Home/index' },
      childRoutes: [{
        path: 'components/:component',
        component: './template/Content/index'
      },
      {
        path: 'docs/pattern/:child',
        component: './template/Content/index'
      }]
    }
  ]
};
