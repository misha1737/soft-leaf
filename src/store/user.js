import firebase from 'firebase/app'
import User from './user_help.js'

export default{
    
    state:{
        user: null
    },
    mutations:{
        setUser(state, payload){
            state.user = payload
        }

    },
    actions:{
        async registerUser ({commit}, {email, password, userName}){
            commit('clearError')
            commit('setLoading',true)
            try{
                //logic
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                //так записуюься дані в базу
                await firebase.database().ref('users/'+user.user.uid+'/name').set(userName);
                commit('setUser', new User(user.user.uid,userName,null,null))
                commit('setLoading',false)
            }catch(error){
                commit('setLoading',false)
                commit('setError', error.message)
                throw error
            }
          
        },
        async loginUser ({commit}, {email, password}){
            commit('clearError')
            commit('setLoading',true)
            try{
                //logic
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);


                const userInfo= await (await firebase.database().ref('users/'+user.user.uid).once('value')).val();
                commit('setUser', new User(user.user.uid,userInfo.name,userInfo.moderator,userInfo.admin ))
                //commit('setLoading',false)

            }catch(error){
                commit('setLoading',false)
                commit('setError', error.message)
                throw error
            }
        },
         loginUserGoogle({commit}){
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(async result=> {
                  let user = result.user;
                  console.log(user.displayName);
                  console.log(user.photoURL);
                  console.log(user.uid);
                 await firebase.database().ref('users/'+user.uid+'/name').set(user.displayName);
                  commit('setUser', new User(user.uid,user.displayName,null,null));
                  commit('setLoading',false)

              }).catch(function(error) {
                  // Handle Errors here.
                  commit('setLoading',false);
                  commit('setError', error.message);
                  console.log(error.message);
                  throw error

              });
        },
        loginUserfacebook({commit}){
            let provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(async result=> {
                  let user = result.user;
                  console.log(user.displayName);
                  console.log(user.photoURL);
                  console.log(user.uid);
                 await firebase.database().ref('users/'+user.uid+'/name').set(user.displayName);
                  commit('setUser', new User(user.uid,user.displayName,null,null));
                  commit('setLoading',false)

              }).catch(function(error) {
                  // Handle Errors here.
                  commit('setLoading',false);
                  commit('setError', error.message);
                  console.log(error.message);
                  throw error

              });
        },
        async loggedUser({commit}, payload){
                const userInfo= await (await firebase.database().ref('users/'+payload.uid).once('value')).val();
                commit('setUser', new User(payload.uid,userInfo.name,userInfo.moderator,userInfo.admin ))
        },
        logoutUser({commit}){
                firebase.auth().signOut();
                commit('setUser', null);
        }
    },
    getters:{
        user (state){
            return state.user
        },
        checkUser (state) {
            return state.user !== null
        },
        isUserAdmin (state) {
            return (state.user !== null && state.user.admin)
        },
        isUserModerator (state) {
            return (state.user !== null && state.user.moderator)
        }
    }
}