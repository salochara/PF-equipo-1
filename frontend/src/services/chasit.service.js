import { httpClient as http } from '../services'

const internals = {}


internals.getChazItService = (user) => {
    return http.getChazIt(user, "https://hmgcmws.azurewebsites.net/api/YeloCategories/")
  }

internals.getChazitUserCard = (user) =>{
    return http.getChazIt(user, "https://hmgcmws.azurewebsites.net/api/V2.0/Stripe/GetCards/")
}

internals.getChazitUserServices = (user) =>{
  return http.getChazIt(user, "https://hmgcmws.azurewebsites.net/api/V2.0/ServiceRequest/GetUserServices/")
}

internals.postServiceRequest = (user, request) =>{
  return http.postChazIt(user, "https://hmgcmws.azurewebsites.net/api/V2.0/ServiceRequest/PostRequest/", request)
}

internals.getChazitSubCaretgories = (user, id) =>{
  return http.getChazIt(user, "https://hmgcmws.azurewebsites.net/api/YeloCategories/SubCategories/"+id)
}

export default internals
