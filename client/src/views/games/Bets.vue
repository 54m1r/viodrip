<template>
  <div>
    <!-- Page Content -->
    <div class="content">
      <!-- Stats -->

      <b-row>
        <b-col xl="8" sm="12">
          <b-row>
            <b-col md="4" sm="12" v-for="sport in filteredSports" v-bind:key="sport.id">
              <b-row>
                <b-col cols="12">
                  <h2 class="content-heading">{{ sport.name }} <small>{{ sport.leagues.length }} Wettbewerbe</small>
                  </h2>
                </b-col>
                <b-col v-for="league in sport.leagues" :key="league.id" cols="12" v-on:click="selectLeague(league)">
                  <base-block v-bind:class="{ 'bg-gray-light': selectedLeague.id === league.id }" tag="a" rounded
                              link-pop content-full>
                    <div class="font-size-sm font-w600 text-uppercase text-muted">
                      {{ league.matches.length }} Spiele
                    </div>
                    <div class="font-size-h2 font-w400 text-dark">
                      {{ league.name }}
                    </div>
                  </base-block>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <!-- END Stats -->

          <!-- Customers and Latest Orders -->
          <b-row class="row-deck">
            <!-- Latest Customers -->
            <b-col xl="12">
              <base-block :title="selectedLeague.name ? selectedLeague.name : 'Nächsten Spiele'" header-bg content-full>
                <b-table-simple responsive hover borderless class="table-vcenter font-size-sm mb-0">
                  <b-tbody>
                    <b-tr v-for="match in filteredMatches" :key="match.id">
                      <b-td v-if="moment.duration(moment.unix(match.start_date).diff(moment())).asHours() < 0"
                         style="width: 2%; font-size: 18px" class="text-black-50">
                        <b-badge variant="primary">● Live</b-badge>
                      </b-td>
                      <b-td v-else
                         style="width: 2%; font-size: 18px" class="text-black-50">
                         
                      </b-td>
                      <b-td style="width: 7%; font-size: 12px" class="text-muted">
                        <div style="float: left">
                          {{ moment.unix(match.start_date).local().calendar() }}<br>
                          {{ moment.unix(match.start_date).local().format('HH:mm') }} Uhr
                        </div>
                      </b-td>                        
                      <b-td style="width: 31%" class="text-black-50">
                          <strong>
                            {{ match.team_0 }}<br>
                            {{ match.team_1 }}
                            </strong>
                      </b-td>
                      <b-td style="width: 20%; padding-right: 2px;">
                        <b-button @click="bet(match, 0)" class="w-100" size="sm"
                                  :disabled="moment.duration(moment.unix(match.start_date).diff(moment())).asHours() < 0" 
                                  :variant="isBetActive(match.id, 0) ? 'secondary' : 'outline-secondary'">
                          <span style="font-size: 9px">{{ match.team_0 }}</span><br>
                          {{ match.odds_0 }}
                        </b-button>
                      </b-td>
                      <b-td style="width: 20%; padding-right: 2px; padding-left: 2px">
                        <b-button @click="bet(match, 2)" class="w-100" size="sm"
                                  :disabled="moment.duration(moment.unix(match.start_date).diff(moment())).asHours() < 0" 
                                  :variant="isBetActive(match.id, 2) ? 'secondary' : 'outline-secondary'"><span
                          style="font-size: 9px">Unentschieden</span><br>{{
                          match.odds_2 }}
                        </b-button>
                      </b-td>
                      <b-td style="width: 20%; padding-left: 2px">
                        <b-button @click="bet(match, 1)" cli class="w-100" size="sm"
                                  :disabled="moment.duration(moment.unix(match.start_date).diff(moment())).asHours() < 0" 
                                  :variant="isBetActive(match.id, 1) ? 'secondary' : 'outline-secondary'"><span
                          style="font-size: 9px">{{ match.team_1 }}</span><br>{{ match.odds_1 }}
                        </b-button>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </base-block>
            </b-col>
            <!-- END Latest Customers -->
          </b-row>

        </b-col>
        <b-col xl="4">
          <b-tabs id="tabs" style="top: 100px" class="sticky-top block" nav-class="nav-tabs-block"
                  content-class="block-content">
            <b-tab title="Wettscheine" active>
              <b-table-simple style="white-space:nowrap;" v-if="bets.length !== 0" responsive borderless
                              table-class="table-vcenter">
                <b-tbody>
                  <b-tr v-for="(bet, index) in bets" :key="bet.id">
                    <b-td>
                      <p v-if="bet.type === 0" class="font-w600 mb-1">Tipp: {{ bet.match.team_0 }} ({{ bet.match.odds_0
                        }})</p>
                      <p v-if="bet.type === 2" class="font-w600 mb-1">Tipp: Unentschieden ({{ bet.match.odds_2 }})</p>
                      <p v-if="bet.type === 1" class="font-w600 mb-1">Tipp: {{ bet.match.team_1 }} ({{ bet.match.odds_1
                        }})</p>
                      <div style="font-size: 12px" class="text-muted">{{ bet.match.team_0 }} vs {{ bet.match.team_1 }}
                      </div>
                    </b-td>
                    <b-td class="text-right">{{ formatMoney(betAmount) }}
                      <i @click="deleteBet(index)" :class="'fa fa-fw fa-times'"></i>
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td colspan="1" class="font-w600 text-right">Einsatz pro Wette</b-td>
                    <b-td class="text-right">
                      <b-form-input @keypress="isNumber($event)" size="sm" step="100" v-model="betAmount" type="number"
                                    placeholder="Einsatz pro Wette..."></b-form-input>
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td colspan="1" class="font-w600 text-right">Möglicher Gewinn</b-td>
                    <b-td class="text-right"><span
                      class="text-success">{{ formatMoney(getBetPossibleProfits()) }}</span></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td colspan="1" class="font-w600 text-right">Zwischensumme</b-td>
                    <b-td class="text-right">{{ formatMoney(getBetTotal()) }}</b-td>
                  </b-tr>
                  <b-tr>
                    <b-td colspan="1" class="font-w600 text-right">Gebühren</b-td>
                    <b-td class="text-right">5%</b-td>
                  </b-tr>
                  <b-tr>
                    <b-td colspan="1" class="font-w600 text-right">Fällige Gebühren</b-td>
                    <b-td class="text-right"><span class="text-danger"><del>{{ formatMoney(getBetTotal() * 0.05) }}</del></span>
                      $0
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td colspan="1" class="font-w700 text-uppercase text-right bg-body-light">Gesamt</b-td>
                    <b-td class="font-w700 text-right bg-body-light">{{ formatMoney(getBetTotal()) }}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
              <b-button @click.prevent="sendBets" v-if="isLoggedIn && bets.length !== 0" class="w-100 mb-5"
                        variant="success">{{
                formatMoney(getBetTotal()) }}
                Wette eingehen
              </b-button>
              <b-button to="/login" v-if="!isLoggedIn && bets.length !== 0" class="w-100 mb-5"
                        variant="primary">Anmelden, um {{
                formatMoney(getBetTotal()) }}
                Wette eingehen
              </b-button>
              <b-alert v-if="bets.length === 0" variant="info" show>
                <p class="mb-0">
                  Wählen Sie jetzt Ihren Wetten aus.
                </p>
              </b-alert>
            </b-tab>
            <b-tab v-if="user.betting_slips" :title="user.betting_slips.length +' Offene Wetten'">
              <b-table-simple v-if="user.betting_slips.length !== 0" responsive borderless
                              table-class="table-vcenter">
                <b-tbody>
                  <b-tr v-for="bet in user.betting_slips" :key="bet.id">
                    <b-td>
                      <p v-if="bet.type === 0" class="font-w600 mb-1">Tipp: {{ bet.match.team_0 }}</p>
                      <p v-if="bet.type === 2" class="font-w600 mb-1">Tipp: Unentschieden</p>
                      <p v-if="bet.type === 1" class="font-w600 mb-1">Tipp: {{ bet.match.team_1 }}</p>
                      <div style="font-size: 12px" class="text-muted">{{ bet.match.team_0 }} vs {{ bet.match.team_1 }}
                      </div>
                      <div style="font-size: 12px" class="text-muted">
                        {{ moment.unix(bet.match.start_date).local().calendar() }}, {{
                        moment.unix(bet.match.start_date).local().format('HH:mm') }} Uhr
                      </div>
                    </b-td>
                    <b-td class="text-right">{{ formatMoney(bet.money) }}
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-tab>
            <b-tab v-if="!isLoggedIn" title="0 Offene Wetten">
              <b-alert variant="info" show>
                <p class="mb-0">
                  Melden Sie sich an, um Ihre offenen Wetten zu sehen.
                </p>
              </b-alert>
            </b-tab>
          </b-tabs>
        </b-col>

      </b-row>
      <!-- END Customers and Latest Orders -->
    </div>
    <!-- END Page Content -->
  </div>
