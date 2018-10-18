<template>
  <div class="about">
    <h1>This is a login page from room {{room}} </h1>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      room: ''
    }
  },
  methods: {
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
