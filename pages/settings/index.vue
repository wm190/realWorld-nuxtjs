<template>
  <div>
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <form @submit.prevent="onSubmit">
              <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image"/>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name"  v-model="user.username"/>
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    v-model="user.bio"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email"/>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    v-model="user.password"
                  />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
              </fieldset>
            </form>
            <button class="btn btn-outline-danger" @click="logout">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUser, updateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'authenticated',
  data() {
    return {
      user: {
        email: '',
        image: '',
        bio: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    logout () {
      Cookie.remove('user')
      this.$store.commit('setUser', '')
      this.$router.push('/')
    },
    async onSubmit () {
      const { data } = await updateUser({
        user: this.user
      })
      delete this.user.password
      this.$store.commit('setUser', data.user)
      this.$router.push({
        name: 'profile',
        params: {
          username: data.user.username
        }
      })
    }
  },
  async mounted () {
    const { data } = await getUser()
    this.user = Object.assign({}, data.user)
    this.$store.commit('setUser', data.user)
  }
};
</script>

<style lang='less' scoped>
</style>
