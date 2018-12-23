import firebase from '@/plugins/firebase'

export const state = () => ({
  currentUser: null,
  isSignedIn: false,
  loading: false
})

export const getters = {
  currentUser: state => state.currentUser,
  isSignedIn: state => state.isSignedIn,
  loading: state => state.loading
}

export const actions = {
  signIn() {
    firebase.auth().signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    )
  },
  watchSignedInState({ commit }) {
    commit('setLoading', true)
    firebase.auth().onAuthStateChanged(response => {
      if (response) {
        const user = {
          name: response.displayName,
          profileImage: response.photoURL
        }
        commit('setCurrentUser', user)
        commit('setSignInState', true)
      } else {
        commit('setSignInState', false)
      }
      commit('setLoading', false)
    })
  }
}

export const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user
  },
  setSignInState(state, isSignedIn) {
    state.isSignedIn = isSignedIn
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}
