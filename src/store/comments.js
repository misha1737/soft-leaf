import firebase from 'firebase/app'
import Comment from './comment_help.js'
export default {

    state: {
        newComment: {
        //     postName: null,
        //     postContent: null,
        //     description: null,
        //     userId: null,
        //     id: null
         },
        comments:[]
    },
    mutations: {
        loadComments(state, payload){
            state.comments = payload;
        },
        savePost(state, payload) {
            state.newComment = payload;
        },
       
        
    },
    actions: {
      

        async loadComments({commit}, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                 const coment= await firebase.database().ref('posts/'+payload.id+'/comments/').once('value');
                 const coments =  coment.val();
                 const commentsArray = [];
                    if(coments){
                 Object.keys(coments).forEach(key=>{
                     const p = coments[key]
                    commentsArray.push(
                        new Comment(
                            p.comment,
                            p.userId
                        )
                    ) 
                 })
                }
                commit('loadComments', commentsArray)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },


        async saveComment({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                //logic
                 const newComment = new Comment(
                     payload.comment,
                     getters.user.id
                     );
                 await firebase.database().ref('posts/'+payload.id+'/comments').push(newComment);

                commit('savePost', newComment);
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        // async removePost ({ commit, getters }, payload) {
        //     commit('clearError')
        //     commit('setLoading', true)
        //     try {
        //         //logic
        //         await firebase.database().ref('posts/'+payload).remove();
        //         commit('setLoading', false);
        //     } catch (error) {
        //         commit('setLoading', false);
        //         commit('setError', error.message);
        //         throw error
        //     }

            
        // },

        // async updatePost({ commit, getters }, payload) {
        //     commit('clearError')
        //     commit('setLoading', true)
        //     try {
        //         //logic
        //         const updatedPost = new Post(
        //             payload.postName,
        //             payload.postContent,
        //             payload.description,
        //             getters.user.id,
        //             null,
        //             payload.url
        //             );
        //          await firebase.database().ref('posts/'+payload.id).update(
        //             updatedPost
        //         );
        //         commit('setLoading', false)
        //     } catch (error) {
        //         commit('setLoading', false)
        //         commit('setError', error.message)
        //         throw error
        //     }
        // },

            


    },

    getters: {
        comments: state=>{
            return state.comments
        },
        // post: state=>id=>{
        //     return state.posts.find(state => state.id === id);
        // },
    }
}