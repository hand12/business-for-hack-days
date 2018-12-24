<template>
  <section class="container">
    <h1 class="title">求人票作成</h1>
    <div class="form">
      <div class="name field">
        <label>求人票タイトル</label>
        <input type="text" placeholder="例：エンジニアリングもデザインもやりたい！新規事業の立ち上げに関わるWebディレクターを大募集" />
      </div>
      <div class="image field">
        <label>メイン画像</label>
        <label class="icon" for="image">
          <i class="material-icons">photo_size_select_actual</i>
        </label>
        <input type="file" id="image" />
      </div>
      <div class="pr field">
        <label>PR文言</label>
        <textarea rows="8" />
      </div>
      <div class="salary field">
        <label>給与レンジ</label>
        <div class="salary_inputs">
          <input type="number" placeholder="400" />
          <span class="unit">万円 ~ </span>
          <input type="number" placeholder="600" />
          <span class="unit">万円</span>
        </div>
      </div>
      <div class="buttons">
        <div class="submit">
          公開する
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
  .form {
    padding: 24px;
    background: $grayBgColor;
    border: 1px solid $grayBorderColor;
    border-radius: 4px;
    margin-bottom: 48px;
    .field {
      padding-top: 24px;
      padding-bottom: 24px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid $grayBorderColor;
      label {
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
      input {
        font-size: $sizeSm;
        width: 70%;
        border: 1px solid $grayBorderColor;
        border-radius: 4px;
        padding: 8px;
      }
      textarea {
        font-size: $sizeSm;
        width: 70%;
        border: 1px solid $grayBorderColor;
        border-radius: 4px;
        padding: 8px;
      }
      .salary_inputs {
        input[type="number"] {
          width: 35%;
        }
        .unit {
          font-size: $sizeXs;
        }
      }
    }
    .image {
      input {
        display: none;
      }
      .icon {
        width: 500px;
        height: 280px;
        background: $grayBorderColor;
        display: flex;
        justify-content: center;
        align-items: center;
        &:after {
          content: '';
        }
        .material-icons {
          color: $grayColor;
          font-size: 96px;
        }
      }
    }
    .buttons {
      margin: 16px;
      text-align: center;
      .submit {
        cursor: pointer;
        color: white;
        font-weight: bold;
        display: inline-block;
        padding: 16px 48px;
        font-size: $sizeMd;
        background: $mainColor;
        border-radius: 4px;
        text-shadow: 0 1px 1px rgba(0,0,0,0.1);
        &:hover {
          background: lighten($mainColor, 5);
        }
      }
    }
  }
}

</style>
