<template>
  <div class="hello">
    <button @click="getUser">获取</button>
    <button @click="login">登录</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      domain: 'http://localhost:3000'
    }
  },
  methods: {
    getUser () {
      axios({
        method: 'get',
        url: this.domain + '/api/get/user',
        params: {
          name: 'sun2',
          puid: '5a34b7c80bf4fb1880b75ddc'
        },
        withCredentials: true
      })
    },
    login () {
      axios({
        method: 'post',
        url: this.domain + '/api/login',
        data: {
          name: 'sun2',
          passwd: '123321'
        },
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
