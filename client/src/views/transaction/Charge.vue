<template>
  <div>
    <!-- Page Content -->
    <div class="content">
      <!-- Your Block -->
      <base-block title="Geld Einzahlen">
        <template #options>
          <button type="button" class="btn-block-option">
            <i class="si si-cog"></i>
          </button>
        </template>
        <b-form @submit.stop.prevent="charge">
          <b-row class="push">
            <b-col lg="4">
              <p class="font-size-sm text-muted">
                Wähle hier deinen den Mitarbeiter aus, bei welchem du die Einzahlung tätigen möchtest.
              </p>
            </b-col>
            <b-col lg="8" xl="5">
              <b-form-group label="Mitarbeiter" label-for="admin">
                <b-form-select required id="admin" v-model="selectedAdmin" :options="admins"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="push">
            <b-col lg="4">
              <p class="font-size-sm text-muted">
                Hier musst du deinen Beweis für die Überweisung eintragen. <br> Hierfür reicht ein Screenshot von der Überweisung in dem Geldautomat auf Vio-V. <br>
                Dieses Bild kannst auf Seiten wie z. B. <a href="https://imgur.com/">Imgur</a> hochladen.
              </p>
            </b-col>
            <b-col lg="8" xl="5">
              <b-form-group label="Beweis" label-for="proof">
                <b-form-input required id="proof" type="text" v-model="proof" placeholder="Beweis..."></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="push">
            <b-col lg="4">
              <p class="font-size-sm text-muted">
                Das monatliche Limit beträgt $200.000!
              </p>
            </b-col>
            <b-col lg="8" xl="5">
              <b-form-group label="Betrag" label-for="money">
                <b-form-input required id="money" v-model="money" max="200000" placeholder="Betrag..."></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="7" offset-lg="4">
              <div v-if="selectedAdmin !== null && money !== 0" class="form-group">
                <b-form-checkbox required id="transferred" name="transferred">Ich habe <b>{{ getOptionByValue().text }}</b> <b>{{ formatMoney(money) }}</b> überwiesen.
                </b-form-checkbox>
              </div>
              <b-button type="submit" variant="success">Einzahlung tätigen</b-button>
            </b-col>
          </b-row>
        </b-form>
      </base-block>
      <!-- END Your Block -->
    </div>
    <!-- END Page Content -->
  </div>
</template>

<script>
  import {mapActions} from "vuex";
  import axios from "axios";

  export default {
    data () {
      return {
        admins: [],
        selectedAdmin: null,
        money: null,
        proof: null,
      }
    },
    mounted() {
      axios
        .get('http://localhost:1337/api/admins/payin')
        .then(response => {
          alert(JSON.stringify(response.data));
          this.admins = response.data.admins;
        });
    },
    methods:{
      ...mapActions(["charge", "getProfile"]),
      charge() {
        this.charge({admin: this.selected, money: this.money})
          .then(res => {
            this.toast('Erfolgreich', res.data.msg, 'success');
            this.getProfile();
          })
          .catch(err => {
            this.toast('Fehler', err.response.data.msg, 'danger')
          });
      },
      formatMoney(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(value).replace(',', '.');
      },
      getOptionByValue() {
       return this.options.find(option => option.value === this.selected);
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
