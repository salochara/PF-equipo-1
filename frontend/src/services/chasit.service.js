import { httpClient as http } from '../services'

const internals = {}


internals.getChazItService = () => {
    return http.getChazIt("https://hmgcmws.azurewebsites.net/api/YeloCategories/")
  }

internals.getChazitUserCard = () =>{
    return http.getChazIt("https://hmgcmws.azurewebsites.net/api/V2.0/Stripe/GetCards/")
}

internals.getChazitUserServices = () =>{
  return http.getChazIt("https://hmgcmws.azurewebsites.net/api/V2.0/ServiceRequest/GetUserServices/")
}

internals.postServiceRequest = (request) =>{
  return http.postChazIt("https://hmgcmws.azurewebsites.net/api/V2.0/ServiceRequest/PostRequest/", request)
}

internals.getChazitSubCaretgories = (id) =>{
  return http.getChazIt("https://hmgcmws.azurewebsites.net/api/YeloCategories/SubCategories/"+id)
}

export default internals
