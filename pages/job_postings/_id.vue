<template>
  <section class="container">
    <h1 class="title">求人票詳細</h1>
    <div class="job-posting">
      <div class="name block">
        <div class="label">求人票タイトル</div>
        <div class="value">
          {{ jobPosting.name }}
        </div>
      </div>
      <div class="image block">
        <div class="label">メイン画像</div>
        <div class="imagebox">
          <img :src="jobPosting.imageUrl" />
        </div>
      </div>
      <div class="pr block">
        <div class="label">PR文言</div>
        <p v-html="jobPosting.pr"></p>
      </div>
      <div class="salary block">
        <div class="label">給与レンジ</div>
        <div class="salary-range">
          <span class="salary-bottom">{{ jobPosting.salary.min }}</span>
          <span class="unit">万円 ~ </span>
          <span class="salary-top">{{ jobPosting.salary.max }}</span>
          <span class="unit">万円</span>
        </div>
      </div>
      <div class="buttons">
        <div class="submit">
          公開中
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'authenticated',
  computed: {
    jobPosting() {
      return this.jobPostings.find(jobPosting => jobPosting.id === this.$route.params.id)
    },
    ...mapGetters('job_posting', ['jobPostings'])
  },
  methods: {
    ...mapActions('job_posting', ['bindJobPosting'])
  },
  created() {
    this.bindJobPosting();
  },
}
</script>

<style lang="scss">
@import '~assets/css/common';

.container {
  min-height: 100vh;
  padding-top: 80px;
  padding-left: 200px;
  padding-right: 32px;
  overflow: scroll;
  height: 100vh;
  .title {
    font-size: $sizeLg;
    margin-bottom: 12px;
  }
  .job-posting {
    padding: 24px;
    background: $grayBgColor;
    border: 1px solid $grayBorderColor;
    border-radius: 4px;
    margin-bottom: 48px;
    .block {
      padding-top: 24px;
      padding-bottom: 24px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid $grayBorderColor;
      .label {
        font-size: $sizeSm;
        font-weight: bold;
        width: 30%;
        &:after {
          content: '(必須)';
          color: $alertColor;
          font-size: $sizeXs;
          margin-left: 4px;
        }
      }
      .value {
        font-size: $sizeSm;
        width: 70%;
        border: 1px solid $grayBorderColor;
        border-radius: 4px;
        padding: 8px;
      }
      p {
        font-size: $sizeSm;
        width: 70%;
        border: 1px solid $grayBorderColor;
        border-radius: 4px;
        padding: 8px;
      }
      .salary-range {
        width: 70%;
        .salary-bottom, .salary-top {
          width: 35%;
        }
        .unit {
          font-size: $sizeXs;
        }
      }
    }
    .image {
      .imagebox {
        width: 500px;
        height: 280px;
        background: $grayBorderColor;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .buttons {
      margin: 16px;
      text-align: center;
      .submit {
        color: white;
        font-weight: bold;
        display: inline-block;
        padding: 16px 48px;
        font-size: $sizeMd;
        background: darken($mainColor, 20);
        border-radius: 4px;
        text-shadow: 0 1px 1px rgba(0,0,0,0.1);
      }
    }
  }
}

</style>
