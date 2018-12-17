<template>
  <section class="container">
    <div class="user-fix-container">
      <div class="user-info">
        <div class="user-profile-image">
          <img src="~/assets/images/sampleWoman.jpg" />
        </div>
        <div class="user-profile-info">
          <div class="from">東京都在住 | 転職会議大学</div>
          <div class="name">Eri Tanaka</div>
          <div class="company">転職会議 株式会社</div>
        </div>
      </div>
    </div>
    <div class="messages">
      <message-right />
      <message-left />
      <message-right />
      <message-left />
      <message-right />
      <message-left />
    </div>
    <div class="form-fix-container">
      <textarea rows="5" />
      <span class="submit-button">送信する</span>
    </div>
  </section>
</template>

<script>
import MessageRight from '~/components/MessageRight';
import MessageLeft from '~/components/MessageLeft';

export default {
  components: {
    MessageRight,
    MessageLeft,
  }
}
</script>

<style scoped lang="scss">
@import '~assets/css/common';

.container {
  min-height: 100vh;
  padding-top: 50px;
  padding-left: 170px;
  height: 100vh;
  overflow-y: scroll;
  background: $grayBgColor;
  .user-fix-container {
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
    padding-bottom: 120px;
  }
  .form-fix-container {
    position: absolute;
    bottom: -12px;
    left: 180px;
    right: 0;
    background: white;
    padding: 32px;
    box-sizing: border-box;
    border-top: 1px solid $grayBorderColor;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
    }
  }
}

</style>
