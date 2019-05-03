<template>
  <header class="main-header">
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="javascript:;" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span class="hidden-xs">{{user.firstName}} {{user.lastName}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- The user image in the menu -->
              <li class="user-header">
                <img :src="pictureUrl" class="img-circle" alt="User Image">

                <p>
                  <small><strong>Welcome back to chazIT {{user.firstName}}!</strong></small>
                </p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <router-link to="/profile">
                    <a href="#" class="btn btn-default btn-flat">Profile</a>
                  </router-link>
                </div>
                <div class="pull-right">
                  <a href="#" @click="logout" class="btn btn-default btn-flat">Log out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <notifications></notifications>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  import { authService, eventBus } from '../../../services'
  import { EVENTS, CHAT_TYPES } from '../../../config'
  import Notifications from '../../utilities/Notifications.vue'

  export default {
    name: 'MainHeader',
    components: {
      Notifications
    },
    props: ['displayName', 'pictureUrl'],
    data () {
      return {
        ready: false,
        loading: false,
        CHAT_TYPES: CHAT_TYPES
      }
    },
    computed: {
      ...mapState({
        user: (state) => state.auth.user,
        userInfo: (state) => state.userInfo,
        conversations: (state) => state.conversations,
        notifications: (state) => state.notifications
      }),
      unreadConversationsCount () {
        return this.conversations.reduce((count, conversation) => {
          if (conversation.hasRead) {
            return count
          } else {
            return count + 1
          }
        }, 0)
      },
      unreadNotificationsCount () {
        return this.notifications.reduce((count, notification) => {
          if (notification.hasRead) {
            return count
          } else {
            return count + 1
          }
        }, 0)
      }
    },
    methods: {
      logout () {
        this.loading = true
        authService.logout()
          .then(response => {
            this.loading = false
            this.$router.push('/login')
          })
          .catch(error => {
            this.loading = false
            console.error('MainHeader.logout-error:', error)
            this.$snotify.error('Log Out failed', 'Error!')
          })
      },
      openNewGroupBox () {
        eventBus.$emit(EVENTS.OPEN_CHAT_CREATE)
      },
      openNewMessageBox () {
        eventBus.$emit(EVENTS.OPEN_CHAT, { new: true })
      },
      openChatBox (conversation) {
        eventBus.$emit(EVENTS.OPEN_CHAT, { conversation })
      },
      markConversationAsRead (conversation) {
        eventBus.$emit(EVENTS.MARK_CONVERSATION_AS_READ, conversation)
      },
      markConversationAsUnread (conversation) {
        eventBus.$emit(EVENTS.MARK_CONVERSATION_AS_UNREAD, conversation)
      },
      markAllConversationsAsRead () {
        for (let conversation of this.conversations) {
          if (!conversation.hasRead) {
            this.markConversationAsRead(conversation)
          }
        }
      },
      markNotificationAsRead (notification) {
        eventBus.$emit(EVENTS.MARK_NOTIFICATION_AS_READ, notification)
      },
      markNotificationAsUnread (notification) {
        eventBus.$emit(EVENTS.MARK_NOTIFICATION_AS_UNREAD, notification)
      },
      markAllNotificationsAsRead () {
        for (let notification of this.notifications) {
          if (!notification.hasRead) {
            this.markNotificationAsRead(notification)
          }
        }
      },
      userListTooltip (users) {
        let list = ''
        for (let user of users) {
          if (list === '') {
            list = list + user.firstName + ' ' + user.lastName
          } else {
            list = list + ', ' + user.firstName + ' ' + user.lastName
          }
        }
        return list
      },
      goToProfile (user) {
        this.$router.push({ name: 'MemberProfile', params: { _id: user._id }, props: user })
      },
    },
    mounted: function () {
    }
  }
</script>

<style lang="scss">
  .message-list-img {
    border-radius: 50%;
    width: 40px;
    float: left;
  }
  .message-list-info {
    margin-left: 45px;
  }
  .message-list-name {
    font-weight: 600;
    display: block;
  }
  .message-list-msg {
    color: #999;
  }
  .message-list-dot {
    float: right;
    .btn-box-tool {
      color: #97a0b3;
    }
    .btn-box-tool:hover {
      color: #333;
    }
  }
  .message-unread {
    background-color: #f2f5fd;
  }
  #dropdown-messages-menu {
    width: 450px;
    .footer {
      border-top: 1px solid #eeeeee;
    }
    li {
      a.message-menu-link {
        color: cornflowerblue;
        &:hover {
          text-decoration: underline;
          background-color: inherit;
        }
      }
    }
  }
  #dropdown-notifications-menu {
    width: 450px;
    .footer {
      border-top: 1px solid #eeeeee;
    }
    li {
      a.message-menu-link {
        color: cornflowerblue;
        &:hover {
          text-decoration: underline;
          background-color: inherit;
        }
      }
    }
  }
  .menu {
    li {
      border-bottom: 1px solid #eeeeee;
    }
  }
</style>