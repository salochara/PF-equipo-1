import store from '../store'
import vm from '../main'

new Vue({
    el: '#app',
    data () {
      return {
        info: ''
      }
    },
    mounted () {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => (this.info = response))
    }
  })