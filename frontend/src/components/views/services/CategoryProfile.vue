<template>
  <section class="content container">
    <div class="text-center ">
      <div class="d-flex justify-content-center">
        <box :classes="['box-danger']"
             :disableFooter="false" :headerBorder="true" :noPadding="false">
          <div slot="header">
            <h3 class="box-title">Service Categories</h3>
          </div>

          <!-- /box-header -->

          <span slot="box-tools">
          <!--<span class="label label-danger">8 New Members</span>-->
        </span>
          <!-- /box-tools -->
          <!-- Category list -->
          <div slot="body">
            <ul class="users-list clearfix">
              <li style="margin:45px" v-for="subcategory in subcategories">
                <img :src="'/static/img/chasit/' + subcategory.IconResource + '-home@3x.png'" alt="User Image">
                <br>
                <a class="users-list-name" href="#"> {{subcategory.Title}}</a>
              <div id="request-service-button">
                <br>
                <button class="btn btn-primary" v-on:click="postYeloService(subcategory.CodeName)">Request Service</button>
              </div>
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



      </div>
    </div>

    
  </section>
</template>

<script>
  import faker from 'faker'
  import { chasitService, userService, statsService } from '../../../services'
  import { mapState } from 'vuex'



  export default {
    data () {
      return {
        subcategories: null,
        categories: null,
        loading: false,
        columns: ['avatar', 'Subcategory', 'ID', 'Request'],
        options: {
          highlightMatches: true,
          sortable: ['avatar', 'Subcategory', 'ID'],
          requestFunction: (request) => {
            const params = {}
            params.$page = request.page
            params.$limit = request.limit
            if (request.orderBy) {
              params.$sort = request.ascending ? '-' + request.orderBy : request.orderBy
            }
            if (request.query) {
              params.$term = request.query
            }
            this.loading = false
            return this.$userRepository.list(params)
          },
          responseAdapter: (response) => {
            this.loading = false
            return { data: response.data.docs, count: response.data.items.total }
          },
          uniqueKey: '_id'
        }
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
      rowClick (data) {
        this.$router.push({ name: 'MemberProfile', params: { _id: data.row._id }, props: data.row })
      },
      avatar () { return faker.image.avatar() },
      postYeloService (codename) {
        this.loading = true
        var today = new Date();
        var obj = { DateTime: '2019-05-02', Description: '', RequestedDateTimeStart: '2019-05-02', RequestedDateTimeEnd: '2019-05-02', Latitude: 19.360140, Longitude: -99.258792, YeloCategory: codename, ServiceType: 0, YeloUserHeroContact: null };
        var json = JSON.stringify(obj);
        console.log(json)
        chasitService.postServiceRequest(this.user.azureToken, json)
          .then((result) => {
            this.categories = result.data
            this.$snotify.success('Shortly a chazIT Hero will be in contact with you!', 'Done!')
            this.$router.push('/')
            console.log(result)
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            console.error(error)
            this.$snotify.error('Failed Getting Categories from Azure', 'Error!')
          })
      }
    },
    mounted() { 
         this.loading = true
         console.log(this.$route.params._id)
          console.log(this.user.azureToken)
        chasitService.getChazitSubCaretgories(this.user.azureToken, this.$route.params._id)
          .then((result) => {
            this.subcategories = result.data
            console.log(this.subcategories)
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            console.error(error)
            this.$snotify.error('Failed Getting Subcategories from Azure', 'Error!')
          })
      }
  }
</script>

