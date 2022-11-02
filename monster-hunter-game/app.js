function getRandomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed()
}


const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            battleLog: []
        }
    },
    methods: {
        normalAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage("player", "damage", attackValue)
            this.normalAttackPlayer();
        },
        normalAttackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage("monster", "damage", attackValue)
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage("player", "special-damage", attackValue)
            this.normalAttackPlayer();
        },
        heal() {
            this.currentRound++
            const healValue = Number(getRandomValue(8, 20));
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue
            }
            this.addLogMessage("player", "heal", healValue)
            this.normalAttackPlayer();
        },
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.battleLog = [];
        },
        surrender() {
            this.winner = "monster"
        },
        addLogMessage(who, what, value) {
            this.battleLog.unshift({
                who: who,
                what: what,
                value: value
            })
        },
        renderMessage(who, what, count) {
            console.log(who, what, count)
            return `${who} ${what} ${count}`
        },
    },
    computed: {

        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {
                    width: '0%'
                }
            }
            return {
                width: this.monsterHealth + '%'
            }
        },
        playerBarStyles() {

            if (this.playerHealth < 0) {
                return {
                    width: '0%'
                }
            }
            return {
                width: this.playerHealth + '%'
            }
        },
        specialAttackAvailable() {
            if (this.currentRound % 3 !== 0) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                //draw
                this.winner = 'draw'
            } else if (value <= 0) {
                //player lost
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                //draw
                this.winner = 'draw'
            } else if (value <= 0) {
                //monster lost
                this.winner = 'player'
            }
        }
    }
})

app.mount('#game')