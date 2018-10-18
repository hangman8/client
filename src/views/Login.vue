<template>
  <div class="about">
    <h1 class="welcome">Welcome to room {{room}} </h1>
    <div class="col-md-12">
      <input type="text" v-model="username" placeholder="Player name">
      <button @click="login">Login</button>
      <br><br>
      <p class="note"> {{notif}} </p>
    </div>
  </div>
</template>

<script>
import database from '../assets/config'

export default {
  name: 'login',
  data () {
    return {
      room: '',
      username: '',
      notif: ''
    }
  },
  methods: {
    login () {
      let self = this
      if (self.username === '') {
        this.notif = 'Enter your name first'
      } else {
        database.ref('room/' + self.room + '/users').push({
          username: self.username,
          heart: 5,
          turn: false
        })
          .then(response => {
            console.log('whoami', response.key)
            localStorage.setItem('userid', response.key)
          })
        self.username = ''
        self.$router.push('/room')
      }
    },
    checkRoom () {
      let roomvalue = localStorage.getItem('room')
      this.room = roomvalue
    }
  },
  created () {
    this.checkRoom()
  }
}
</script>

<style scoped>
.welcome {
  margin-bottom: 30px;
}

.about {
  margin: 0 auto;
  width: 500px;
}

input, button {
  width: 100%;
  text-align: center;
}

.note {
  color: red;
}
</style>
