// import firebaseConfig from './firebaseIndex'
import firebase from 'firebase'

export const authMethodes = {
    signUp: (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async res => {
                console.log('signUp',res)
                const token = await Object.entries(res.user)[5][1].b
                console.log('token: ',token.i);
            })
            .catch(err => {
                console.error(err)
            })
    },
    login: (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
    // signUp:(email,password)=>{

    // }
}