import axios from 'axios'

const prefix = 'https://v1.itooi.cn'

axios.defaults.withCredentials = true
// Ajax请求标识
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json charset=UTF-8'
axios.defaults.headers.put['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.delete['X-Requested-With'] = 'XMLHttpRequest'

function query(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(`${prefix}${url}`, {params: params}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

function post(url, datas, params) {
  return new Promise((resolve, reject) => {
    axios.post(`${prefix}${url}`, datas, {params: params}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

function requestAll(...paramsFun) {
  return new Promise((resolve, reject) => {
    axios.all(...paramsFun).then(axios.spread(function (...response) {
      let responseList = []
      for (let res of response) {
        if (!res.status && res.response) {
          responseList.push(res.response.data)
        } else {
          responseList.push(res.data)
        }
      }
      return responseList
    })).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err.data)
    })
  })
}

function deletes(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(`${prefix}${url}` + '/delete', params, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.response)
    })
  })
}

export {query, post, requestAll, deletes}
