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
                console.log(user.user.uid);
                commit('setUser', new User(user.user.uid,userName,null,null))
                commit('setLoading',false)
            }catch(error){
                console.log("err");
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
        loggedUser({commit}, payload){
             commit('setUser', new User(payload.uid)) ;  
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
        }
    }
}