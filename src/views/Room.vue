<template>
  <div>
    <div class="col-md-12" style="display: flex">
      <div class="col-md-6"><h1><span>Heart {{playerinfo1.heart}}</span> Player 1 {{playerinfo1.username}}</h1></div>
      <div class="col-md-6"><h1>Player 2 {{playerinfo2.username}} <span> Heart {{playerinfo1.heart}}</span></h1></div>
    </div>
    <!-- start -->
    <div class="room">
      <div v-if='!gameOver'>
      <div v-if='!winner'>
         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="260px" viewBox="0 0 350 275"
          preserveAspectRatio="xMidYMid meet">
          <line v-if="strikes > 0" x1="80" y1="257" x2="260" y2="257" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 1" x1="100" y1="257" x2="100" y2="40" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 2" x1="100" y1="40" x2="230" y2="40" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 3" x1="100" y1="80" x2="130" y2="40" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 4" x1="230" y1="40" x2="230" y2="80" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <circle v-if="strikes > 5" cx="230" cy="90" style="fill:khaki;stroke:yellow;stroke-width:2px;" r="20" />
          <line v-if="strikes > 6" x1="230" y1="110" x2="230" y2="170" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 7" x1="230" y1="140" x2="250" y2="120" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 8" x1="230" y1="140" x2="210" y2="120" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 9" x1="230" y1="170" x2="250" y2="200" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 10" x1="230" y1="170" x2="210" y2="200" style="stroke:yellow;fill:none;stroke-width:2px;" />
        </svg>
        <div>
          <div class="letter" v-if="wordBank.length > 0" v-for="(letter,index) in wordDisplayLetters" :key="index">
            {{letter}}
          </div>
        </div>
        <p class="waiting" v-if="initialized === false">Waiting for opponent
          <span>
            <div class="loader">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </span>
        </p>
        <template v-else>
          <div>
            <div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)" v-for="(letter,index) in possibleLetters1" :key="index">
              {{letter}}
            </div>
          </div>
          <div>
            <div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)" v-for="(letter,index) in possibleLetters2" :key="index">
              {{letter}}
            </div>
          </div>
          <div>
            <div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)" v-for="(letter,index) in possibleLetters3" :key="index">
              {{letter}}
            </div>
          </div>
        </template>

        <div class='hints'>
        {{strikes}}
        <h1>Hints:</h1>
        <div>
          <div>Region: {{ hintRegion }}</div>
          <div>Sub-Region: {{ hintSubRegion }}</div>
          <div>Population: {{ hintPopulation }}</div>
          <div v-if='strikes==10'>Flag:<img :src='hintFlag' style='max-height:250px; max-width:500px; border: solid 1px'></div>
        </div>
        </div>
      </div>
      </div>
    </div>
    <!-- end -->
    <div v-if='gameOver'>
      <h1>You Lose!! Loser!</h1>
      <img src='https://i.pinimg.com/originals/51/47/ce/5147cefed31c3da812e713bb8af1e875.gif' style='min-width:500px; min-height:500px'>
    </div>
    <div v-if='winner'>
      <h1>Congratulation You are the Winner!!</h1>
      <img src='https://data.whicdn.com/images/151126798/original.gif' style='min-width:500px; min-height:500px'>
    </div>
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
      notif: '',
      strikes: 12,
      word: "HANGMAN",
      wordLetters: ['H', 'A', 'N', 'G', 'M', 'A', 'N'],
      wordDisplayLetters: ['H', 'A', 'N', 'G', 'M', 'A', 'N'],
      usedLetters: [],
      possibleLetters1: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
      possibleLetters2: ["J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
      possibleLetters3: ["T", "U", "V", "W", "X", "Y", "Z"],
      initialized: false,
      wordBank: [],
      hintRegion: '',
      hintSubRegion: '',
      hintPopulation: '',
      hintFlag: '',
      gameOver: false,
      winner: false,
      winnerPlayer: '',
      loserPlayer: '',
      correctCounter: 0,
      turnCount: 0,
      player1: '',
      player2: '',
      playerinfo1: '',
      playerinfo2: '',
    }
  },
  methods: {
    checkUser () {
      let roomvalue = localStorage.getItem('room')
      let userid = localStorage.getItem('userid')
      this.room = roomvalue
      this.userid = userid
      let hangroom = database.ref('room/' + this.room)
      let self = this
      hangroom.on('value', function (snapshot) {
        let userarr = snapshot.val().users
        if (Object.keys(userarr).length === 2) { //full-room
          self.player1 = Object.keys(userarr)[0]
          self.playerinfo1 = Object.values(userarr)[0]
          self.player2 = Object.keys(userarr)[1]
          self.playerinfo2 = Object.values(userarr)[1]
          self.initialize()
          console.log(self.playerinfo1.username)
        }
      })
    },
    initialize() {
      this.initialized = true
      this.strikes = 0
      this.wordLetters = this.word.split('')
      this.wordDisplayLetters = Array(this.word.length)
      this.usedLetters = []
      this.correctCounter = 0
      let self = this
      database.ref('room/' + this.room).once('value', function (snapshot) {
        word.set({
          word: self.getWordBank()
        })
        console.log('apa ini', word)
      })
    },
    // getRandomWord() {
    //   let index = Math.random() * (this.wordBank.length - 0)
    //   index = Math.floor(index)
    //   console.log('test')
    //   this.hintRegion = this.wordBank[index].region
    //   this.hintSubRegion = this.wordBank[index].subregion
    //   this.hintPopulation = this.formatPopulation(this.wordBank[index].population)
    //   this.hintFlag = this.wordBank[index].flag
    //   this.wordBank.splice(index, 1) // remove the word so it won't be repeated
    //   console.log(this.eraseChar(word))
    //   return word
    // },
    eraseChar() {
      let word = this.word
      let alphabet = []
      let trueAlpha = false
      let trueWord = []
      alphabet = alphabet.concat(this.possibleLetters1)
      alphabet = alphabet.concat(this.possibleLetters2)
      alphabet = alphabet.concat(this.possibleLetters3)
      
      for (let i =0; i < word.length; i++) {
        alphabet.forEach(alpha => {
          if(word[i] === alpha) {
            trueAlpha = true
          } else {
            trueAlpha = false
          }
          if(trueAlpha) {
            trueWord.push(word[i])
          }
        })
      }
      return trueWord.join('')
    },
    formatPopulation(amount, decimalCount = 0, decimal = ".", thousands = ",") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    },
    tryLetter(letter) {
      let wordLenght = this.word.length
      if (this.usedLetters.includes(letter)) {
        return
      }

      this.usedLetters.push(letter)
      let match = false
      for (let i = 0; i < this.wordDisplayLetters.length; i++) {
        if (letter === this.wordLetters[i]) {
          this.wordDisplayLetters.splice(i, 1, letter)
          match = true
          this.correctCounter++
        }
      }

      if (!match) {
        this.strikes++
      } 
      if(this.strikes === 11) {
        this.gameOver = true
      }
      if(this.correctCounter === this.wordDisplayLetters.length) {
        this.winner = true
      }
      console.log(this.wordDisplayLetters.length,'--', this.correctCounter, this.winner)
    },
    getStrikethroughClass(letter) {
      if (this.usedLetters.includes(letter)) {
        return 'diagonal-strike'
      }
      return null
    },
    getWordBank () {
      let self = this
      axios.get('https://restcountries.eu/rest/v2/all')
      .then((result) => {
        self.wordBank = result.data
        let index = Math.random() * (this.wordBank.length - 0)
        index = Math.floor(index)
        if (self.wordBank) {
          let word = self.wordBank[index].name.toUpperCase()
          this.word = word
          this.hintRegion = this.wordBank[index].region
          this.hintSubRegion = this.wordBank[index].subregion
          this.hintPopulation = this.formatPopulation(this.wordBank[index].population)
          this.hintFlag = this.wordBank[index].flag
          this.wordBank.splice(index, 1) // remove the word so it won't be repeated
          console.log(this.eraseChar(this.word))
          return word
        }
      })
      .catch((err) => {
        console.log(err)  
      })
    }
  },
  mounted () {
    this.checkUser()
  },
  created() {
    this.getWordBank()
  }
}
</script>

