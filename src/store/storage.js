import firebase from 'firebase'
import "firebase/storage"
import ItemForStorageDelete from '../assets/class'

export default {
  actions: {
    async DELETE_ALL_ITEMS_IN_FOLDER({ dispatch, commit, getters }, folderName) {
      await firebase
        .storage()
        .ref(`products/${folderName}`)
        .listAll()
        .then(res => {
          res.items.forEach(item => {
            let itemForDelete = new ItemForStorageDelete(item.parent.fullPath, item.name)
            dispatch('DELETE_ITEM', itemForDelete )
          })
        })
    },
    async DELETE_ITEM({ dispatch, commit, getters }, {pathToFile, fileName}) {
      await firebase.storage().ref(pathToFile).child(fileName).delete()
    }
  },
}
