import firebase from 'firebase/app'
import Post from './post_help.js'
export default {

    state: {
        newPost: {
            postName: null,
            postContent: null,
            description: null,
            userId: null
        },
        posts:[]
    },
    mutations: {
        loadPosts(state, payload){
            state.posts= payload;
        },
        savePost(state, payload) {
            state.newPost = payload
        }
        
    },
    actions: {
      

        async loadPosts({commit}, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const post= await firebase.database().ref('posts').once('value');
                const posts =  post.val();
                const postsArray = [];

                Object.keys(posts).forEach(key=>{
                    const p = posts[key]
                    postsArray.push(
                        new Post(
                            p.postName,
                            p.postContent,
                            p.description,
                            p.userId
                        )
                    ) 
                })
                //console.log();
                commit('loadPosts', postsArray)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },


        async savePost({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                //logic
                const newPost = new Post(
                    payload.postName,
                    payload.postContent,
                    payload.description,
                    getters.user.id);
                const post = await firebase.database().ref('posts').push(newPost);
                commit('savePost', newPost);
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
    },

    getters: {
        posts (state){
            return state.posts
        },
    }
}