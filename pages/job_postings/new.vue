<template>
  <section class="container">
    <h1 class="title">求人票作成</h1>
    <form class="form">
      <div class="name field">
        <label>求人票タイトル</label>
        <input
          v-model="jobPosting.name"
          required
          ref="name"
          :class="{ error: hasError('name') }"
          type="text"
          placeholder="例：エンジニアリングもデザインもやりたい！新規事業の立ち上げに関わるWebディレクターを大募集" />
      </div>
      <div class="image field">
        <label>メイン画像</label>
        <label
          class="icon"
          for="image">
          <i class="material-icons">photo_size_select_actual</i>
          <img v-if="jobPosting.imageUrl" :src="jobPosting.imageUrl" />
        </label>
        <input
          @change="fileChange"
          accept="image/*"
          ref="image"
          type="file"
          id="image" />
      </div>
      <div class="pr field">
        <label>PR文言</label>
        <textarea
          v-model="jobPosting.pr"
          required
          ref="pr"
          :class="{ error: hasError('pr') }"
          rows="8" />
      </div>
      <div class="salary field">
        <label>給与レンジ</label>
        <div class="salary_inputs">
          <input
            v-model="jobPosting.salary.min"
            min="0"
            step="10"
            required
            ref="salary"
            :class="{ error: hasError('salary') }"
            type="number"
            placeholder="400" />
          <span class="unit">万円 ~ </span>
          <input
            v-model="jobPosting.salary.max"
            min="0"
            step="10"
            required
            :class="{ error: hasError('salary') }"
            type="number"
            placeholder="600" />
          <span class="unit">万円</span>
        </div>
      </div>
      <div class="buttons">
        <input
          @click="submit"
          type="submit"
          class="submit"
          value="公開する" />
      </div>
    </form>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      jobPosting: {
        imageUrl: null,
        name: null,
        pr: null,
        salary: {
          max: 0,
          min: 0
        }
      },
      errors: []
    }
  },
  middleware: 'authenticated',
  methods: {
    hasError(field) {
      return this.errors.map(error => error.field).includes(field)
    },
    fileChange(event) {
      const input = event.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = event => {
          this.jobPosting.imageUrl = event.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    getDate() {
      const date = new Date
      return date.getFullYear() + "_" +
              date.getMonth() + 1 + "_" +
              date.getDate() + "_" +
              date.getHours() + "_" +
              date.getMinutes()
    },
    validate() {
      this.errors = []
      if (this.jobPosting.name == null || this.jobPosting.name.trim().length <= 0) {
        const error = {
          field: 'name',
          message: 'タイトルを入力してください'
        }
        this.errors.push(error)
      }
      
      if (this.jobPosting.pr == null || this.jobPosting.pr.trim().length <= 0) {
        const error = {
          field: 'pr',
          message: 'prを入力してください'
        }
        this.errors.push(error)
      }

      if (this.jobPosting.imageUrl == null) {
        const error = {
          field: 'image',
          message: '画像をセットしてください'
        }
      }

      if (this.jobPosting.salary) {
        if (this.jobPosting.salary.max < this.jobPosting.salary.min) {
          const error = {
            field: 'salary',
            message: '年収の上限は下限より大きい値を設定してください'
          }
          this.errors.push(error)
        }
      }
    },
    async uploadImage() {
      const image = this.$refs.image.files[0]
      if (!image) return

      const imageName = `${image.name + "_" + this.getDate()}`
      const storageRef = firebase.storage().ref().child('uploads/' + imageName)
      await storageRef.put(image)
      const uploadedImageUrl = await storageRef.getDownloadURL()
      return uploadedImageUrl
    },
    async submit(e) {
      this.$nuxt.$loading.start()
      e.preventDefault()
      this.validate();
      if (this.errors.length >= 1) return

      const jobPosting = Object.assign(this.jobPosting, {
        imageUrl: await this.uploadImage()
      }, {
        postUser: this.currentUser
      })

      this.addJobPosting(jobPosting)
      this.$nuxt.$loading.finish()
      this.$router.push({ name: 'job_postings' });
      this.$message({
        showClose: true,
        message: '求人票を投稿しました',
        type: 'success'
      });
    },
    ...mapActions('job_posting', ['addJobPosting'])
  },
  computed: {
    ...mapGetters('job_posting', ['loading']),
    ...mapGetters('user', ['currentUser'])
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
      .error {
        border: 1px solid $alertColor;
        background: lighten($alertColor, 30);
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
        cursor: pointer;
        position: relative;
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
        img {
          position: absolute;
          top: 0;
          left: 0;
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
        outline: none;
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
