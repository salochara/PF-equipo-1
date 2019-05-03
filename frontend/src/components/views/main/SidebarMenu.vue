<template>
  <ul class="sidebar-menu" data-widget="tree">
    <div class="sidebar-menu" v-permission.if="[USER_ROLES.ADMIN]">
      <li class="header">chazIT Admin</li>
      <router-link tag="li" class="pageLink" to="/users" v-permission.enable="['user', 'readUser']">
        <a>
          <i class="fa fa-user"></i>
          <span class="page">Users</span>
        </a>
      </router-link>
    </div>

    <div class="sidebar-menu">
      <li class="header">chazIT</li>
      <router-link tag="li" class="pageLink" to="/">
        <a>
          <i class="fa fa-home"></i>
          <span class="page">Home</span>
        </a>
      </router-link>
    </div>


    <li class="header">chazIT Account</li>
    <router-link tag="li" class="pageLink" to="/userservices">
      <a>
        <i class="fa fa-wrench"></i>
        <span class="page">Active Services</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/profile">
      <a>
        <i class="fa fa-user-o"></i>
        <span class="page">User Account</span>
      </a>
    </router-link>
  </ul>
</template>

<script>
  import { USER_ROLES, EVENTS } from '../../../config'
  import { eventBus } from '../../../services'
  export default {
    name: 'SidebarName',
    data () {
      return {
        role: '',
        USER_ROLES: USER_ROLES
      }
    },
    methods: {
      openNewMessageBox () {
        eventBus.$emit(EVENTS.OPEN_CHAT, { new: true })
      }
    },
    created () {
      this.user = this.$store.state.auth.user
      this.role = this.$store.state.auth.user.roleName.toUpperCase()
    },
  }
</script>

<style lang="scss">
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  /*.sidebar-menu {*/
    /*div {*/
      /*li {*/
        /*a {*/
          /*padding: 12px 15px 12px 15px;*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>