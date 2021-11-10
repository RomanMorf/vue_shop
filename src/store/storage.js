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
    },
    async PUT_ITEM({ dispatch, commit, getters }, {pathToFile, file}) {
      const storageRef = firebase.storage().ref(pathToFile).put(file)
      let uploadValue = 0
      storageRef.on(
        `state_changed`,
        snapshot=>{
        uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },
        error=>{console.log(error.message, 'error.message')},
        ()=>{uploadValue=100;
          return storageRef.snapshot.ref.getDownloadURL()
        }
      )

    },
  },
}
