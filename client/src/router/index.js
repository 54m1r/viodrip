/*
 * Default Router
 */

// Vue and Vue Router
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

// Main layouts
//import LayoutBackend from '@/layouts/variations/Backend.vue'
import LayoutBackendBoxed from '@/layouts/variations/BackendBoxed.vue'
import LayoutSimple from '@/layouts/variations/Simple.vue'

// Register Vue Router
Vue.use(Router)

// Backend: General
const Dashboard = () => import(/* webpackChunkName: "pages-dashboard", webpackPrefetch: true */"@/views/Dashboard.vue")

//const GameRoulette = () => import("@/views/games/Roulette.vue");

// Games
const GameBets = () => import("@/views/games/Bets.vue");
const GameRoulette = () => import("@/views/games/Roulette.vue");
//const GameCrash = () => import("@/views/games/Crash.vue");

// Administration
const AdminBets = () => import("@/views/admin/AdminBets")

//Transactions
const Transaction = () => import("@/views/transaction/index.vue");
const TransactionCharge = () => import("@/views/transaction/Charge.vue");
const TransactionAbsolve = () => import("@/views/transaction/Absolve.vue");


// Pages: Auth
const AuthSignIn = () => import(/* webpackChunkName: "auth-signin" */"@/views/pages/auth/SignIn.vue")
const AuthSignUp = () => import(/* webpackChunkName: "auth-signup" */"@/views/pages/auth/SignUp.vue")

// Pages: Errors
const Errors404 = () => import("@/views/pages/errors/404.vue")

let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: '',
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      redirect: 'bets',
      component: LayoutSimple,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: AuthSignIn,
          meta: {
            guest: true
          }
        },
        {
          path: 'register',
          name: 'Register',
          component: AuthSignUp,
          meta: {
            guest: true
          }
        },
      ],
    },
    {
      path: '/',
      component: LayoutBackendBoxed,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'bets',
          name: 'Sportwetten',
          component: GameBets,
        },
        /*{
          path: 'crash',
          name: 'Crash',
          component: GameCrash
        }, */
        {
          path: 'roulette',
          name: 'Roulette',
          component: GameRoulette
        },
      ]
    },
    {
      path: '/transactions',
      component: LayoutBackendBoxed,
      children: [
        {
          path: '/',
          name: 'transactions',
          component: Transaction,
        },
        {
          path: 'pending',
          name: 'pending_transactions',
          component: Transaction,
          props: {
            pending: true,
          }
        },
        {
          path: 'completed',
          name: 'completed_transactions',
          component: Transaction,
          props: {
            completed: true,
          }
        },
        {
          path: 'charge',
          name: 'charge_transactions',
          component: TransactionCharge,
        },
        {
          path: 'absolve',
          name: 'absolve_transactions',
          component: TransactionAbsolve,
        },
      ]
    },
    {
      path: '/administration',
      redirect: '/administration/bets',
      component: LayoutBackendBoxed,
      children: [
        {
          path: 'bets',
          name: 'admin_bets',
          component: AdminBets,
        },
      ]
    },
    {
      path: '*',
      name: 'Error 404',
      component: Errors404
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/');
    } else {
      next();
    }
  } else {
    next()
  }
});

// Router Configuration
export default router
