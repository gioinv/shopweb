import { db, Auth, GoogleProvider } from '@/services/firebase'

export const getUser = async (appendDocId = false) => {
  debugger
  return await db.collection('users')
    .get()
    .then((querySnapshot) => {
      if (appendDocId) {
        return appendDocumentId(querySnapshot)
      } else { return querySnapshot.docs.map(doc => doc.data()) }
    })
}

export const getUserById = async (id) => {
  let result = null
  const rs = await db.collection('users')
    .where('Id', '==', id)
    .get()
    .catch((x) => {
      console.log(x)
    })

  if (!rs.empty) {
    result = rs.docs[0].data()
  }

  return result
}
export const getUserByDocId = async (id) => {
  return await db.collection('users')
    .doc(id)
    .get()
    .then(snapshot => snapshot.data())
}

const appendDocumentId = (snapShot) => {
  const result = []
  snapShot.forEach((element) => {
    const rs = element.data()
    rs.documentId = element.id
    result.push(rs)
  })
  return result
}

export const loginGoogle = async () => {
  return await Auth.signInWithPopup(GoogleProvider)
    .then(rs => rs)
}

export const register = async (email, password) => {
  return await Auth.createUserWithEmailAndPassword(email, password)
    .then(rs => rs)
}
export const loginEmail = async (email, password) => {
  return await Auth.signInWithEmailAndPassword(email, password)
    .then(rs => rs)
}
