<template>
  <section class="container">
    <h1 class="title">応募者一覧</h1>
    <div class="job-posting-applications">
      <job-posting-application
        v-for="application in applications"
        :key="application.id"
        :application="application" />
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
  },
  computed: {
    ...mapGetters('application', ['applications']),
  },
  created() {
    this.bindApplication()
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
