import firebase from '@/plugins/firebase'

const db = firebase.database()
const jobPostingsRef = db.ref('/job_postings')

export const state = () => ({
  jobPostings: []
})

export const getters = {
  jobPostings: state => state.jobPostings
}

export const actions = {
  bindJobPosting({ commit }) {
    jobPostingsRef.on('value', snapshot => {
      const jobPostings = Object.values(snapshot.val()).map(value => value)
      commit('setJobPosting', jobPostings)
    })
  },
  addJobPosting() {
    jobPostingsRef.push({
      id: 1,
      name: '例：エンジニアリングもデザインもやりたい！新規事業の立ち上げに関わるWebディレクターを大募集',
      pr: '国内最大級の転職クチコミサイト「転職会議」。 月間2650万PV、会員数も200万会員を超える転職会議では、 【世界から無駄な転職を撲滅する】ことをVISIONに掲げています。 そんなVISIONに共感していただけるエンジニアの方、是非一緒に転職会議を作っていきましょう！'
    })
  }
}

export const mutations = {
  setJobPosting(state, jobPostings) {
    state.jobPostings = jobPostings
  }
}
