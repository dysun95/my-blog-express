<template>
  <div class="hello">
    <button @click="getUser">get</button>
    <button @click="login">login</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      domain: 'http://local.dysun95.tk:3000'
      // domain: 'http://api.dysun95.tk'
    }
  },
  methods: {
    getUser () {
      axios({
        method: 'get',
        url: this.domain + '/api/get/user',
        params: {
          name: 'sun5'
        },
        withCredentials: true
      })
    },
    login () {
      axios({
        method: 'post',
        url: this.domain + '/api/login',
        data: {
          name: 'sun5',
          passwd: '123123'
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
