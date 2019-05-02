<template>
  <section class="content dashboard">

    <!-- Main row -->
    <div class="row">
      <!-- Left col -->
      <div class="container">
        <!-- USERS LIST -->
        <box :classes="['box-danger']"
             :disableFooter="false" :headerBorder="true" :noPadding="false">
          <div slot="header">
            <h3 class="box-title">Service Providers</h3>
          </div>
          <!-- /box-header -->

          <span slot="box-tools">
          <!--<span class="label label-danger">8 New Members</span>-->
        </span>
          <!-- /box-tools -->

          <div slot="body">
            <ul class="users-list clearfix">
              <li v-for="user in newMembers">
                <img :src="user.profileImageUrl" alt="User Image">
                <router-link :to="'/members/' + user._id">
                  <a class="users-list-name" href="#">{{ getName(user) }}</a>
                </router-link>

                <span class="users-list-date">{{user.createdAt |  moment("D MMM")}}</span>
              </li>
            </ul>
            <!-- /.users-list -->
          </div>
          <!-- /.overlay -->
        </box>
        <!-- /USERS LIST -->
        <!-- /.row -->
      </div>
      <!-- /.col -->

    </div>
    <!-- /.row -->

    <div class="row">


      <div class="col-lg-4 col-xs-6">
      </div>
      <!-- /.col -->

    </div>
    <!-- /.row -->
    <!-- /.row -->

  </section>
</template>

<script>
  import faker from 'faker'

  import VisitorMap from '../../utilities/VisitorMap.vue'

  import { statsService } from '../../../services'

  export default {
    name: 'Dashboard',
    components: {
      VisitorMap
    },
    data () {
      return {
        newMembers: {},
        client: null,
        stats: {},
        statsLoading: true
      }
    },
    computed: {
    },
    methods: {
      avatar () { return faker.image.avatar() },
      getName (user) {
        if (user._id === this.$store.state.auth.user._id) {
          return 'You'
        } else {
          return user.firstName + ' ' + user.lastName
        }
      },
      getNewMembers () {
        this.newMembersLoading = true
        this.$userRepository.list({ $sort: ['-createdAt'], $limit: 8 })
          .then(result => {
            this.newMembersLoading = false
            this.newMembers = result.data.docs
          })
          .catch((error) => {
            this.newMembersLoading = false
            console.error('Dashboard.getNewMembers-error:', error)
            this.$snotify.error('Get new members failed', 'Error!')
          })
      },
      getDashboardStats () {
        this.statsLoading = true
        statsService.getDashboardStats()
          .then(result => {
            this.stats = result
            this.createPieChart()
            this.statsLoading = false
          })
          .catch((error) => {
            this.statsLoading = false
            console.error('Dashboard.getDashboardStats-error:', error)
            this.$snotify.error('Get stats failed', 'Error!')
          })
      },
      createPieChart () {
        // -------------
        // - PIE CHART -
        // -------------
        // Get context with jQuery - using jQuery's .get() method.
        let browsers = []
        let visitors = []
        for (let browser in this.stats.totalVisitorsPerBrowser) {
          browsers.push(browser)
          visitors.push(this.stats.totalVisitorsPerBrowser[browser])
        }

        var pieChartCanvas = $('#pieChart');

        let data = {
          datasets: [{
            data: visitors,
//            backgroundColor: color
            backgroundColor: [
              '#f56954',
              '#00a65a',
              '#f39c12',
              '#00c0ef',
              '#3c8dbc',
              '#d2d6de'
            ],
          }],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: browsers
        }

        new Chart(pieChartCanvas, { // eslint-disable-line no-new
          type: 'doughnut',
          data: data
        });
        // -----------------
        // - END PIE CHART -
        // -----------------
      }
    },
    created () {
      this.getNewMembers()
    },
    mounted () {
//      $('.sparkbar').each(function () {
//        var $this = $(this)
//        $this.sparkline('html', {
//          type    : 'bar',
//          height  : $this.data('height') ? $this.data('height') : '30',
//          barColor: $this.data('color')
//        })
//      })
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
