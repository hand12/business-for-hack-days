<template>
  <section class="container">
    <h1 class="title">応募者一覧</h1>
    <div
      v-if="currentUser"
      class="job-posting-applications">
      <job-posting-application
        v-for="application in currentUsersApplications"
        :key="application.id"
        :application="application"
        :messages="messages" />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import JobPostingApplication from '~/components/JobPostingApplication';

export default {
  components: {
    JobPostingApplication,
  },
  methods: {
    ...mapActions('application', ['bindApplication']),
    ...mapActions('message', ['bindMessage']),
  },
  computed: {
    currentUsersApplications() {
      return this.applications.filter(application => application.jobPosting.postUser.uid === this.currentUser.uid)
    },
    ...mapGetters('application', ['applications']),
    ...mapGetters('message', ['messages']),
    ...mapGetters('user', ['currentUser']),
  },
  created() {
    this.bindApplication()
    this.bindMessage()
  }
}
</script>

<style scoped lang="scss">
@import '~assets/css/common';

.container {
  min-height: 100vh;
  padding-top: 80px;
  padding-left: 200px;
  padding-right: 32px;
  height: 100vh;
  overflow-y: scroll;
  .title {
    color: $fontMainColor;
    font-size: $sizeLg;
    margin-bottom: 12px;
  }
  .job-posting-applications {
    width: calc(100% - 200px);
    min-width: 600px;
  }
}

</style>
