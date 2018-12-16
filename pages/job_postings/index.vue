<template>
  <section class="container">
    <h1 class="title">求人票一覧</h1>
    <div class="job-postings">
      <table>
        <thead>
          <tr>
            <th>求人ID</th>
            <th>求人タイトル</th>
            <th>作成日</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>リブセンス新卒エンジニア大募集</td>
            <td>2018 12/16 12:48</td>
          </tr>
          <tr>
            <td>2</td>
            <td>リブセンス新卒エンジニア大募集</td>
            <td>2018 12/16 12:48</td>
          </tr>
          <tr>
            <td>3</td>
            <td>リブセンス新卒エンジニア大募集</td>
            <td>2018 12/16 12:48</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="buttons">
      <div class="button">
        求人票を新規作成
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
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
      color: $fontDarkGrayCOlor;
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
      &:hover {
        color: white;
        background: $mainColor;
        border: 1px solid $mainColor;
        border-bottom: 2px solid darken($mainColor, 10);
      }
    }
  }
}

</style>
