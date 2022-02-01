<template>
  <div>
    <!-- Hero -->
    <base-background image="img/photos/photo3@2x.jpg" inner-class="bg-primary-dark-op">
      <div class="content content-narrow content-full">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mt-5 mb-2 text-center text-sm-left">
          <div class="flex-sm-fill">
            <h1 class="font-w600 text-white mb-0">Administration</h1>
            <h2 class="h4 font-w400 text-white-75 mb-0">Willkommen Chef!</h2>
          </div>
          <div class="mt-3 mt-sm-0 ml-sm-3">
            <b-button variant="primary" class="px-4 py-2" href="javascript:void(0)" v-click-ripple>
              <i class="fa fa-plus mr-1"></i> New Project
            </b-button>
          </div>
        </div>
      </div>
    </base-background>
    <!-- END Hero -->

    <!-- Page Content -->
    <div class="content content-narrow">
      <!-- Stats -->
      <b-row>
        <b-col cols="6" md="3" lg="6" xl="3">
          <base-block tag="a" rounded link-pop content-full class="border-left border-primary border-4x" href="javascript:void(0)">
              <div class="font-size-sm font-w600 text-uppercase text-muted">
                Nutzer
              </div>
              <div class="font-size-h2 font-w400 text-dark">
                120
              </div>
          </base-block>
        </b-col>
        <b-col cols="6" md="3" lg="6" xl="3">
          <base-block tag="a" rounded link-pop content-full class="border-left border-primary border-4x" href="javascript:void(0)">
              <div class="font-size-sm font-w600 text-uppercase text-muted">
                Bilanz
              </div>
              <div class="font-size-h2 font-w400 text-dark">
                $3,200
              </div>
          </base-block>
        </b-col>
        <b-col cols="6" md="3" lg="6" xl="3">
          <base-block tag="a" rounded link-pop content-full class="border-left border-primary border-4x" href="javascript:void(0)">
              <div class="font-size-sm font-w600 text-uppercase text-muted">
                Offene Wetten
              </div>
              <div class="font-size-h2 font-w400 text-dark">
                40
              </div>
          </base-block>
        </b-col>
        <b-col cols="6" md="3" lg="6" xl="3">
          <base-block tag="a" rounded link-pop content-full class="border-left border-primary border-4x" href="javascript:void(0)">
              <div class="font-size-sm font-w600 text-uppercase text-muted">
                Gespielt Runden
              </div>
              <div class="font-size-h2 font-w400 text-dark">
                821
              </div>
          </base-block>
        </b-col>
      </b-row>
      <!-- END Stats -->

      <!-- Dashboard Charts -->
      <b-row>
        <!--<b-col lg="6">
          <base-block title="Earnings in $" header-bg>
            <template #options>
              <button type="button" class="btn-block-option">
                  <i class="si si-settings"></i>
              </button>
            </template>
            <template #content>
              <div class="block-content p-0">
                <div class="pt-3">
                  <chartjs-line :chart-data="chartjsEarningsData" :options="chartjsEarningsOptions" :styles="chartjsStyles"></chartjs-line>
                </div>
              </div>
              <div class="block-content">
                <b-row class="items-push text-center py-3">
                  <b-col cols="6" xl="3">
                    <i class="fa fa-wallet fa-2x text-muted"></i>
                    <div class="text-muted mt-3">$148,000</div>
                  </b-col>
                  <b-col cols="6" xl="3">
                    <i class="fa fa-angle-double-up fa-2x text-muted"></i>
                    <div class="text-muted mt-3">+9% Earnings</div>
                  </b-col>
                  <b-col cols="6" xl="3">
                    <i class="fa fa-ticket-alt fa-2x text-muted"></i>
                    <div class="text-muted mt-3">+20% Tickets</div>
                  </b-col>
                  <b-col cols="6" xl="3">
                    <i class="fa fa-users fa-2x text-muted"></i>
                    <div class="text-muted mt-3">+46% Clients</div>
                  </b-col>
                </b-row>
              </div>
            </template>
          </base-block>
        </b-col> -->
        <!--<b-col lg="6">
          <base-block title="Sales" header-bg>
            <template #options>
              <button type="button" class="btn-block-option">
                  <i class="si si-settings"></i>
              </button>
            </template>
            <template #content>
              <div class="block-content p-0">
                <div class="pt-3">
                  <chartjs-line :chart-data="chartjsSalesData" :options="chartjsSalesOptions" :styles="chartjsStyles"></chartjs-line>
                </div>
              </div>
              <div class="block-content">
                <b-row class="items-push text-center py-3">
                  <b-col cols="6" xl="3">
                    <i class="fab fa-wordpress fa-2x text-muted"></i>
                    <div class="text-muted mt-3">+20% Themes</div>
                  </b-col>
                  <b-col cols="6" xl="3">
                    <i class="fa fa-font fa-2x text-muted"></i>
                    <div class="text-muted mt-3">+25% Fonts</div>
                  </b-col>
                  <b-col cols="6" xl="3">
                    <i class="fa fa-archive fa-2x text-muted"></i>
                    <div class="text-muted mt-3">-10% Icons</div>
                  </b-col>
                  <b-col cols="6" xl="3">
                    <i class="fa fa-paint-brush fa-2x text-muted"></i>
                    <div class="text-muted mt-3">+8% Graphics</div>
                  </b-col>
                </b-row>
              </div>
            </template>
          </base-block>
        </b-col> -->
      </b-row>
      <!-- END Dashboard Charts -->

      <!-- Customers and Latest Orders -->
      <b-row class="row-deck">
        <!-- Latest Customers -->
        <b-col xl="6">
          <base-block title="Offene Spiele mit Wetten" header-bg content-full>
            <template #options>
              <button type="button" class="btn-block-option">
                <i class="si si-settings"></i>
              </button>
            </template>
            <b-table-simple striped hover borderless class="table-vcenter font-size-sm mb-0">
              <b-thead>
                <b-tr>
                  <b-th class="font-w700" style="width: 80px;">ID</b-th>
                  <b-th class="font-w700">Spiel</b-th>
                  <b-th class="d-none d-sm-table-cell font-w700">1</b-th>
                  <b-th class="d-none d-sm-table-cell font-w700">x</b-th>
                  <b-th class="d-none d-sm-table-cell font-w700">2</b-th>
                  <b-th class="font-w700 text-center" style="width: 60px;"></b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="match in matches" :key="match.id">
                  <b-td>
                    <a class="font-w600" href="javascript:void(0)">#{{ match.id }}</a>
                  </b-td>
                 <b-td class="text-black-50">
                     <a class="link-fx" href="javascript:void(0)"><b>{{ match.team_0 }} - {{ match.team_1 }}</b></a>,<br> 
                     <small>{{ moment.unix(match.start_date).local().calendar() }} {{ moment.unix(match.start_date).local().format('HH:mm') }} Uhr</small>
                    </b-td>
                   <b-td class="d-none d-sm-table-cell">
                    {{ match.odds_0 }} <br>
                    <span v-if="getMatchBalance(match, 0) >= 0" class="text-success">+{{ formatMoney(getMatchBalance(match, 0)) }}</span>
                   <span v-else class="text-danger">{{ formatMoney(getMatchBalance(match, 0)) }}</span>
                  </b-td>
                   <b-td class="d-none d-sm-table-cell">
                   {{ match.odds_1 }} <br>
                   <span v-if="getMatchBalance(match, 1) >= 0" class="text-success">+{{ formatMoney(getMatchBalance(match, 1)) }}</span>
                   <span v-else class="text-danger">{{ formatMoney(getMatchBalance(match, 1)) }}</span>
                  </b-td>
                   <b-td class="d-none d-sm-table-cell">
                    {{ match.odds_2 }} <br>
                    <span v-if="getMatchBalance(match, 2) >= 0" class="text-success">+{{ formatMoney(getMatchBalance(match, 2)) }}</span>
                   <span v-else class="text-danger">{{ formatMoney(getMatchBalance(match, 2)) }}</span>
                  </b-td>
                  <b-td class="text-center">
                    <a href="javascript:void(0)" v-b-tooltip.hover.nofade.left="'Abschließen'">
                      <i class="fa fa-fw fa-poll-h"></i>
                    </a>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </base-block>
        </b-col>
        <!-- END Latest Customers -->

        <!-- Latest Orders -->
        <b-col xl="6">
          <base-block title="Letzte Wetten" header-bg content-full>
            <template #options>
              <button type="button" class="btn-block-option">
                <i class="si si-settings"></i>
              </button>
            </template>
             <b-table-simple striped hover borderless class="table-vcenter font-size-sm mb-0">
              <b-thead>
                <b-tr>
                  <b-th class="font-w700" style="width: 80px;">ID</b-th>
                  <b-th class="font-w700">Spieler</b-th>
                  <b-th class="font-w700">Spiel</b-th>
                  <b-th class="d-none d-sm-table-cell font-w700">Wette</b-th>
                  <b-th class="d-none d-sm-table-cell font-w700">Einsatz</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="betting_slip in latestBettingSlips" :key="betting_slip.id">
                  <b-td>
                    <a class="font-w600" href="javascript:void(0)">#{{ betting_slip.id }}</a>
                  </b-td>
                  <b-td>
                    <a class="link-fx font-w600" href="javascript:void(0)">{{ betting_slip.user.username }}</a>
                  </b-td>
                 <b-td class="text-black-50">
                     <a class="link-fx" href="javascript:void(0)"><b>{{ betting_slip.match.team_0 }} - {{ betting_slip.match.team_1 }}</b></a>,<br> 
                     <small>{{ moment.unix(betting_slip.match.start_date).local().calendar() }} {{ moment.unix(betting_slip.match.start_date).local().format('HH:mm') }} Uhr</small>
                    </b-td>
                   <b-td class="d-none d-sm-table-cell">
                      <span v-if="betting_slip.type === 0">Tipp: {{ betting_slip.match.team_0 }}</span>
                      <span v-if="betting_slip.type === 2">Tipp: Unentschieden</span>
                      <span v-if="betting_slip.type === 1">Tipp: {{ betting_slip.match.team_1 }}</span>
                  </b-td>
                   <b-td class="d-none d-sm-table-cell">
                    {{ formatMoney(betting_slip.money) }} <br> <small>{{ betting_slip.odd }} <b>{{ formatMoney(betting_slip.money*betting_slip.odd) }}</b></small>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </base-block>
        </b-col>
        <!-- END Latest Orders -->
      </b-row>
      <!-- END Customers and Latest Orders -->
    </div>
    <!-- END Page Content -->
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data () {
    return {
      matches: [],
      betting_slips: [],
    }
  },
  computed: {
    latestBettingSlips: function () {
      return this.betting_slips.sort((a,b) => a.id + b.id);
    }
  },
  mounted() {
      axios
        .get('http://localhost:1337/api/admin/bets')
        .then(response => {
          this.matches = response.data.matches;
          this.betting_slips = response.data.betting_slips;
        });

    },
  methods: {
    formatMoney(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(value).replace(',', '.');
      },
       getMatchBalance(match, type) {
         let result = 0;
         match.bettingSlips.forEach(betting_slip => {
           if(betting_slip.type === type) {
            result = result - (betting_slip.money * betting_slip.odd) + betting_slip.money;
           } else {
             result = result + betting_slip.money;
           }
         });

         return result;
      },
  },
  created () {
      
  }
}
</script>
