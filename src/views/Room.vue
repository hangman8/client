<template>
  <div class="room">
    <h1 class="welcome">Let's Play! </h1>
  </div>
</template>

<script>
import database from '../assets/config'

export default {
  name: 'room',
  data () {
    return {
      room: '',
      userid: '',
      notif: ''
    }
  },
  methods: {
    checkUser () {
      let roomvalue = localStorage.getItem('room')
      let userid = localStorage.getItem('userid')
      this.room = roomvalue
      this.userid = userid
    }
  },
  created () {
    this.checkUser()
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
