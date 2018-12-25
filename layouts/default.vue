<template>
  <div>
    <div class="header">
      <div class="leftbox">
        <nuxt-link to="/">
          <span class="tensyoku">転職</span>
          <span class="kaigi">会議</span>
          <span class="business">BUSINESS</span>
          <span class="hackdays">for Hack Days</span>
        </nuxt-link>
      </div>
      <div class="rightbox">
        <div
          v-if="isSignedIn"
          class="user">
          <div class="profile-image">
            <img :src="currentUser.profileImage" />
          </div>
          <div class="name">
            {{ currentUser.name }}
          </div>
        </div>
        <div
          v-else
          class="login-button"
          @click="googleLogin">
          googleでログイン
        </div>
      </div>
    </div>
    <div class="sidebar">
      <ul>
        <li>
          <nuxt-link to="/job_posting_applications">
            応募者一覧
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/job_postings">
            求人票一覧
          </nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    googleLogin() {
      this.signIn()
    },
    ...mapActions('user', ['watchSignedInState', 'signIn'])
  },
  computed: {
    ...mapGetters('user', ['isSignedIn', 'currentUser', 'loading'])
  },
  mounted() {
    this.watchSignedInState()
  },
  watch: {
    loading(val) {
      if (val) {
        this.$nuxt.$loading.start()
      } else {
        this.$nuxt.$loading.finish()
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/common';
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  margin: 0;
  background: $bgColor;
  color: $fontMainColor;
}

input[type="text"], 
input[type="password"], 
textarea, 
select {
    outline: none;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.header {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 16px;
  background: $headerColor;
  border-bottom: 1px solid #222;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);


  display: flex;
  justify-content: space-between;
  align-items: center;
  .leftbox {
    font-size: 0;
    a {
      color: $fontGrayColor;
      text-decoration: none;
      .tensyoku {
        font-size: $sizeMd;
        font-weight: bold;
      }
      .kaigi {
        font-size: $sizeMd;
        font-weight: normal;
      }
      .business {
        font-size: $sizeMd;
        color: $mainColor;
        margin-right: 8px;
      }
      .hackdays {
        font-size: $sizeMd;
      }
    }
  }
  .rightbox {
    color: $fontGrayColor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .buttons {
      .button {
        font-size: $sizeMd;
      }
    }
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .profile-image {
        $size: 24px;
        width: $size;
        height: $size;
        margin-right: 12px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .name {
        font-size: $sizeSm;
      }
    }
    .login-button {
      color: white;
      font-size: $sizeSm;
      padding: 4px 16px;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        color: $mainColor;
      }
    }
  }
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 180px;
  overflow: hidden;
  background: $headerColor;
  padding-top: 60px;
  ul {
    list-style: none;
    padding: 0;
    li {
      cursor: pointer;
      font-size: $sizeSm;
      font-weight: bold;
      padding: 16px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      transition: 0.2s;
      &:hover {
        background: darken($headerColor, 10);
      }
      a {
        color: $fontGrayColor;
        text-decoration: none;
      }
    }
  }
}

</style>
