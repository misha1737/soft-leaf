import firebase from 'firebase/app'
import User from '../srcripts/User.js'



    export const state = () =>({
        user: null,
        users: []
    })

    export const mutations=  {
        setUser(state, payload) {
            state.user = payload
        },

        getUsers(state, payload) {
            state.users = payload;
        },

    }
    export const actions= {
        async registerUser({ commit }, { email, password, userName }) {
            commit('clearError', null,{ root: true })
            commit('setLoading',  null,{ root: true })
            try {
                //logic
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                //так записуюься дані в базу
                await firebase.database().ref('users/' + user.user.uid + '/name').set(userName);
                commit('setUser', new User(user.user.uid, userName, null, null, null, null, null))
            commit('setLoading', false,{ root: true })
            } catch (error) {
                commit('setLoading', false,{ root: true })
                commit('setError', error.message,{ root: true })
                throw error
            }

        },
        async loginUser({ commit }, { email, password }) {
            commit('clearError', null,{ root: true })
            commit('setLoading', true,{ root: true })
            console.log(commit)
            try {
                //logic
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);
                const userInfo = await (await firebase.database().ref('users/' + user.user.uid).once('value')).val();
                commit('setUser', new User(user.user.uid, userInfo.name, userInfo.phone, userInfo.photo, userInfo.moderator, userInfo.admin, userInfo.banned))
                commit('setLoading',false,{ root: true })
            } catch (error) {
                commit('setLoading', false,{ root: true })
                commit('setError', error.message,{ root: true })
                throw error
            }
        },
        loginUserGoogle({ commit, dispatch }) {
            // let provider = new firebase.auth.GoogleAuthProvider();
            // firebase.auth().signInWithPopup(provider).then(async result => {
            //     dispatch('loggedUser', result.user);
            //     commit('setLoading', false)
            // }).catch(function (error) {
            //     commit('setLoading', false);
            //     commit('setError', error.message);
            //     console.log(error.message);
            //     throw error
            // });
        },
        loginUserfacebook({ commit, dispatch }) {
            // let provider = new firebase.auth.FacebookAuthProvider();
            // firebase.auth().signInWithPopup(provider).then(async result => {
            //     dispatch('loggedUser', result.user);
            //     commit('setLoading', false)
            // }).catch(function (error) {
            //     commit('setLoading', false);
            //     commit('setError', error.message);
            //     console.log(error.message);
            //     throw error
            // });
        },
        async loggedUser({ commit }, payload) {
            if (payload) {
                const userInfo = await (await firebase.database().ref('users/' + payload.uid).once('value')).val();
                if (userInfo) {
                    if(!userInfo.photo){
                        await firebase.database().ref('users/'+payload.uid+'/photo').set(payload.photoURL);  
                    }
                    commit('setUser', new User(payload.uid, userInfo.name, userInfo.phone, userInfo.photo, userInfo.moderator, userInfo.admin, userInfo.banned))
                } else {
                    await firebase.database().ref('users/'+payload.uid+'/name').set(payload.displayName);
                    await firebase.database().ref('users/'+payload.uid+'/photo').set(payload.photoURL);
                    commit('setUser', new User(payload.uid, payload.displayName, null, payload.photoURL, null, null, null))
                } 
            }
        },
        logoutUser({ commit }) {
            firebase.auth().signOut();
            commit('setUser', null);
        },

        async updateUser({ commit }, payload) {
            commit('clearError',null,{ root: true })
            commit('setLoading', true, {root:true})
            try {
            await firebase.database().ref('users/' + payload.id).update(payload);
                 commit('setUser', payload)
                commit('setLoading', false,{ root: true })
            } catch (error) {
                commit('setLoading', false,{ root: true })
                commit('setError', error.message,{ root: true })
                throw error
            }

        },
        async getUsers({ commit, getters }) {
            // commit('clearError')
            // commit('setLoading', true)
            // try {
            //     const user = await firebase.database().ref('users/').once('value');
            //     const users = user.val();
            //     let usersArray = [];
            //     Object.keys(users).forEach(key => {
            //         const p = users[key];
            //         usersArray.push(
            //             new User(
            //                 key,
            //                 p.name,
            //                 p.phone,
            //                 p.photo,
            //                 p.moderator,
            //                 p.admin,
            //                 p.banned
            //             )
            //         )
            //     })
            //     commit('getUsers', usersArray)
            //     commit('setLoading', false)
            // } catch (error) {
            //     commit('setLoading', false)
            //     commit('setError', error.message)
            //     throw error
            // }
        },
        async saveRule({ commit }, payload) {
            // commit('clearError')
            // commit('setLoading', true)
            // try {
            //     await firebase.database().ref('users/' + payload.id).update(
            //         payload
            //     );
            // } catch (error) {
            //     commit('setLoading', false)
            //     commit('setError', error.message)
            //     throw error
            // }
        }
    }
    export const  getters= {
        user: state=>state.user,
        AllUsers: state => state.users,
        checkUser: state => state.user !== null,  
        isUserAdmin:(state)=>(state.user !== null && state.user.admin),
        isUserModerator:(state)=>(state.user !== null && state.user.moderator)
    }
