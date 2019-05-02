import { httpClient as http } from '../services'

const internals = {}

internals.getChazItService = () => {
    return http.getChazIt("https://hmgcmws.azurewebsites.net/api/YeloCategories")
  }

internals.getChazitUserCard = () =>{
    return http.getChazIt("https://hmgcmws.azurewebsites.net/api/V2.0/Stripe/GetCards")
}

export default internals
