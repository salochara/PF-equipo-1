<template>
  <section class="content">
    <div class="box box-primary">
      <div class="box-body">
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
              <li v-for="subcategory in subcategories">
                <img :src="'/static/img/chasit/' + subcategory.IconResource + '-home@3x.png'" alt="User Image">
                
                  <a class="users-list-name" href="#"> {{subcategory.Title}}</a>


              </li>
            </ul>
            <!-- /.Category list -->
            <!-- /.users-list -->
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


  export default {
    data () {
      return {
        subcategories: null,
        loading: null,
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
            this.loading = true
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
    methods: {
      rowClick (data) {
        this.$router.push({ name: 'MemberProfile', params: { _id: data.row._id }, props: data.row })
      },
      avatar () { return faker.image.avatar() },
    },
    mounted() { 
         this.loading = true
         console.log(this.$route.params._id)
        chasitService.getChazitSubCaretgories(this.$route.params._id)
          .then((result) => {
            this.subcategories = result.data
            console.log(this.subcategories)
          })
          .catch((error) => {
            this.loading = false
            console.error(error)
            this.$snotify.error('Failed Getting Subcategories from Azure', 'Error!')
          })

      
      }
  }
</script>

