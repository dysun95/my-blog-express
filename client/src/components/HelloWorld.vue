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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getUser () {
      axios.get('http://api.dysun95.tk/api/get/user', {
        params: {
          name: 'sun1'
        }
      })
    },
    login () {
      axios({
        method: 'post',
        url: 'http://api.dysun95.tk/api/login',
        data: {
          name: 'sun4',
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
