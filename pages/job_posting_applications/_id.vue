<template>
  <section
    v-if="currentUser"
    class="container">
    <div class="user-fix-container">
      <div class="user-info">
        <div class="user-profile-image">
          <img :src="application().user.profileImage" />
        </div>
        <div class="user-profile-info">
          <div class="from">東京都在住 | 転職会議大学</div>
          <div class="name">{{ application().user.name }}</div>
          <div class="company">転職会議 株式会社</div>
        </div>
      </div>
    </div>
    <div class="messages">
      <div
        v-if="currentUser"
        v-for="message in applicationsMessages()"
        :key="message.id">
        <message-left
          v-if="message.user.uid === currentUser.uid"
          :message="message" />
        <message-right
          v-else
          :message="message" />
      </div>
      <div id="scrollMark"></div>
    </div>
    <div class="form-fix-container">
      <textarea rows="4" v-model="body" />
      <span
        @click="submit"
        class="submit-button">送信する</span>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MessageRight from '~/components/MessageRight';
import MessageLeft from '~/components/MessageLeft';

export default {
  data() {
    return {
      body: null
    }
  },
  components: {
    MessageRight,
    MessageLeft,
  },
  computed: {
    ...mapGetters('application', ['applications']),
    ...mapGetters('user', ['currentUser']),
    ...mapGetters('message', ['messages']),
  },
  methods: {
    application() {
      return this.applications.find(application => application.id === this.$route.params.id)
    },
    applicationsMessages() {
      return this.messages.filter(message => message.application.id === this.application().id)
    },
    async submit() {
      if (this.body.trim().length <= 0) return
      this.$nuxt.$loading.start()

      const message = {
        application: { ...this.application() },
        body: this.body,
        user: { ...this.currentUser },
        isRead: false,
      }
      await this.addMessage(message)
      this.$nuxt.$loading.finish()
      this.body = null
    },
    ...mapActions('application', ['bindApplication', 'addApplication']),
    ...mapActions('message', ['bindMessage', 'addMessage']),
  },
  created() {
    this.bindApplication()
    this.bindMessage()
  },
  watch: {
    messages(newVal, oldVal) {
      if (newVal.length === oldVal.length) return
      this.$scrollTo('#scrollMark', 700, {
        container: '.messages'
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/css/common';

.container {
  min-height: 100vh;
  padding-top: 16px;
  padding-left: 180px;
  height: calc(100vh);
  overflow-y: scroll;
  background: $grayBgColor;
  .user-fix-container {
    z-index: 1;
    position: fixed;
    top: 57px;
    left: 180px;
    right: 0;
    background: white;
    @include box-shadow();
    .user-info {
      padding: 16px;
      display: flex;
      justify-content: flex-start;
      align-items: start;
      $imageSize: 100px;
      .user-profile-image {
        width: $imageSize;
        height: $imageSize;
        margin-right: 12px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .user-profile-info {
        width: calc(100% - #{$imageSize});
        .from {
          color: $fontDarkGrayColor;
          font-size: $sizeSm;
          margin-bottom: 8px;
        }
        .name {
          color: $fontDarkGrayColor;
          font-size: $sizeMd;
          font-weight: bold;
          padding-bottom: 4px;
          margin-bottom: 12px;
          border-bottom: 1px solid $grayBorderColor;
        }
        .company {
          color: $fontDarkGrayColor;
          font-size: $sizeSm;
          font-weight: bold;
        }
      }
    }
  }
  .messages {
    padding: 24px;
    padding-top: 156px;
    padding-bottom: 240px;
    height: 100%;
    overflow-y: scroll;
  }
  .form-fix-container {
    position: fixed;
    bottom: -12px;
    left: 180px;
    right: 0;
    background: rgba(45,55,64,0.75);
    padding: 32px;
    box-sizing: border-box;
    border-top: 1px solid $grayBorderColor;
    
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    textarea {
      color: $fontMainColor;
      outline: none;
      font-size: $sizeSm;
      line-height: $sizeSm * 1.8;
      padding: 16px;
      border: 1px solid $grayBorderColor;
      border-radius: 4px;
      width: 80%;
      margin-right: 12px;
    }
    .submit-button {
      cursor: pointer;
      font-size: $sizeMd;
      background: $mainColor;
      padding: 8px 16px;
      color: white;
      border-radius: 2.5px;
      @include box-shadow();
    }
  }
}

</style>
