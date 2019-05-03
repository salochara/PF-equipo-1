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
            <h3 class="box-title">Available Services</h3>
          </div>
          <!-- /box-header -->

          <span slot="box-tools">
          <!--<span class="label label-danger">8 New Members</span>-->
        </span>
          <!-- /box-tools -->
          <!-- Category list -->
          <div slot="body">
            <ul class="users-list clearfix">
              <li v-for="category in categories">
                <img :src="'/static/img/chasit/' + category.IconResource + '-home@3x.png'" alt="User Image">
                <router-link tag="li"  :to="'/categories/' + category.Id">
                  <a class="users-list-name" href="#"> {{category.Title}}</a>
                </router-link>

              </li>
            </ul>
            <!-- /.Category list -->
            <!-- /.users-list -->
          </div>
          <div v-if="loading" class="overlay">
            <i class="fa"><pulse-loader></pulse-loader></i>
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

  import { chasitService, userService, statsService } from '../../../services'

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
        statsLoading: true,
        categories: {},
        cards: {}
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
      getYeloCities () {
        this.loading = true
        userService.chazitTest()
          .then((result) => {
            this.loading = false
            this.categories = result.data
            console.log(result)
          })
          .catch((error) => {
            this.loading = false
            console.error(error)
            this.$snotify.error('Failed Getting Categories from Azure', 'Error!')
          })
      },
      getYeloCategories () {
        this.loading = true
        chasitService.getChazItService()
          .then((result) => {
            this.loading = false
            this.categories = result.data
            console.log(result)
          })
          .catch((error) => {
            this.loading = false
            console.error(error)
            this.$snotify.error('Failed Getting Categories from Azure', 'Error!')
          })
      },
      postYeloService () {
        this.loading = true
        var today = new Date();
        var obj = { DateTime: '2019-05-02', Description: '', RequestedDateTimeStart: '2019-05-02', RequestedDateTimeEnd: '2019-05-02', Latitude: 19.360140, Longitude: -99.258792, YeloCategory: 'pest', ServiceType: 0, YeloUserHeroContact: null };
        var json = JSON.stringify(obj);
        console.log(json)
        chasitService.postServiceRequest(json)
          .then((result) => {
            this.loading = false
            this.categories = result.data
            console.log(result)
          })
          .catch((error) => {
            this.loading = false
            console.error(error)
            this.$snotify.error('Failed Getting Categories from Azure', 'Error!')
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
      this.getYeloCategories()
      //this.postYeloService()
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
