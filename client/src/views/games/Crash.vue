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
      <div class="row">
        <div class="col-sm-12">
          <div id="blockId" class="block">
            <div class="block-header">
              <h3 class="block-title">Crash</h3>
              <div class="block-options">
                <button type="button" class="btn-block-option">
                  <i class="si si-info"></i>
                </button>
              </div>
            </div>

            <div class="progress position-relative rounded-0 bg-primary-dark" style="display: none"
                 id="mbar">
              <div class="progress-bar" role="progressbar" id="bar" style="width: 60%" aria-valuenow="60"
                   aria-valuemin="0" aria-valuemax="100"></div>
              <small id="timer"
                     class="text-white justify-content-center d-flex position-absolute w-100"></small>
            </div>
            <div class="block-content">
              <div class='roulette-wrapper text-center justify-content-center'>
                <!--<canvas style="height:20vh; width:80vw" class="js-chartjs-lines"></canvas> -->
                <crash-chart style="height:20vh; width:80vw"></crash-chart>

              </div>

              <div id="roulette">
                <div class="scores row">
                  <div id="last-score" class="col-sm-12">
                    <div class="history">
                      <div class="history-title">Historie</div>
                      <div v-for="entry in history" :key="entry.id"
                           class="history-box bg-body text-primary">
                        {{ entry.number }}.76x
                      </div>
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
                        <button v-on:click="multiplyBet(0.5)" style="border: 0"
                                type="button"
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
                    <div class="col-2"></div>
                    <div class="col-8">
                      <ul class="list-group">

                        <button v-on:click="startBet()" v-if="!running"
                                class="list-group-item list-group-item-action text-white bg-success min-height-75 text-center font-size-h5">
                          <b>Setzen</b></button>
                        <button v-on:click="startBet()" v-if="running"
                                class="list-group-item list-group-item-action text-white bg-danger min-height-75 text-center font-size-h5">
                          <b>Auszahlen</b></button>
                        <transition-group name="list" tag="p">
                          <li v-for="bet in getBets()" :key="bet.text"
                              class="list-group-item d-flex justify-content-between py-2 align-items-center list-item">
                            <div style="align: left">
                              <img class="img-avatar img-avatar20"
                                   src="https://www.w3schools.com/w3images/avatar2.png"
                                   alt="">
                              {{ bet.text }}
                            </div>
                            <span>${{ bet.bet }}</span>
                          </li>
                        </transition-group>


                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    <!-- END Dummy content -->
  </div>
</template>

<script>
import {mapActions} from "vuex";
import CrashChart from "./CrashChart";

export default {
  components: {
    CrashChart
  },
  data() {
    return {
      //chartData: [],
      history: [],
      bet: undefined,
      cash: 100000,
      disable: false,
      bets: [],
      running: false,
      red: [],
      green: [],
      black: [],
      lastRed: 20,
      lastGreen: 10,
      lastBlack: 20,
      disableRed: false,
      disableGreen: false,
      disableBlack: false,
      betted: false,
      hash: 'loading..',

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
    //this.initWheel();

    //setInterval(this.update, 50);
  },
  sockets: {
    connect() {
      console.log('socket connected')
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

      console.log("Initialisiere..");
      //console.log(app.red);
      this.running = data.running;
      this.history = data.history.reverse();
      //console.log("bets: " + data.bets.length);
      for (let i = 0; i < data.bets.length; i++) {
        //console.log(data.bets[i].type);
        this.bets.push({
          text: data.bets[i].name,
          bet: data.bets[i].amount
          // console.log("asd");
        });
      }

      //console.log("init: " + JSON.stringify(data));

    },
    startBet(type) {
      alert(type);
    },
    update: function update() {
      if (!this.running) {
        this.time = this.time + 50;

        this.barWidth = (this.time / 20000) * 100;

        this.barTimer = "<b>" + (Math.floor((20000 - this.time) / 1000) + 1) + "s</b>";
      }
    },
    getBets: function () {
      if (this.bets.length)
        return this.bets.slice().sort((a, b) => (a.bet > b.bet) ? 1 : -1).reverse()
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
