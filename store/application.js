import firebase from '@/plugins/firebase'

const db = firebase.database()
const applicationsRef = db.ref('/applications')

export const state = () => ({
  applications: [],
})

export const getters = {
  applications: state => state.applications,
}

export const actions = {
  bindApplication({ commit }) {
    applicationsRef.on('value', snapshot => {
      const values = snapshot.val()
      const applications = Object.keys(values).map(id => Object.assign(values[id], { id: id }))
      commit('setApplications', applications)
    })
  },
}

export const mutations = {
  setApplications(state, applications) {
    state.applications = applications
  },
}
