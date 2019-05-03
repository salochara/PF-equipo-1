<template>
  <section class="content dashboard">
    <div class="row">
      <div class="container">
        <box :classes="['box-danger']"
             :disableFooter="false" :headerBorder="true" :noPadding="false">
          <div slot="header">
            <h3 class="box-title">Available Services</h3>
          </div>
          <span slot="box-tools">
        </span>
          <div slot="body">
            <ul class="users-list clearfix">
              <li v-for="category in categories">
                <img :src="'/static/img/chasit/' + category.IconResource + '-home@3x.png'" alt="User Image">
                <router-link tag="li"  :to="'/categories/' + category.Id">
                  <a class="users-list-name" href="#"> {{category.Title}}</a>
                </router-link>

              </li>
            </ul>
          </div>
          <div v-if="statsLoading" class="overlay">
            <i class="fa"><pulse-loader></pulse-loader></i>
          </div>
        </box>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-xs-6">
      </div>
    </div>
  </section>
</template>

<script>
  import faker from 'faker'
  import { mapState } from 'vuex'
  import { chasitService } from '../../../services'
  export default {
    name: 'Dashboard',
    data () {
      return {
        statsLoading: true,
        categories: {},
      }
    },
    computed: {
      ...mapState({
        user: (state) => state.auth.user,
        userInfo: (state) => state.userInfo,
        conversations: (state) => state.conversations,
        notifications: (state) => state.notifications
      }),
    },
    methods: {
      getYeloCategories (user) {
        this.statsLoading = true
        console.log(user)
        chasitService.getChazItService(user.azureToken)
          .then((result) => {
            this.statsLoading = false
            this.categories = result.data
            console.log(result)
          })
          .catch((error) => {
            this.statsLoading = false
            console.error(error)
            this.$snotify.error('Failed Getting Categories from Azure', 'Error!')
          })
      }
    },
    created () {
      this.getYeloCategories(this.user)
    }
  }
</script>

<style lang="scss">
  .dashboard {
    .users-list {
      & > li img {
        height: 128px;
      }
    }
    .info-box {
      cursor: pointer;
    }
    .info-box-content {
      text-align: center;
      vertical-align: middle;
      display: inherit;
    }
    .fullCanvas {
      width: 100%;
    }
    .pad canvas {
      border: 0px;
    }

    .chart-responsive {
      canvas {
        border: 0px;
      }
      padding-bottom: 10px;
    }

    .small-box.visitor-box {
      height: 375px;
      margin-bottom: 0px;
      .inner {
        padding-top: 100px;
      }
      .icon {
        position: static;
      }
    }
  }
</style>
