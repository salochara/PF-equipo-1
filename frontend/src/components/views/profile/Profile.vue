<template>
  <section>
    <div v-if="loading" class="content content-centered">
      <pulse-loader></pulse-loader>
    </div>

    <div v-show="!loading" class="content">

      <div class="flash-message text-center" v-if="updateRequiredMessage">
        <div class="alert" :class="'alert-info'">{{updateRequiredMessage}}</div>
      </div>

      <div class="box box-danger">
        <div class="box-body">

          <ul class="nav nav-tabs">
            <li :class="pictureActive"><a data-toggle="tab" href="#profile">Details</a></li>
          </ul>

          <div class="tab-content content">
            <div id="profile" class="tab-pane fade in" :class="pictureActive">
              <profile-image></profile-image>
              <div class="col-md-12">
                <vue-form :state="formstate" @submit.prevent="onSubmit" class="row">

                  <validate auto-label class="form-group" :class="fieldClassName(formstate.firstName)">
                    <vue-form-input
                      required
                      v-model="newProfile.firstName"
                      :formstate="formstate"
                      :type="'text'"
                      :label="'First Name:'"
                      :name="'firstName'"
                      :messages="{ required: 'This field is required' }">
                    </vue-form-input>
                  </validate>

                  <validate auto-label class="form-group" :class="fieldClassName(formstate.lastName)">
                    <vue-form-input
                      required
                      v-model="newProfile.lastName"
                      :formstate="formstate"
                      :type="'text'"
                      :label="'Last Name:'"
                      :name="'lastName'"
                      :messages="{ required: 'This field is required' }">
                    </vue-form-input>
                  </validate>

                  <validate auto-label class="form-group" :class="fieldClassName(formstate.email)" :debounce="250" :custom="{ email: emailValidator, notUnique: emailUniqueValidator }">
                    <vue-form-input
                      required
                      v-model="newProfile.email"
                      :formstate="formstate"
                      :type="'email'"
                      :label="'Email:'"
                      :name="'email'"
                      :messages="{ email: 'Please input a valid email', required: 'This field is required', notUnique: 'That email is already in use.' }">
                    </vue-form-input>
                  </validate>
                </vue-form>

                <div class="py-2 text-center row" style="margin-top: 10px">
                  <button class="btn btn-primary" type="submit" @click="updateProfile" :disabled="formstate.$pristine || formstate.$invalid">Update Profile</button>
                  <button class="btn btn-primary" type="submit" @click="clearChanges" :disabled="formstate.$pristine">Clear Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <box :classes="['box-danger']"
             :disableFooter="false" :headerBorder="true" :noPadding="false">
          <div slot="header">
            <h3 class="box-title">Payment Methods</h3>
          </div>
          <!-- /box-header -->
          <!-- /box-tools -->

          <div slot="body">
            <ul class="users-list">
              <li  v-for="card in cards">
                  <div style="border-radius:50%" v-if="card.brand == 'Visa'">
                    <img  src="/static/img/chasit/visa@3x.png" alt="Card Image">
                  </div>
                  <div v-else-if="card.brand == 'MasterCard'">
                    <img src="/static/img/chasit/mastercard@3x.png" alt="Card Image">
                  </div>
                  <div v-else-if="card.brand == 'American Express'">
                    <img src="/static/img/chasit/americanexpress@3x.png" alt="Card Image">
                  </div>
                <h5>{{"•••• " + card.last4}}</h5>
              </li>
            </ul>
            <!-- /.users-list -->
          </div>
          <div v-if="loading" class="overlay">
            <i class="fa"><pulse-loader></pulse-loader></i>
          </div>
          <!-- /.overlay -->
        </box>
        </div>
    </div>
  </section>
</template>

