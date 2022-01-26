<template>
  <div class="content">
    <!-- Hero -->
    <!--<base-block rounded content-full>
      <div class="py-4 text-center">
        <h1 class="mb-2">
          Roulette
        </h1>
        <h2 class="h4 font-w400 text-muted mb-0">
          Viel Glück!
        </h2>
      </div>
    </base-block>-->
    <!-- END Hero -->

    <!-- Dummy content -->
    <b-row>
      <b-col sm="12">
        <b-progress class="bg-primary-dark" v-bind:style="{display: displayBar}" :max="100" variant="primary">
          <b-progress-bar :value="barWidth"
                          :label-html="`<span class='text-white justify-content-center d-flex position-absolute w-100'>${barTimer}</span>`"></b-progress-bar>
        </b-progress>
        <base-block :modeLoading="!hash" title="Roulette" subtitle="">
          <template #options>
            <b-button variant="alt-info" size="sm">
              <i class="fa fa-fw fa-info"></i> Info
            </b-button>
          </template>

          <div class='roulette-wrapper'>
            <div class='selector'></div>
            <div class='wheel'
                 v-bind:style="{ 'transition-timing-function': wheelStyle.transition_timing, 'transition-duration': wheelStyle.transition_duration, 'transform': wheelStyle.transform }"
                 v-html="rows"></div>
            <div class="fade-left"></div>
            <div class="fade-right"></div>
          </div>

          <div id="roulette">

            <br>
            <center><b>Hash: </b> {{ hash }}</center>

            <div class="scores row">
              <div class="col-8">
                <div class="history">
                  <div class="history-title">Historie</div>
                  <div v-for="entry in history" v-bind:key="entry.id" :class="['bg-' + entry.color]"
                       class="history-box">
                    {{ entry.number }}
                  </div>
                </div>
              </div>

              <div class="col-4">
                <div class="history">
                  <div class="history-title">Letzten 100</div>
                  <div class="history-box bg-primary">{{ lastRed }}</div>
                  <div class="history-box bg-success">{{ lastGreen }}</div>
                  <div class="history-box bg-primary-dark">{{ lastBlack }}</div>
                </div>
              </div>
            </div>

            <div class="container">

              <div style="margin-top: 40px" class="text-center">
                <input min="10" type="number" class="form-control" :value="bet"
                       name="example-text-input"
                       placeholder="Einsatz..">

                <div class="push">
                  <div style="width: 100%" class="btn-group" role="group"
                       aria-label="Button group with nested dropdown">
                    <button v-on:click="setBet(10)" style="border: 0" type="button"
                            class="btn btn-secondary">MIN
                    </button>
                    <button v-on:click="addBet(10)" style="border: 0" type="button"
                            class="btn btn-secondary">+10
                    </button>
                    <button v-on:click="addBet(100)" style="border: 0" type="button"
                            class="btn btn-secondary">+100
                    </button>
                    <button v-on:click="addBet(1000)" style="border: 0" type="button"
                            class="btn btn-secondary">+1000
                    </button>
                    <button v-on:click="multiplyBet(0.5)" style="border: 0" type="button"
                            class="btn btn-secondary">1/2
                    </button>
                    <button v-on:click="multiplyBet(2)" style="border: 0" type="button"
                            class="btn btn-secondary">x2
                    </button>
                    <button v-on:click="setBet(cash)" style="border: 0" type="button"
                            class="btn btn-secondary">MAX
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <div style="margin-top: 50px">
              <div class="row">
                <div class="col-4">
                  <ul class="list-group">
                    <button v-on:click="startBet(0)" v-bind:disabled="disableRed"
                            class="list-group-item d-flex justify-content-between align-items-center list-group-item-action text-white bg-primary min-height-75">
                      Setzen<span>x2</span></button>
                    <transition-group name="list" tag="p">
                      <li v-for="red in getRed()" :key="red.id"
                          class="list-group-item d-flex justify-content-between py-2 align-items-center list-item">
                        <div style="align: left">
                          <!--<img class="img-avatar img-avatar20"
                               src="https://www.w3schools.com/w3images/avatar2.png"
                               alt=""> -->
                          {{ red.text }}
                        </div>
                        <span>${{ red.bet }}</span>
                      </li>
                    </transition-group>
                  </ul>
                </div>
                <div class="col-4">
                  <ul class="list-group">
                    <button v-on:click="startBet(2)" v-bind:disabled="disableGreen"
                            class="list-group-item d-flex justify-content-between align-items-center list-group-item-action text-white bg-success min-height-75">
                      Setzen<span>x14</span></button>
                    <transition-group name="list" tag="p">
                      <li v-for="green in getGreen()" :key="green.id"
                          class="list-group-item d-flex justify-content-between py-2 align-items-center list-item">
                        <div style="align: left">
                          <!--<img class="img-avatar img-avatar20"
                               src="https://www.w3schools.com/w3images/avatar2.png"
                               alt=""> -->
                          {{ green.text }}
                        </div>
                        <span>${{ green.bet }}</span>
                      </li>
                    </transition-group>
                  </ul>
                </div>
                <div class="col-4">
                  <ul class="list-group">
                    <button v-on:click="startBet(1)" v-bind:disabled="disableBlack"
                            class="list-group-item d-flex justify-content-between align-items-center list-group-item-action text-white bg-primary-dark min-height-75">
                      Setzen<span>x2</span></button>
                    <transition-group name="list" tag="p">
                      <li v-for="black in getBlack()" :key="black.id"
                          class="list-group-item d-flex justify-content-between py-2 align-items-center list-item">
                        <div style="align: left">
                          <!--<img class="img-avatar img-avatar20"
                               src="https://www.w3schools.com/w3images/avatar2.png"
                               alt=""> -->
                          {{ black.text }}
                        </div>
                        <span>${{ black.bet }}</span>
                      </li>
                    </transition-group>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </base-block>
      </b-col>
    </b-row>
    <!-- END Dummy content -->
  </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    data() {
      return {
        red: [],
        green: [],
        black: [],
        history: [],
        lastRed: 20,
        lastGreen: 10,
        lastBlack: 20,
        bet: undefined,
        cash: 100000,
        disableRed: false,
        disableGreen: false,
        disableBlack: false,
        betted: false,
        hash: 'loading..',

        running: false,
        time: 0,
        position: undefined,
        card: undefined,
        randomize: undefined,
        bettedNumber: undefined,

        rows: "loading...",

        //transitions
        wheelStyle: {
          transition_timing: '',
          transition_duration: '',
          transform: '',
        },

        //bar style
        displayBar: '',
        barWidth: 0,
        barTimer: '',
      }
    },
    mounted: function () {
      this.initWheel();

      setInterval(this.update, 50);
    },
    sockets: {
      connect() {
        console.log('socket connected')
      },
      stopRoulette(hash) {
        console.log("Stoppe Roulette...");

        this.red = [];
        this.green = [];
        this.black = [];

        this.wheelStyle.transition_timing = '';
        this.wheelStyle.transition_duration = '';

        this.time = 0;
        this.running = false;

        this.displayBar = '';

        const resetTo = -(this.position * this.card + this.randomize);

        this.wheelStyle.transform = 'translate3d(' + resetTo + 'px, 0px, 0px)';

        //console.log(-(position * card + randomize));
        console.log(resetTo);

        this.disableRed = false;
        this.disableGreen = false;
        this.disableBlack = false;

        this.hash = hash;
      },
      prepareStop(data) {
        console.log("Bereite stoppen vor...");
        if (this.betted) {
          if (this.bettedNumber === data.winner) {

            let win = 0;
            if (data.number === 0) {
              win = this.bet * 14;
            } else {
              win = this.bet * 2;
            }

            //header.money = header.money + win;
            this.getProfile();
            this.betted = false;

            this.toast('Glückwunsch', 'Sie haben $' + win + " gewonnen!", 'success');
          }
        }
        this.init(data);
      },
      startRoulette(msg, ran) {
        console.log("Starte Roulette...");

        this.spinWheel(msg, ran);
        this.disableRed = true;
        this.disableGreen = true;
        this.disableBlack = true;
      },
      time(data) {
        this.time = data;
      },
      init(data) {
        console.log('init: ' + data);
        this.init(data);
        this.time = data.time;
        this.hash = data.hash;
      },
      newBet(data) {
        if (data.type === 0) {
          this.red.push({
            text: data.name,
            bet: data.amount,
            type: data.type,
            id: data.id
          });
        } else if (data.type === 1) {
          this.black.push({
            text: data.name,
            bet: data.amount,
            type: data.type,
            id: data.id
          });
        } else if (data.type === 2) {
          this.green.push({
            text: data.name,
            bet: data.amount,
            type: data.type,
            id: data.id
          });
        }
      },
    },
    methods: {
      ...mapActions(["saveRoulette", "getProfile"]),
      init: function init(data) {

        this.history = data.history.reverse();
        this.lastBlack = data.top.black;
        this.lastRed = data.top.red;
        this.lastGreen = data.top.green;

        this.red = [];
        this.black = [];
        this.green = [];

        for (let i = 0; i < data.bets.length; i++) {
          if (data.bets[i].type === 0) {
            this.red.push({
              text: data.bets[i].name,
              bet: data.bets[i].amount,
              type: data.bets[i].type
            });
          } else if (data.bets[i].type === 1) {
            this.black.push({
              text: data.bets[i].name,
              bet: data.bets[i].amount,
              type: data.bets[i].type
            });
          } else if (data.bets[i].type === 2) {
            this.green.push({
              text: data.bets[i].name,
              bet: data.bets[i].amount,
              type: data.bets[i].type
            });
          }
        }

      },
      spinWheel: function spinWheel(roll, ran) {

        //Codebase.blocks('#blockId', 'state_normal');

        this.running = true;

        this.displayBar = 'none';

        const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];
        this.position = order.indexOf(roll);

        //var audio = new Audio('sounds/roll.mp3');
        //audio.play();

        //determine position where to land
        const rows = 12;
        this.card = 75 + 3 * 2;
        let landingPosition = (rows * 15 * this.card) + (this.position * this.card);

        this.randomize = ran;

        landingPosition = landingPosition + this.randomize;

        const object = {
          x: Math.floor(Math.random() * 50) / 100,
          y: Math.floor(Math.random() * 20) / 100
        };

        this.wheelStyle.transition_timing = 'cubic-bezier(0,' + object.x + ',' + object.y + ',1)';
        this.wheelStyle.transition_duration = '6s';
        this.wheelStyle.transform = 'translate3d(-' + landingPosition + 'px, 0px, 0px)';

      },
      initWheel: function () {
        let rows = "";
        let row = "";

        row += "<div class='line'>";
        row += "  <div class='card bg-primary'>1</div>";
        row += "  <div class='card bg-primary-dark'>14</div>";
        row += "  <div class='card bg-primary'>2</div>";
        row += "  <div class='card bg-primary-dark'>13</div>";
        row += "  <div class='card bg-primary'>3</div>";
        row += "  <div class='card bg-primary-dark'>12</div>";
        row += "  <div class='card bg-primary'>4</div>";
        row += "  <div class='card bg-success'>0</div>";
        row += "  <div class='card bg-primary-dark'>11</div>";
        row += "  <div class='card bg-primary'>5</div>";
        row += "  <div class='card bg-primary-dark'>10</div>";
        row += "  <div class='card bg-primary'>6</div>";
        row += "  <div class='card bg-primary-dark'>9</div>";
        row += "  <div class='card bg-primary'>7</div>";
        row += "  <div class='card bg-primary-dark'>8</div>";
        row += "</div>";

        for (let x = 0; x < 29; x++) {
          rows += row;
        }

        this.rows = rows;

        //Codebase.blocks('#blockId', 'state_loading');
      },
      startBet(type) {
        if (this.bet === undefined)
          /*return iziToast.error({
              title: 'Fehler',
              message: 'Gebe bitte erst dein Guthaben an',
              position: 'topLeft'
          }); */
          this.toast('Title', 'Content', 'success')
        if (type === 0)
          this.disableRed = true;
        else if (type === 1)
          this.disableBlack = true;
        else if (type === 2)
          this.disableGreen = true;

        this.saveRoulette({type: type, amount: this.bet})
          .then(res => {
            this.bets = [];
            this.betAmount = 5000;

            this.betted = true;
            this.bettedNumber = type;

            this.toast('Erfolgreich', res.data.msg, 'success');
          })
          .catch(err => {
            this.toast('Fehler', err.response.data.msg, 'danger')
          });
        //this.$socket.client.emit("bet", {type: type, amount: this.bet});
        //TODO post
        //header.money = header.money - app.bet;
      },
      update: function update() {
        if (!this.running) {
          this.time = this.time + 50;

          this.barWidth = (this.time / 20000) * 100;

          this.barTimer = "<b>" + (Math.floor((20000 - this.time) / 1000) + 1) + "s</b>";
        }
      },
      getRed: function () {
        if (this.red.length)
          return this.red.slice().sort((a, b) => (a.bet > b.bet) ? 1 : -1).reverse()
      },
      getGreen: function () {
        if (this.green.length)
          return this.green.slice().sort((a, b) => (a.bet > b.bet) ? 1 : -1).reverse()
      },
      getBlack: function () {
        if (this.black.length)
          return this.black.slice().sort((a, b) => (a.bet > b.bet) ? 1 : -1).reverse()
      },
      setBet: function (value) {
        if (value >= 10 && value <= this.cash) {
          this.bet = value;
          this.bet = Math.round(this.bet);
        }
      },
      addBet: function (value) {
        if (this.bet + value >= 10 && this.bet + value <= this.cash) {
          this.bet = this.bet + value;
          this.bet = Math.round(this.bet);
        }
      },
      multiplyBet: function (value) {
        if (this.bet * value >= 10 && this.bet * value <= this.cash) {
          this.bet = this.bet * value;
          this.bet = Math.round(this.bet);
        }
      },
      toast(title, content, variant = null, append = false, toaster = 'b-toaster-top-right', autoHideDelay = 10000) {
        this.$bvToast.toast(content, {
          title: title,
          toaster: toaster,
          variant: variant,
          autoHideDelay: autoHideDelay,
          appendToast: append
        })
      }
    }
  }
</script>
