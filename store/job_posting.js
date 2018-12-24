import firebase from '@/plugins/firebase'

const db = firebase.database()
const jobPostingsRef = db.ref('/job_postings')

export const state = () => ({
  jobPostings: [],
})

export const getters = {
  jobPostings: state => state.jobPostings,
}

export const actions = {
  bindJobPosting({ commit }) {
    jobPostingsRef.on('value', snapshot => {
      const jobPostings = Object.values(snapshot.val()).map(value => value)
      commit('setJobPosting', jobPostings)
    })
  },
  addJobPosting(_, jobPosting) {
    jobPostingsRef.push({ ...jobPosting })
  },
}

export const mutations = {
  setJobPosting(state, jobPostings) {
    state.jobPostings = jobPostings
  },
}
