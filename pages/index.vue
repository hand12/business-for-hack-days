<template>
  <section class="container">
    <ul>
      <div v-if="isSignedIn">
        <li @click="segueToJobPostings">
          <i class="material-icons">description</i>
          <div class="label">求人票</div>
        </li>
        <li @click="segueToApplications">
          <i class="material-icons">question_answer</i>
          <div class="label">応募一覧</div>
        </li>
      </div>
      <div v-else>
        <li @click="googleLogin">
          <i class="material-icons">person</i>
          <div class="label">ログイン</div>
        </li>
      </div>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    segueToApplications() {
      this.$router.push('/job_posting_applications')
    },
    segueToJobPostings() {
      this.$router.push('/job_postings')
    },
    googleLogin() {
      this.signIn()
    },
    ...mapActions('user', ['signIn'])
  },
  computed: {
    ...mapGetters('user', ['isSignedIn', 'loading'])
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/css/common';

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ul {
    font-size: 0;
    list-style: none;
    li {
      display: inline-flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      vertical-align: middle;
      width: 260px;
      height: 320px;
      background: white;
      margin-right: 12px;
      border-radius: 4px;
      border: 1px solid #dfdfdf;
      @include box-shadow();
      transition: 0.2s;
      .material-icons {
        color: $mainColor;
        font-size: 128px;
        margin-bottom: 12px;
      }
      .label {
        font-size: $sizeLg;
        color: $mainColor;
        font-weight: bold;
      }
      a {
        text-decoration: none;
      }
      &:hover {
        cursor: pointer;
        background: $mainColor;
        border: none;
        box-shadow: 0 2px 0 #59ac0a, 0 2px 20px rgba(255,255,255,0.2) inset;
        .material-icons {
          color: white;
        }
        .label {
          color: white;
        }
      }
    }
  }
}
</style>
