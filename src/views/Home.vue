<template>
  <div class="home">
    <h1> List of Room </h1>
    <ul v-if="roomlist.length > 0">
      <li v-for="(single, index) in roomlist" :key="index"> {{single}} </li>
    </ul>
    <div class="col-md-12">
      <input type="text" placeholder="Room" v-model="room"><br>
      <button @click="setRoom">Enter Room</button>
    </div>
  </div>
</template>

<script>
import database from '../assets/config'

export default {
  name: 'home',
  data () {
    return {
      room: '',
      roomlist: []
    }
  },
  methods: {
    setRoom () {
      let self = this
      if (self.room) {
        let hangroom = database.ref('room/' + self.room)
        hangroom.once('value', function (snapshot) {
          let result = snapshot.val()
          console.log('check room', result)
          if (!result) {
            database
              .ref('room/' + self.room)
              .set({
                name: self.room
              })
              .then(response => {
                console.log(response)
                localStorage.setItem('room', self.room)
                self.$router.push('login')
              })
          } else {
            let roomusers = result.users
            if (roomusers && Object.keys(roomusers).length >= 2) {
              localStorage.removeItem('room')
              alert('Full Room. Please choose another!')
              window.location.reload()
            } else {
              localStorage.setItem('room', self.room)
              self.$router.push('login')
            }
          }
        })
      }
    },
    getAllRoom () {
      let self = this
      database.ref('room/').once('value', function (snapshot) {
        console.log('get all room', snapshot.val())
        let result = snapshot.val()
        self.roomlist = Object.keys(result)
      })
    }
  },
  created () {
    this.getAllRoom()
  }
}
</script>

<style scoped>
.home {
  margin: 0 auto;
  width: 300px;
}

input, button {
  width: 100%;
  text-align: center;
}

ul, li {
  list-style: none;
}
</style>
