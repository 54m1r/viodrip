<template>
  <!-- Page Content -->
  <base-background image="img/photos/photo6@2x.jpg" inner-class="bg-white-95">
    <div class="hero-static">
      <div class="content">
        <b-row class="justify-content-center">
          <b-col md="8" lg="6" xl="4">
            <!-- Sign In Block -->
            <base-block themed fx-shadow class="mb-0" title="Anmeldung">
              <template #options>
                <!--router-link to="/auth/reminder" class="btn-block-option font-size-sm">Passwort vergessen?</router-link> -->
                <router-link to="/register" class="btn-block-option" v-b-tooltip.hover.nofade.left="'New Account'">
                  <i class="fa fa-user-plus"></i>
                </router-link>
              </template>
              <div class="p-sm-3 px-lg-4 py-lg-5">
                <h1 class="mb-2">VioDrip</h1>
                <p>Willkommen, melde dich bitte an.</p>

                <!-- Sign In Form -->
                <b-form @submit.stop.prevent="onSubmit">

                  <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>

                  <div class="py-3">
                    <div class="form-group">
                      <b-form-input size="lg" class="form-control-alt" id="username" name="username" placeholder="Vio-V Nutzername" v-model="$v.form.username.$model" :state="!$v.form.username.$error && null" aria-describedby="username-feedback"></b-form-input>
                      <b-form-invalid-feedback id="username-feedback">
                        Geben Sie bitte Ihren Vio-V Nutzernamen ein.
                      </b-form-invalid-feedback>
                    </div>
                    <div class="form-group">
                      <b-form-input type="password" size="lg" class="form-control-alt" id="password" name="password" placeholder="Passwort" v-model="$v.form.password.$model" :state="!$v.form.password.$error && null" aria-describedby="password-feedback"></b-form-input>
                      <b-form-invalid-feedback id="password-feedback">
                        Geben Sie bitte ihr Passwort ein
                      </b-form-invalid-feedback>
                    </div>
                  </div>
                  <b-row class="form-group">
                    <b-col md="6" xl="5">
                      <b-button type="submit" variant="primary" block>
                        <i class="fa fa-fw fa-sign-in-alt mr-1"></i> Anmelden
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
                <!-- END Sign In Form -->
              </div>
            </base-block>
            <!-- END Sign In Block -->
          </b-col>
        </b-row>
      </div>
      <div class="content content-full font-size-sm text-muted text-center">
        <strong>{{ $store.getters.appName + ' ' + $store.getters.appVersion }}</strong> &copy; {{ $store.getters.appCopyright }}
      </div>
    </div>
  </base-background>
  <!-- END Page Content -->
</template>

<script>
// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import {
  mapGetters,
  mapActions
} from "vuex";

export default {
  mixins: [validationMixin],
  data () {
    return {
      form: {
        username: "Samir",
        password: "hallo123"
      }
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(5)
      }
    }
  },
  computed: {
    ...mapGetters(['error'])
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit () {
      this.$v.form.$touch()

      if (this.$v.form.$anyError) {
        return
      }

      let user = {
        username: this.form.username,
        password: this.form.password
      };
      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>
