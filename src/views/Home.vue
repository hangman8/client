<template>
  <div class="home">
    <div class="col-md-4">
      <input class="form-control form-control-lg" type="text" placeholder="Room" v-model="room">
      <button @click="setRoom">Check Button</button>
    </div>
  </div>
</template>

<script>
import database from '../assets/config'

export default {
  name: 'home',
  data () {
    return {
      room: ''
    }
  },
  methods: {
    // starCountRef.once('value', function (snapshot) {
    setRoom () {
      let self = this
      console.log('masuk set room')
      localStorage.setItem('room', this.room)
      if (this.room) {
        let hangroom = database.ref('room/' + this.room)
        hangroom.once('value', function (snapshot) {
          console.log('check before add room', snapshot.val())
          if (!snapshot.val()) {
            database.ref('room/' + self.room).set({
              name: self.room
            })
              .then(response => {
                self.room = ''
              })
          }
          self.$router.push('login')
        })
      }
    }
  }
}
</script>

<style scoped>
button {
  width: 100px;
}
</style>
