<template>
  <section class="content">
    <div>
      <box :classes="['box-danger']">
        <div slot="body">
            <!-- <div v-if="services">
                <v-client-table :data="services" url="" :columns="documentColumns" :options="documentOptions" v-on:row-click="ownerRowClick">
                </v-client-table>
            </div> -->
             <table class="table">
                    <thead>
                        <tr>
                            <th>Requested</th>
                            <th>Service Provider</th>
                            <th>Service Type</th>
                            <th>Status</th>
                        </tr>
                </thead>
                <tbody>
                    <template v-for="service in this.services">
                        <tr class="name-row" >
                            <td>{{service.RequestDateTime | moment("dddd, MMMM Do YYYY")}}</td>
                            <td>{{service.YeloSP.FirstName + " " + service.YeloSP.LastName}}</td>
                            <template v-if="service.YeloServiceType == 0">
                                <td>chazIT<strong> Emergency Service</strong></td>
                            </template>
                            <template v-if="service.YeloServiceType == 1">
                                <td>chazIT<strong> Normal Service</strong></td>
                            </template>
                            <div class="btn-group">
                              <template v-if="service.ServiceStatus == 0">
                                  <button style="width: 100px" type="button" class="btn btn-warning">Programmed</button>
                              </template>
                              <template v-if="service.ServiceStatus == 1">
                                  <button style="width: 100px" type="button" class="btn btn-success">In-Progress</button>
                              </template>
                              <template v-if="service.ServiceStatus == 2">
                                  <button style="width: 100px" type="button" class="btn btn-danger">Finalized</button>
                              </template>
                            </div>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div v-if="loading" class="overlay">
          <i class="fa"><pulse-loader></pulse-loader></i>
        </div>
      </box>
    </div>

  </section>
</template>

<script>
    import { chasitService, userService, statsService } from '../../../services'

  export default {
    name: 'ServiceByUser',
    data () {
      return {
        loading: null,
        services: null,
        documentColumns: ['Id', 'YeloSP', 'YeloCategoryCodeName'],
        documentOptions: {
          highlightMatches: true,
          filterable: false,
          uniqueKey: '_id'
        },
        sharedColumns: ['Service Id', 'Service Provider'],
        sharedOptions: {
          highlightMatches: true,
          requestFunction: (request) => {
            const params = {}
          },
          responseAdapter: (response) => {
            this.loading = false
            response.data.docs = response.data.docs.map((document) => {
              document.Access = document.user_document.canEdit ? 'Edit' : 'View'
              document.Owner = document.owner.firstName + ' ' + document.owner.lastName
              return document
            })
            return { data: response.data.docs, count: response.data.items.total }
          },
          uniqueKey: '_id'
        }
      }
    },
    computed: {
      addButtonClass () {
        if (this.services) {
          return this.services.count > this.services.limit ? 'shift-add-left' : 'add-item'
        } else {
          return 'add-item'
        }
      }
    },
    mounted() {
        this.loading = true
        chasitService.getChazitUserServices()
          .then((result) => {
                this.services = result.data.reverse()
                this.loading = false
                console.log(result.data)
                return result.data
          })
          .catch((error) => {
            this.loading = false
            console.error(error)
            this.$snotify.error('Failed Getting Categories from Azure', 'Error!')
          })
    },
    methods: {
        ownerRowClick (data) {
            this.$router.push({ name: 'DocumentDetails', params: { _id: data.row._id }, query: { canEdit: true } })
        },
        sharedRowClick (data) {
            this.$router.push({ name: 'DocumentDetails', params: { _id: data.row._id }, query: { canEdit: data.row.user_document.canEdit } })
        },
    }
  }
</script>