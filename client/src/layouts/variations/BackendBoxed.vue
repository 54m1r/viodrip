<template>
  <base-layout :layout-classes="layoutClasses">
    <!-- Header Content -->
    <!-- Using the available v-slot, we can override the default Header content from layouts/partials/Header.vue -->
    <template #header>
      <!-- Header Content -->
      <div class="content-header">
        <!-- Left Section -->
        <div class="d-flex align-items-center">
          <!-- Logo -->
          <router-link to="/" class="font-w600 text-dual mr-3">
            <!--<i class="fa fa-circle-notch text-primary"></i>--><span class="font-w700 font-size-h5 ml-1">VioDrip</span>
          </router-link>
          <!-- END Logo -->

          <!-- Notifications Dropdown -->
          <b-dropdown size="sm" variant="dual" class="d-inline-block mr-2" menu-class="dropdown-menu-lg p-0 border-0 font-size-sm" no-caret>
            <template #button-content>
              <i class="si si-bell"></i>
              <span class="badge badge-primary badge-pill">{{ notifications.length || '' }}</span>
            </template>
            <li>
              <div class="p-2 bg-primary text-center">
                <h5 class="dropdown-header text-uppercase text-white">Benachrichtigungen</h5>
              </div>
              <ul class="nav-items mb-0">
                <li v-for="(notification, index) in notifications" :key="`notification-${index}`">
                  <a class="text-dark media py-2" :href="`${notification.href}`">
                    <div class="mr-2 ml-3">
                      <i :class="`${notification.icon}`"></i>
                    </div>
                    <div class="media-body pr-2">
                      <div class="font-w600">{{ notification.title }}</div>
                      <small class="text-muted">{{ notification.time }}</small>
                    </div>
                  </a>
                </li>
                <li v-if="!notifications.length" class="p-2">
                  <b-alert variant="warning" class="text-center m-0" show>
                    <p class="mb-0">
                      Du hast keine neuen Benachrichtigungen
                    </p>
                  </b-alert>
                </li>
              </ul>
              <div v-if="notifications.length" class="p-2 border-top">
                <b-button size="sm" variant="light" class="text-center" block href="javascript:void(0)">
                  <i class="fa fa-fw fa-arrow-down mr-1"></i> Load More..
                </b-button>
              </div>
            </li>
          </b-dropdown>
          <!-- END Notifications Dropdown -->
        </div>
        <!-- END Left Section -->

        <!-- Right Section -->
        <div class="d-flex align-items-center">
          <!-- Open Search Section (visible on smaller screens) -->

          <!--<b-button size="sm" variant="alt-info" disabled class="mr-2">
            <i class="fa fa-fw fa-users mr-1"></i>  <animated-number
            :value="user.money"
            :formatValue="formatMoney"
            :duration="1000"
          />
          </b-button> -->

          <b-button v-if="isLoggedIn" size="sm" variant="success" class="mr-2">
            <i class="fa fa-fw fa-plus mr-1"></i> Geld Aufladen
          </b-button>

          <b-button v-if="isLoggedIn" size="sm" disabled variant="alt-success">
            <animated-number
            :value="user.money"
            :formatValue="formatMoney"
            :duration="1500"
          /></b-button>
          <!-- User Dropdown -->
          <b-dropdown v-if="isLoggedIn" size="sm" variant="dual" class="d-inline-block ml-2" menu-class="p-0 border-0 font-size-sm" right no-caret>
            <template #button-content>
              <img class="rounded" :src="user.avatar" alt="Header Avatar" style="width: 18px;">
              <span class="d-none d-sm-inline-block ml-1">{{ user.username }}</span>
              <i class="fa fa-fw fa-angle-down d-none d-sm-inline-block"></i>
            </template>
            <li>
              <div class="p-3 text-center bg-primary">
                <img class="img-avatar img-avatar48 img-avatar-thumb" :src="user.avatar" alt="Avatar">
              </div>
              <div class="p-2">
                <h5 class="dropdown-header text-uppercase">Benutzer Menu</h5>
                <router-link class="dropdown-item d-flex align-items-center justify-content-between" to="/backend/pages/generic/profile">
                  <span>Statistiken</span>
                  <i class="si si-graph ml-1"></i>
                </router-link>
                <a class="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                  <span>Einstellungen</span>
                  <i class="si si-settings"></i>
                </a>
                <div role="separator" class="dropdown-divider"></div>
                <h5 class="dropdown-header text-uppercase">Aktionen</h5>
                <a class="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)" @click.prevent="logoutUser">
                  <span>Abmelden</span>
                  <i class="si si-logout ml-1"></i>
                </a>
              </div>
            </li>
          </b-dropdown>

          <router-link v-if="!isLoggedIn" to="/register">
            <b-button class="mr-2" variant="primary">Registrieren</b-button>
          </router-link>
          <router-link v-if="!isLoggedIn" to="/login">
            <b-button variant="primary">Anmelden</b-button>
          </router-link>
          <!-- END User Dropdown -->
        </div>
        <!-- END Right Section -->
      </div>
      <!-- END Header Content -->

      <!-- Header Loader -->
      <div id="page-header-loader" class="overlay-header bg-primary-lighter" :class="{ 'show': $store.state.settings.headerLoader }">
        <div class="content-header">
          <div class="w-100 text-center">
            <i class="fa fa-fw fa-circle-notch fa-spin text-primary"></i>
          </div>
        </div>
      </div>
      <!-- END Header Loader -->
    </template>
    <!-- END Header Content -->

    <!-- Navigation -->
    <template #content>
      <div class="bg-white">
        <div class="content py-3">
          <!-- Toggle Navigation -->
          <div class="d-lg-none">
            <!-- Class Toggle, functionality initialized in directives/toggle-class.js -->
            <b-button variant="alt-secondary" block class="d-flex justify-content-between align-items-center" v-toggle-class="{ targetId: 'horizontal-navigation', class: 'd-none' }">
              Menu
              <i class="fa fa-bars"></i>
            </b-button>
          </div>
          <!-- END Toggle Navigation -->

          <!-- Navigation -->
          <div id="horizontal-navigation" class="d-none d-lg-block mt-2 mt-lg-0">
            <base-navigation :nodes="navigation" horizontal horizontal-hover></base-navigation>
          </div>
          <!-- END Navigation -->
        </div>
      </div>
    </template>
    <!-- END Navigation -->
  </base-layout>
