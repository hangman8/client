<template>
  <div class="home">
    <div class="mt-4 mb-5 d-flex align-items-center justify-content-center mr-5">
      <div id="banner" class="">The Bloody Hangman</div>
      <img class="mt-3 border rounded-circle bg-warning" id="scarecrow" src="../assets/scarecrow2.png" alt="">
    </div>
    <div class="alert mb-0 container col-7" id="alert-subtitle">
      <h3 id="subtitle">Interested to try a thrilling hangman game? Immediately make a room below!</h3>
    </div>
    <div class="d-flex justify-content-center align-items-center mb-4 col-9 m-auto p-3 rounded" id="divroom">
      <div class="mr-5 d-flex align-items-center">
        <div class="lead mr-5">Playing Rooms</div> 
        <i class="fas fa-arrow-circle-right"></i></div>
      <div class="ml- mr-5" id="listroom" v-if="roomlist.length > 0">
        <div id="oneroom" v-for="(single, index) in roomlist" :key="index"> {{single}} </div>
      </div>
      <div class="col-6">
      <input type="text" class="form-control" placeholder="Room" v-model="room"><br>
      <button class="btn btn-outline-dark" id="btn-room" @click="setRoom">Enter Room</button>
    </div>
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
  color: rgb(134, 5, 5);
  background-color: black;
}

#banner {
  font-family: 'Butcherman', cursive;
  font-size: 120px;
}

#scarecrow {
  width: 25rem;
  margin-right: 90px !important;
  border: 10px solid darkred !important
}

#subtitle {
  font-family: 'Oswald', sans-serif;
  font-size: 21px;
  color: white;
}

#alert-subtitle {
  background-color: rgb(134, 5, 5);
  border-radius: 0px !important;
  width: 680px !important;
}

input, button {
  width: 100%;
  text-align: center;
}

#oneroom:hover {
  background-color: #003366;
}

#divroom {
  background-color: rgb(134, 5, 5);
  color: white;
}

#btn-room {
  background-color: black;
  border: none !important;
  color: white;
}

#btn-room:hover {
  background-color: #ffa500;
  border: none !important;
  color: white;
}

ul, li {
  list-style: none;
}
</style>