</template>

<script>
  import axios from 'axios';
  import {mapActions, mapGetters} from "vuex";
  import moment from 'moment';

  export default {
    components: {},
    data() {
      return {
        bets: [],
        matches: [],
        sports: [],
        selectedLeague: {},
        betAmount: 5000
      }
    },
    mounted() {
      axios
        .get('http://localhost:1337/api/bets')
        .then(response => {
          this.sports = response.data.sports;
          this.matches = response.data.matches;
        });


      this.bets = JSON.parse(localStorage.getItem('sport_bets') || '[]');
      this.betAmount = localStorage.getItem('bet_amount') || 5000;
    },
    computed: {
      ...mapGetters({
        user: "user",
        isLoggedIn: "isLoggedIn",
      }),
      filteredSports: function () {
        return this.sports.filter(sport => sport.leagues.length !== 0)
      },
      filteredMatches: function () {
        //wen liga ausgewählt
        if(this.selectedLeague.id) {
          return this.matches.filter(match => match.league_id === this.selectedLeague.id ? match.league_id === this.selectedLeague.id : match.highlight)
        } else {
          let todaysMatches =  this.matches.filter(match => 
            moment.unix(match.start_date).local().format('DDD-YYYY') === moment().local().format('DDD-YYYY'))
          
          let nextMatches = this.matches.slice().sort((a,b) => a.start_date - b.start_date);

          return todaysMatches.concat(nextMatches.slice(todaysMatches.length, 10));
        }
      }
    },
    watch: {
      bets: function () {
        localStorage.setItem('sport_bets', JSON.stringify(this.bets))
      },
      betAmount: function () {
        localStorage.setItem('bet_amount', this.betAmount)
      }
    },
    methods: {
      ...mapActions(["saveBets"]),
      sendBets() {
        this.saveBets({bets: this.bets, betAmount: this.betAmount})
          .then(res => {
            //console.log(res);
            this.toast('Erfolgreich', res.data.msg, 'success');
            this.bets = [];
            this.betAmount = 5000;
          })
          .catch(err => {
            this.toast('Fehler', err.response.data.msg, 'danger')
          });
      },
      bet(match, type) {

        if (this.isBetActive(match.id, type)) {
          this.bets.forEach((bet, index) => {
            if (bet.match.id === match.id && bet.type === type) {
              this.deleteBet(index);
            }
          });
        } else {
          this.bets.push(
            {
              match: match,
              type: type,
            }
          );
        }
      },
      deleteBet(index) {
        this.bets.splice(index, 1);
      },
      selectLeague(league) {
        if (this.selectedLeague === league)
          this.selectedLeague = {};
        else
          this.selectedLeague = league;
      },
      getBetPossibleProfits() {
        let betA = this.betAmount;
        return this.bets.reduce(function (a, b) {
          if (b.type === 0) {
            return a + (betA * b.match.odds_0);
          } else if (b.type === 1) {
            return a + (betA * b.match.odds_1);
          } else if (b.type === 2) {
            return a + (betA * b.match.odds_2);
          }
        }, 0);
      },
      isBetActive(match_id, odds_type) {
        let found = false;

        this.bets.forEach((bet) => {
          if (bet.match.id === match_id && bet.type === odds_type) {
            found = true;
          }
        });

        return found;
      },
      getBetTotal() {
        return this.betAmount * this.bets.length;
        /*return this.bets.reduce(function (a, b) {
          return a + this.betAmount;
        }, 0); */
      },
      formatMoney(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(value).replace(',', '.');
      },
      isNumber: function (evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();
        } else {
          return true;
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
