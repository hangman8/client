<template>
  <div id="app">
    <div v-if='!gameOver'>
      <div v-if='!winner'>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="260px" viewBox="0 0 350 275"
          preserveAspectRatio="xMidYMid meet">
          <line v-if="strikes > 0" x1="80" y1="257" x2="260" y2="257" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 1" x1="100" y1="257" x2="100" y2="40" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 2" x1="100" y1="40" x2="230" y2="40" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 3" x1="100" y1="80" x2="130" y2="40" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 4" x1="230" y1="40" x2="230" y2="80" style="stroke:yellow;fill:none;stroke-width:2px;" />
          <image v-if="strikes > 5 && strikes < 11" xlink:href="https://images-na.ssl-images-amazon.com/images/I/61PXzOSh0OL._SL1397_.jpg" x="205" y="65" height="50px" width="50px"/>
          <line v-if="strikes > 6" x1="230" y1="110" x2="230" y2="170" style="stroke:white;fill:none;stroke-width:4px;" />
          <line v-if="strikes > 7" x1="230" y1="140" x2="250" y2="160" style="stroke:white;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 8" x1="230" y1="140" x2="210" y2="160" style="stroke:white;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 9" x1="230" y1="170" x2="250" y2="220" style="stroke:darkblue;fill:none;stroke-width:2px;" />
          <line v-if="strikes > 10" x1="230" y1="170" x2="210" y2="220" style="stroke:darkblue;fill:none;stroke-width:2px;" />
          <text x="240" y="135" class="small" v-if="strikes > 6">It's Me..</text>
        </svg>
        <div>
          <div class="letter" v-for="letter in wordDisplayLetters">
            {{letter}}
          </div>
        </div>
        <template v-if="initialized">
          <div>
            <div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)" v-for="letter in possibleLetters1">
              {{letter}}
            </div>
          </div>
          <div>
            <div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)" v-for="letter in possibleLetters2">
              {{letter}}
            </div>
          </div>
          <div>
            <div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)" v-for="letter in possibleLetters3">
              {{letter}}
            </div>
          </div>
        </template>
        <button @click="initialize()">New Game</button>

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

  export default {
    name: 'app',
    data: function () {
      return {
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
        correctCounter: 0
      }
    },
    created() {
      console.log('created')
      let arr=[]
      let self = this
      axios.get('https://restcountries.eu/rest/v2/all')
      .then((result) => {
        self.wordBank = result.data
      }).catch((err) => {
        
      });
    },
    methods: {
      initialize() {
        this.initialized = true
        this.strikes = 0
        this.word = this.getRandomWord()
        this.wordLetters = this.word.split('')
        this.wordDisplayLetters = Array(this.word.length)
        this.usedLetters = []
        this.correctCounter = 0
      },
      getRandomWord() {
        let index = Math.random() * (this.wordBank.length - 0)
        index = Math.floor(index)
        console.log('test')
        let word = this.wordBank[index].name.toUpperCase()
        this.hintRegion = this.wordBank[index].region
        this.hintSubRegion = this.wordBank[index].subregion
        this.hintPopulation = this.formatPopulation(this.wordBank[index].population)
        this.hintFlag = this.wordBank[index].flag
        this.wordBank.splice(index, 1) // remove the word so it won't be repeated
        console.log(this.eraseChar(word))
        return word
      },
      eraseChar(word) {
        let alphabet = []
        let trueAlpha = false
        let trueWord = []
        alphabet = alphabet.concat(this.possibleLetters1)
        alphabet = alphabet.concat(this.possibleLetters2)
        alphabet = alphabet.concat(this.possibleLetters3)
        
        for (let i =0; i < word.length; i++) {
          alphabet.forEach(alpha=>{
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
      }
    }
  }
</script>

<style>
  #app {
    text-align: center;
    
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

button:hover {
    background-color: #e6e6e6;
    border-color: #adadad;
}
</style>