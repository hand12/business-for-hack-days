<template>
  <section class="container">
    <h1 class="title">求人票一覧</h1>
    <div
      v-if="currentUser"
      class="job-postings">
      <table>
        <thead>
          <tr>
            <th>求人タイトル</th>
            <th>作成者</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="jobPosting in currentUsersJobPosting"
            :key="jobPosting.id"
            @click="segueToDetail(jobPosting.id)">
            <td>{{ jobPosting.name }}</td>
            <td>{{ jobPosting.postUser.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="buttons">
      <div class="button">
        <nuxt-link to="job_postings/new">
          求人票を新規作成
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    segueToDetail(id) {
      this.$router.push({ name: 'job_postings-id', params: { id: id } })
    },
    ...mapActions('job_posting', ['bindJobPosting']),
  },
  computed: {
    currentUsersJobPosting() {
      return this.jobPostings.filter(jobPosting => jobPosting.postUser.uid === this.currentUser.uid)
    },
    ...mapGetters('job_posting', ['jobPostings']),
    ...mapGetters('user', ['currentUser']),
  },
  created() {
    this.bindJobPosting();
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/css/common';

.container {
  min-height: 100vh;
  padding-top: 80px;
  padding-left: 200px;
  padding-right: 32px;
  .title {
    font-size: $sizeLg;
    margin-bottom: 12px;
  }
  .job-postings {
    width: 100%;
    border: 1px solid $borderColor;
    border-radius: 4px;
    border-bottom: 1px solid transparent;
    background: $grayBgColor;
    overflow: hidden;
    margin-bottom: 36px;
    table {
      width: 100%;
      border-collapse: collapse;
    }
    thead {
      font-size: $sizeSm;
      color: $fontDarkGrayColor;
      border-bottom: 1px solid $borderColor;
      tr {
        text-align: left;
        th {
          padding: 8px;
        }
      }
    }
    tbody {
      background: white;
      tr {
        background: white;
        font-size: $sizeSm;
        font-weight: bold;
        cursor: pointer;
        transition: 0.2s;
        &:nth-child(even) {
          background: $grayBgColor;
        }
        &:last-child {
          border-radius: 0 0 4px 4px;
          border-bottom: 1px solid $borderColor;
        }
        &:hover {
          background: $tableHoverColor;
          color: $fontTableHoverColor;
        }
        td {
          padding: 24px 8px;
        }
      }
    }
  }
  .buttons {
    text-align: center;
    .button {
      cursor: pointer;
      display: inline-block;
      padding: 12px 48px;
      border: 1px solid $borderColor;
      background: white;
      text-align: center;
      font-size: $sizeMd;
      font-weight: bold;
      border-radius: 4px;
      border-bottom: 2px solid $buttonShadow;
      transition: 0.2s;
      a {
        color: $fontMainColor;
        text-decoration: none;
        &:hover {
          color: white;
        }
      }
      &:hover {
        background: $mainColor;
        border: 1px solid $mainColor;
        border-bottom: 2px solid darken($mainColor, 10);
      }
    }
  }
}

</style>