<script>
  import ProfileImage from './ProfileImage.vue'
  import { userService, authService, formService, eventBus } from '../../../services'
  import { EVENTS } from '../../../config'
  import swal from 'sweetalert2'

  import { chasitService } from '../../../services'


  import _ from 'lodash'

  export default {
    name: 'Profile',
    components: {
      ProfileImage
    },
    data () {
      return {
        ready: false,
        loading: false,
        detailsActive: '',
        pictureActive: '',
        settingsActive: '',
        updateRequiredMessage: '',
        newProfile: {},
        oldProfile: {},
        passwordFormstate: {},
        formstate: {},
        pinFormstate: {},
        newPassword: '',
        confirmPassword: '',
        pin: null,
        passwordScore: 0,
        passwordScoreUpdating: false,
        cards: {}
      }
    },
    methods: {
      fieldClassName: formService.fieldClassName,
      emailValidator: formService.emailValidator,
      emailUniqueValidator (email) {
        return formService.emailUniqueValidator(email, this.oldProfile.email)
      },
      getYeloCards () {
        this.loading = true
        chasitService.getChazitUserCard()
          .then((result) => {
            this.loading = false
            this.cards = result.data.data
            console.log(result)
          })
          .catch((error) => {
            console.error(error)
            this.$snotify.error('Failed Getting Categories from Azure', 'Error!')
          })
      },
      minlengthValidator (minlength) {
        // the masked input comes with '_' chars, so we need to remove those before checking the length
        return (input) => { return formService.minlengthValidator(input.split('_')[0], minlength) }
      },
      passwordScoreValidator () {
        return formService.passwordScoreValidator(this.passwordScore)
      },
      passwordConfirmValidator (confirmPassword) {
        return formService.passwordConfirmValidator(this.newPassword, confirmPassword)
      },
      validateConfirm () {
        this.passwordFormstate.confirmPassword._validate()
      },
      clearChanges () {
        this.newProfile = _.cloneDeep(this.oldProfile)
        this.formstate._reset()
      },
      updateProfile () {
        this.loading = true
        return userService.updateUserProfile(this.newProfile)
          .then((response) => {
            this.loading = false
            this.formstate._reset()
            this.oldProfile = _.cloneDeep(this.newProfile)
            // Update the global user object
            const user = Object.assign(this.$store.state.auth.user, this.newProfile)
            user.profileImageUrl = this.profileImageUrl
            this.$store.commit('auth/SET_USER', user)
            this.$snotify.success('Profile updated', 'Success!')
          })
          .catch((error) => {
            this.loading = false
            console.error('UserProfile.updateProfile-error:', error)
            this.$snotify.error('Update profile failed', 'Error!')
          })
      },
      updatePassword () {
        this.loading = true
        userService.updateUserPassword(this.newPassword)
          .then((response) => {
            this.loading = false
            this.newPassword = ''
            this.confirmPassword = ''
            this.passwordFormstate._reset()
            // Update the global user object
            const user = Object.assign(this.$store.state.auth.user, { passwordUpdateRequired: false })
            this.$store.commit('auth/SET_USER', user)
            this.$snotify.success('Password updated', 'Success!')
          })
          .catch((error) => {
            this.loading = false
            console.error('UserProfile.updatePassword-error:', error)
            this.$snotify.error('Update password failed', 'Error!')
          })
      },
      updatePIN () {
        this.loading = true
        userService.updateUserPIN(this.pin)
          .then((response) => {
            this.loading = false
            this.pinFormstate._reset()
            // Update the global user object
            const user = Object.assign(this.$store.state.auth.user, { pinUpdateRequired: false })
            this.$store.commit('auth/SET_USER', user)
            this.$snotify.success('PIN updated', 'Success!')
          })
          .catch((error) => {
            this.loading = false
            console.error('UserProfile.updatePIN-error:', error)
            this.$snotify.error('Update pin failed', 'Error!')
          })
      },
      deleteUserModal () {
        swal({
          title: 'Are you sure?',
          text: 'This will permanently delete your account!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.deleteUser()
          }
        })
      },
      deleteUser () {
        this.loading = true
        return userService.deleteCurrentAccount(this.newProfile._id)
          .then((response) => {
            this.loading = false
            return swal(
              'Deleted!',
              'Your account has been deleted.',
              'success'
            )
          })
          .then((result) => {
            authService.logout()
            this.$router.push('/login')
          })
          .catch((error) => {
            this.loading = false
            console.error('UserProfile.deleteUser-error:', error)
            this.$snotify.error('Delete account failed', 'Error!')
          })
      }
    },
    created () {
      // Filter out unneeded user properties for the profile
      this.newProfile = (({ email, firstName, lastName, title, education, location, bio }) => {
        return { email, firstName, lastName, title, education, location, bio }
      })(this.$store.state.auth.user)

      this.oldProfile = _.cloneDeep(this.newProfile)
      this.getYeloCards()
      // Set the active tab
      if (this.$route.query.details) {
        this.detailsActive = 'active'
      } else if (this.$route.query.settings) {
        this.settingsActive = 'active'
      } else {
        this.pictureActive = 'active'
      }
      // Notify the user of any required updates
      if (this.$store.state.auth.user.passwordUpdateRequired && this.$store.state.auth.user.pinUpdateRequired) {
        this.updateRequiredMessage = 'You must update your password and PIN to continue.'
      } else if (this.$store.state.auth.user.passwordUpdateRequired) {
        this.updateRequiredMessage = 'You must update your password to continue.'
      } else if (this.$store.state.auth.user.pinUpdateRequired) {
        this.updateRequiredMessage = 'You must update your PIN to continue.'
      }

      eventBus.$on(EVENTS.PASSWORD_SCORE_UPDATED, (passwordScore) => {
        this.passwordScoreUpdating = false
        this.passwordScore = passwordScore
      })
      eventBus.$on(EVENTS.UPDATING_PASSWORD_SCORE, () => {
        this.passwordScoreUpdating = true
      })
    }
  }
</script>
