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

internals.getChazIt = function(user, url, params, options) {
  let config = {
    method: 'GET',
    url: url,
    params: params,
    headers: {'Authorization': "bearer " + user, 
                'Content': "application/json",
                'Content-Type': "application/json"}
  }
  config = Object.assign(config, options)
  return axios(config)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
    })
}

internals.postChazIt = function(user, url, payload, options) {
  let config = {
    method: 'POST',
    url: url,
    data: payload,
    headers: {'Authorization': "bearer " + user,
    'Content-Type': 'application/json'
    }
  }
  console.log(payload)
  config = Object.assign(config, options)
  return axios(config)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
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
