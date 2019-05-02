import store from '../store'
import axios from 'axios'
import { RESPONSE_MESSAGES } from '../config'

const internals = {}

internals.get = function(url, params, options) {
  let config = {
    method: 'GET',
    url: url,
    params: params
  }
  config = Object.assign(config, options)
  return axios(config)
    .then(function(response) {
      if (response.headers['x-access-token']) {
        internals.updateTokens(response.headers)
      }
      return response
    })
    .catch(function(error) {
      if (error === RESPONSE_MESSAGES.EXPIRED_ACCESS_TOKEN) {
        store.dispatch('auth/useRefreshToken')
        return internals.get(url, params, options)
      } else {
        throw error
      }
    })
}

internals.getChazIt = function(url, params, options) {
  let config = {
    method: 'GET',
    url: url,
    params: params,
    headers: {'Authorization': "bearer YP9ReyeNo_ugaAgiRmOiYRtWSB8j-qcTWLebvSPxZKQ7qLvIEBFJdN4-Y3Utvn97KMLbpLdHm1vT3wstyqoYbE54ZHdHSIN_BfrLjMXW3AHVfaDS5C2RJoQb-niZ393V7bW_rvhvzS1VsInxDFso-xu3qMBF4lrrEen63pSulPEjWa9GlnoHZSWqi20NJVYNGuNFpBBObXbIJzooHW0lMQ3GBVqlqBDN_a7xZ1LvuCpaJA1bHM6TUGASV9SlsrX5sCtE8ab3UgeTz-dINo_57PqxcsXRF9S4L64oSgL2D2jpld1lkVZ336VnqoUZ3rBtIBTIwGWpvRPfAqRBJaHypVKVahlkUrEhv8Ar9fgyoZ3vnF-Okn6MEIxl33X8Jb7cqjmh6WSWoeJ4CKTlzFef7BX9hIcPErkq9OOofDhbiE2dY_NuPLB6ZNYx8-ebAOduUF5H8mmM7rh3SqS_g0d9lMYaWFH_XoW3N89dbowR36Bsvhtx7Rh0ceUXUsO2JE6l", 
                'Content': "application/json",
                'Content-tyoe': "application/json"}
  }
  config = Object.assign(config, options)
  return axios(config)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      if (error === RESPONSE_MESSAGES.EXPIRED_ACCESS_TOKEN) {
        store.dispatch('auth/useRefreshToken')
        return internals.get(url, params, options)
      } else {
        throw error
      }
    })
}



internals.put = function(url, payload, options) {
  let config = {
    method: 'PUT',
    url: url,
    data: payload
  }
  config = Object.assign(config, options)
  return axios(config)
    .then(function(response) {
      if (response.headers['x-access-token']) {
        internals.updateTokens(response.headers)
      }
      return response
    })
    .catch(function(error) {
      if (error === RESPONSE_MESSAGES.EXPIRED_ACCESS_TOKEN) {
        store.dispatch('auth/useRefreshToken')
        return internals.put(url, payload, options)
      } else {
        throw error
      }
    })
}

internals.post = function(url, payload, options) {
  let config = {
    method: 'POST',
    url: url,
    data: payload
  }
  config = Object.assign(config, options)
  return axios(config)
    .then(function(response) {
      if (response.headers['x-access-token']) {
        internals.updateTokens(response.headers)
      }
      return response
    })
    .catch(function(error) {
      if (error === RESPONSE_MESSAGES.EXPIRED_ACCESS_TOKEN) {
        store.dispatch('auth/useRefreshToken')
        return internals.post(url, payload, options)
      } else {
        throw error
      }
    })
}

internals.delete = function(url, payload, options) {
  let config = {
    method: 'DELETE',
    url: url,
    data: payload
  }
  config = Object.assign(config, options)
  return axios(config)
    .then(function(response) {
      if (response.headers['x-access-token']) {
        internals.updateTokens(response.headers)
      }
      return response
    })
    .catch(function(error) {
      if (error === RESPONSE_MESSAGES.EXPIRED_ACCESS_TOKEN) {
        store.dispatch('auth/useRefreshToken')
        return internals.delete(url, payload, options)
      } else {
        throw error
      }
    })
}

internals.updateTokens = function(headers) {
  const tokens = {
    accessToken: headers['x-access-token'],
    refreshToken: headers['x-refresh-token']
  }
  store.dispatch('auth/updateTokens', tokens)
}

export default internals