<style scoped>

.room {
  margin: 0 auto;
  width: 500px;
}

.hints {
  color: whitesmoke;
}

.letter {
  display: inline-block;
  border-bottom: 1px solid;
  margin: 0px 3px 0px 3px;
  font-size: 30px;
  min-width: 30px;
  vertical-align: bottom;
}

.possibleLetter {
  display: inline-block;
  margin: 10px 3px 0px 3px;
  font-size: 30px;
  min-width: 30px;
  cursor: pointer;
}

.diagonal-strike {
  background: linear-gradient(to left top, transparent 47.75%, currentColor 49.5%, currentColor 50.5%, transparent 52.25%);
  color: dimgrey;
}

button {
  margin-top: 20px;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
}

.waiting {
  margin-top: 20px;
  color: #e6e6e6;
  font-size: larger;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background-color: #e6e6e6;
  border-color: #adadad;
}

.waiting span {
  margin-left: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 100%;
  margin: auto 3px;
  display: inline-block;
  animation: slide 1s infinite;
}
.dot:nth-child(1) {
  animation-delay: 0.1s;
  background: white(#3ac, 50);
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
  background: white(#3ac, 100);
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
  background: white(#3ac, 150);
}

@-moz-keyframes slide {
  0% {transform: scale(1);}
  50% {opacity: 0.3; transform: scale(1.2);}
  100% {transform: scale(1);}
}
@-webkit-keyframes slide {
  0% {transform: scale(1);}
  50% {opacity: 0.3; transform: scale(1.2);}
  100% {transform: scale(1);}
}
@-o-keyframes slide {
  0% {transform: scale(1);}
  50% {opacity: 0.3; transform: scale(1.2);}
  100% {transform: scale(1);}
}
@keyframes slide {
  0% {transform: scale(1);}
  50% {opacity: 0.3; transform: scale(1.2);}
  100% {transform: scale(1);}
}

</style>
