/*
bantuerfei
quick timer for a game
ISSUES:
- there is an issue when resetting the interval. it doesn't actually tick down on its own
so resetting within the middle of a second will cause the interval timer to be mistimed for 1 s of time
*/
addEventListener('DOMContentLoaded', () => {new GameTimer()})

class GameTimer {
    
    constructor() {
        this.interval_id = null
        this.interval = null
        this.interval_time = 0
        this.seconds = 0
        document.getElementById('start-btn').addEventListener('click', () => {this.start_timer()})
        document.getElementById('reset-btn').addEventListener('click', () => {this.reset_timer()})
        document.getElementById('end-int-btn').addEventListener('click', () => {this.end_interval()})
    }

    end_interval() {
        console.log('end interval')
        this.interval_time = this.interval
        this.pulse(true)
        this.display_timer()
    }

    pulse(good) {
        console.log('pulse')
        let color = '#EC4067'
        if (good) {
            color = '#44FFD1'
        }
        document.body.style.backgroundColor = color
        setTimeout(() => {document.body.style.backgroundColor = 'white'}, 300)
    }
    
    reset_timer() {
        console.log('reset')
        this.interval = null
        this.interval_time = 0
        this.seconds = 0
        clearInterval(this.interval_id)
        this.interval_id = null
    }

    update_timer() {
        console.log('update')
        if (this.seconds == 0) {
            this.reset_timer()
        } else {
            this.seconds--;
            this.interval_time--
            if (this.interval_time <= 0) {
                this.interval_time = this.interval
                this.pulse(false)
            }
        }
    }

    display_timer() {
        console.log('display')
        let hours = Math.floor(this.seconds / 3600)
        let minutes = Math.floor((this.seconds % 3600) / 60)
        let seconds = this.seconds % 60
        document.getElementById('t-time').textContent = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
        document.getElementById('i-time').textContent = String(this.interval_time) + ' s'
    }
    tick_timer() {
        console.log('tick')
        this.update_timer()
        this.display_timer()
    }
    start_timer() {
        console.log('start')
        if (this.interval_id) {
            this.reset_timer()
        }
        let times = this.get_time()
        this.seconds = times[0] * 3600 + times[1] * 60 + times[2]
        this.interval = times[3]
        this.interval_time = this.interval
        this.interval_id = setInterval(() => {this.tick_timer()}, 1000)
        console.log(this.interval_id)
        this.display_timer()
    }
    get_time() {
        console.log('get time')
        let hours = parseInt(document.getElementById('timer-h').value) || 0
        let minutes = parseInt(document.getElementById('timer-m').value) || 0
        let seconds = parseInt(document.getElementById('timer-s').value) || 0
        let interval = parseInt(document.getElementById('timer-i').value) || 0
        return [hours, minutes, seconds, interval]
    }
}