</template>

<script>
import BaseLayout from '../Base'

import AnimatedNumber from "animated-number-vue";

import menuList from '@/data/menu'
import { mapGetters, mapActions } from "vuex";


export default {
  name: 'LayoutBackend',
  components: {
    BaseLayout,
    AnimatedNumber
  },
  data () {
    return {
      value: 300,
      // Override and set custom CSS classes to the container of each base layout element
      layoutClasses: {
        sideOverlay: '',
        sidebar: '',
        header: '',
        footer: ''
      },
      navigation: menuList.demo,
      baseSearchTerm: '',
      notifications: [
        {
          href: 'javascript:void(0)',
          icon: 'fa fa-fw fa-check-circle text-success',
          title: 'You have a new follower',
          time: '15 min ago'
        },
        {
          href: 'javascript:void(0)',
          icon: 'fa fa-fw fa-plus-circle text-info',
          title: '1 new sale, keep it up',
          time: '22 min ago'
        },
        {
          href: 'javascript:void(0)',
          icon: 'fa fa-fw fa-times-circle text-danger',
          title: 'Update failed, restart server',
          time: '15 min ago'
        },
        {
          href: 'javascript:void(0)',
          icon: 'fa fa-fw fa-plus-circle text-info',
          title: '2 new sales, keep it up',
          time: '33 min ago'
        },
        {
          href: 'javascript:void(0)',
          icon: 'fa fa-fw fa-user-plus text-success',
          title: 'You have a new subscriber',
          time: '41 min ago'
        },
        {
          href: 'javascript:void(0)',
          icon: 'fa fa-fw fa-check-circle text-success',
          title: 'You have a new follower',
          time: '42 min ago'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      isLoggedIn: "isLoggedIn",
    })
  },
  methods: {
    ...mapActions(["signOut", "logout", "getProfile"]),
    logoutUser() {
      this.logout();
    },
    formatMoney(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(value).replace(',', '.');
    },
  },
  mounted () {
    document.addEventListener('keydown', this.eventHeaderSearch);
    this.getProfile();
  },
  destroyed () {
    document.removeEventListener('keydown', this.eventHeaderSearch)
  },
  created () {

    // Set default elements for this layout
    this.$store.commit('setLayout', {
      header: true,
      sidebar: false,
      sideOverlay: false,
      footer: true
    })

    // Set various template options
    this.$store.commit('headerStyle', { mode: 'dark'})
    this.$store.commit('mainContent', { mode: 'narrow'})
  },
}
</script>
