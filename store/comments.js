import firebase from 'firebase/app'
import Comment from '../srcripts/Comment.js'


    export const state = () => ({
        comments:[]
    })
    export const mutations= {
        saveComments (state, payload){
            state.comments = payload;
        },
    }
    export const actions= {
        async getComments({commit}, payload) {
            
            try {
                
                 const coment= await firebase.database().ref('posts/'+payload+'/comments/').once('value');
                 const coments =coment.val();
                 const commentsArray = [];
                    if(coments){
                 Object.keys(coments).forEach(key=>{
                     const c = coments[key]
                    commentsArray.push(
                        new Comment(
                            c.comment,
                            c.userId,
                            c.userName,
                            c.time
                        )
                    ) 
                 })
                 
                }
                
                commit('saveComments', commentsArray)
            } catch (error) {
                throw error
            }
        }


        // async saveComment({ commit, getters }, payload) {
        //     commit('clearError')
        //     commit('setLoading', true)
        //     try {
        //         //logic
        //         console.log(getters.user.name)
        //          const newComment = new Comment(
        //              payload.comment,
        //              getters.user.id,
        //              getters.user.name,
        //              firebase.database.ServerValue.TIMESTAMP
        //              );
        //          await firebase.database().ref('posts/'+payload.id+'/comments').push(newComment);

        //         commit('savePost', newComment);
        //         commit('setLoading', false)
        //     } catch (error) {
        //         commit('setLoading', false)
        //         commit('setError', error.message)
        //         throw error
        //     }
        // },
    }
    export const  getters= {
        getComments: state=>{
            return state.comments
        },
    }
