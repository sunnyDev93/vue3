import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', redirect: '/home' },
    {
      path: '/',
      name: 'Home',
      component: () => import('../layouts/default.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'My Search',
          component: () => import('../pages/home.vue'),
        },
        {
          path: 'my-search',
          name: 'Search Results',
          component: () => import ('../pages/my-search/index.vue'),
          children: [
            {
              path: ':id/:targetType/:treeName?/:strid?/:strName?',
              name: 'Categories',
              component: () => import ('../pages/my-search/categories.vue'),
              props: true,
            },
            {
              path: 'products-list/:categoryId/:groupName/:carId',
              name: 'Product List',
              component: () => import ('../pages/my-search/products-list.vue'),
              props: true,
            },
            {
              path: 'product-details/:id/:artNumber/:supId',
              name: 'Product Details',
              component: () => import ('../pages/my-search/product-details.vue'),
              props: true,
            },
            {
              path: 'cart-page',
              name: 'Cart Page',
              component: () => import ('../pages/my-search/cart-pgae.vue'),
              props: true,
            },
          ],
          props: true,

        },

        // {
        //   path: 'my-search/search-list/:categoryId/:groupName/:carId',
        //   name: 'Search List',
        //   component: () => import('../pages/my-search/search-list.vue'),
        //   props: true,
        // },
        // {
        //   path: 'my-search/parts-categories/:id/:targetType/:category?',
        //   name: 'Parts Categories',
        //   component: () => import('../pages/my-search/parts-categories.vue'),
        //   props: true,
        // },
        // {
        //   path: 'my-search/:id/:artNumber/:supId',
        //   name: 'My Search Details',
        //   component: () => import('../pages/my-search/search-product.vue'),
        //   props: true,
        // },

        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
