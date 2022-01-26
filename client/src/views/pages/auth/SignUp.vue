<template>
  <!-- Page Content -->
  <div class="hero-static">
    <div class="content">
      <b-row class="justify-content-center">
        <b-col md="8" lg="6" xl="4">
          <!-- Sign Up Block -->
          <base-block themed fx-shadow class="mb-0" header-class="bg-success" title="Registrierung">
            <template #options>
              <!-- Terms Modal -->
              <button type="button" class="btn-block-option font-size-sm" v-b-modal.one-signup-terms>
                Geschäftsbedingungen ansehen
              </button>
              <b-modal id="one-signup-terms" size="lg" body-class="p-0" hide-footer hide-header>
                <div class="block block-themed block-transparent mb-0">
                  <div class="block-header bg-primary-dark">
                    <h3 class="block-title">Geschäftsbedingungen</h3>
                    <div class="block-options">
                      <button type="button" class="btn-block-option" @click="$bvModal.hide('one-signup-terms')">
                        <i class="fa fa-fw fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div class="block-content">
                    <p>
                      Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus
                      mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor
                      tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum
                      quis in sit varius lorem sit metus mi.
                    </p>
                    <p>
                      Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus
                      mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor
                      tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum
                      quis in sit varius lorem sit metus mi.
                    </p>
                    <p>
                      Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus
                      mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor
                      tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum
                      quis in sit varius lorem sit metus mi.
                    </p>
                    <p>
                      Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus
                      mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor
                      tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum
                      quis in sit varius lorem sit metus mi.
                    </p>
                    <p>
                      Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus
                      mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor
                      tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum
                      quis in sit varius lorem sit metus mi.
                    </p>
                  </div>
                  <div class="block-content block-content-full text-right border-top">
                    <b-button variant="light" size="sm" @click="$bvModal.hide('one-signup-terms')">Schließen</b-button>
                    <b-button variant="primary" size="sm" @click="$bvModal.hide('one-signup-terms')">Ich stimme zu
                    </b-button>
                  </div>
                </div>
              </b-modal>
              <!-- END Terms Modal -->

              <router-link to="/login" class="btn-block-option" v-b-tooltip.hover.nofade.left="'Anmelden'">
                <i class="fa fa-sign-in-alt"></i>
              </router-link>
            </template>
            <div class="p-sm-3 px-lg-4 py-lg-5">
              <h1 class="mb-2">VioDrip</h1>
              <p>Bitte geben Sie die folgenden Angaben ein, um ein neues Konto zu erstellen.</p>

              <!-- Sign Up Form -->
              <b-form @submit.stop.prevent="onSubmit">

                <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>

                <div class="py-3">
                  <div class="form-group">
                    <b-form-input size="lg" class="form-control-alt" id="username" name="username"
                                  placeholder="Vio-V Nutzername" v-model="$v.form.username.$model"
                                  :state="!$v.form.username.$error && null"
                                  aria-describedby="username-feedback"></b-form-input>
                    <b-form-invalid-feedback id="username-feedback">
                      Geben Sie bitte Ihren Vio-V Nutzernamen ein.
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <b-input-group>
                      <b-form-input id="forum_id" name="forum_id" class="form-control-alt"
                                    v-model="$v.form.forum_id.$model"
                                    :state="!$v.form.forum_id.$error && null"
                                    placeholder="Vio-V Forum-Identifikator"
                                    aria-describedby="forum_id-feedback"></b-form-input>
                      <b-input-group-append>
                        <b-button id="forum_id_help" variant="primary">
                          <i class="fa fa-question"></i>
                        </b-button>
                        <b-popover target="forum_id_help" triggers="hover" placement="top">
                          Deinen Forum-Identifikator findest du, wenn du im Vio-V Forum auf
                          'Mein
                          Profil' klickst und die Zahl aus der URL raussuchst. <br>
                          z.B. https://forum.vio-v.com/index.php?user/<b>4506</b>-samir/
                        </b-popover>
                      </b-input-group-append>
                      <b-form-invalid-feedback id="forum_id-feedback">
                        Geben Sie bitte Ihren Vio-V Forum-Identifikator an
                      </b-form-invalid-feedback>
                    </b-input-group>

                  </div>
                  <div class="form-group">
                    <b-form-input type="password" size="lg" class="form-control-alt" id="password" name="password"
                                  placeholder="Passwort (Nicht von Vio-V)" v-model="$v.form.password.$model"
                                  :state="!$v.form.password.$error && null"
                                  aria-describedby="password-feedback"></b-form-input>
                    <b-form-invalid-feedback id="password-feedback">
                      Geben Sie bitte ein sicheres Passwort ein
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <b-form-input type="password" size="lg" class="form-control-alt" id="password2" name="password2"
                                  placeholder="Passwort Wiederholen" v-model="$v.form.password2.$model"
                                  :state="!$v.form.password2.$error && null"
                                  aria-describedby="password2-feedback"></b-form-input>
                    <b-form-invalid-feedback id="password2-feedback">
                      Wiederholen Sie bitte Ihr Passwort
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <b-form-checkbox id="terms" name="terms" v-model="$v.form.terms.$model"
                                     :state="!$v.form.terms.$error && null" aria-describedby="terms-feedback">Ich
                      bestätige die Geschäftsbedingungen
                    </b-form-checkbox>
                    <b-form-invalid-feedback id="terms-feedback"
                                             :state="$v.form.terms.$dirty ? !$v.form.terms.$error : null">
                      Sie müssen die Geschäftsbedingungen bestätigen!
                    </b-form-invalid-feedback>
                  </div>
                </div>
                <b-row class="form-group">
                  <b-col md="6" xl="5">
                    <b-button type="submit" variant="success" block>
                      <i class="fa fa-fw fa-plus mr-1"></i> Registrieren
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
              <!-- END Sign Up Form -->
            </div>
          </base-block>
          <!-- END Sign Up Block -->
        </b-col>
      </b-row>
    </div>
    <div class="content content-full font-size-sm text-muted text-center">
      <strong>{{ $store.getters.appName + ' ' + $store.getters.appVersion }}</strong> &copy; {{
      $store.getters.appCopyright }}
    </div>
  </div>
  <!-- END Page Content -->
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex";
  // Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
  import {validationMixin} from 'vuelidate'
  import {required, minLength, integer, sameAs} from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data() {
      return {
        form: {
          username: "Samir",
          forum_id: 4506,
          password: "hallo123",
          password2: "hallo123",
          terms: true
        }
      }
    },
    validations: {
      form: {
        username: {
          required,
          minLength: minLength(3)
        },
        forum_id: {
          required,
          integer
        },
        password: {
          required,
          minLength: minLength(5)
        },
        password2: {
          required,
          sameAsPassword: sameAs('password')
        },
        terms: {
          sameAs: sameAs(() => true)
        }
      }
    },
    computed: {
      ...mapGetters(['error'])
    },
    methods: {
      ...mapActions(["register"]),
      onSubmit() {
        this.$v.form.$touch();

        if (this.$v.form.$anyError) {
          return
        }

        let user = {
          username: this.form.username,
          password: this.form.password,
          forum_id: this.form.forum_id,
          confirm_password: this.form.password2,
        };

        this.register(user).then(res => {
          if (res) {
            console.log(JSON.stringify(res));
            if (res.data.success) {
              this.$router.push("login");
            }
          }
        });
      }
    }
  }
</script>
