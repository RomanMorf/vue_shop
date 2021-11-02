import firebase from 'firebase'
import "firebase/storage"

export default {
  actions: {
    async DELETE_ALL_ITEMS_IN_FOLDER({ dispatch, commit, getters }, folderName) {
      console.log('new request - from store');
      await firebase
        .storage()
        .ref(`products/${folderName}`)
        .listAll()
        .then(res => {
          res.items.forEach(item => {
            const itemForDelete = {
              pathToFile: item.parent.fullPath,
              fileName: item.name
            }
            dispatch('DELETE_ITEM', itemForDelete )
            // firebase.storage().ref(item.parent.fullPath).child(item.name).delete()
          })
        })
    },
    async DELETE_ITEM({ dispatch, commit, getters }, {pathToFile, fileName}) {
      await firebase.storage().ref(pathToFile).child(fileName).delete()
    }
  },
}
