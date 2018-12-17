<template>
  <div class="job-posting-application">
    <div class="read-icons">
      <span class="read-icon">対応済み</span>
      <span class="not-compatible">未読あり・既読</span>
    </div>
    <div class="header">
      <div class="user-profile-image">
        <img src="~/assets/images/sampleWoman.jpg" />
      </div>
      <div class="user-profile-info">
        <div class="from">東京都在住 | 転職会議大学</div>
        <div class="name">Eri Tanaka</div>
        <div class="company">転職会議 株式会社</div>
      </div>
    </div>
    <div class="body">
      <div class="label">
        最新のメッセージ
      </div>
      <div
        class="message"
        v-html="message">
      </div>
      <div class="bottom">
        <div class="left">
          <span class="posted-time">2018/12/10 22:19</span> |
          <a>こちらから返信</a>
        </div>
        <div class="right">
          <span class="assineer">担当: 山下悠介</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: `株式会社リブセンスは、こんな会社です。+:｡.｡:+*゜★*+:｡.｡:+*゜★*
              《プライベートも大切にできます》
              ★毎週土日・祝日休み
              ★9時～18時！残業少なめ`
    }
  }
}
</script>


<style scoped lang="scss">
@import '~assets/css/common';

.job-posting-application {
  position: relative;
  border-radius: 4px;
  border: 1px solid $borderColor;
  background: $grayBgColor;
  margin-bottom: 36px;
  @include box-shadow();
  .read-icons {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: $sizeXs;
    .read-icon {
      padding: 4px 8px;
      color: white;
      border-radius: 2.5px;
      background: $grayColor;
      margin-right: 8px;
    }
    .not-compatible {
      padding: 4px 8px;
      border-radius: 2.5px;
      border: 1px solid $grayBorderColor;
    }
  }
  .header {
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
  .body {
    position: relative;
    padding: 16px;
    background: white;
    .label {
      color: $fontGrayColor;
      font-weight: normal;
      font-size: $sizeXs;
    }
    .message {
      font-size: $sizeSm;
      line-height: $sizeSm * 1.8;
      color: $fontDarkGrayColor;
      margin-bottom: 24px;
    }
    .bottom {
      position: absolute;
      bottom: 8px;
      left: 16px;
      right: 16px;
      color: $fontGrayColor;
      font-size: $sizeXs;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

</style>
