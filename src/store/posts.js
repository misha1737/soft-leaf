import firebase from 'firebase/app'
import Post from './post_help.js'
export default {

    state: {
        newPost: {
            postName: null,
            postContent: null,
            description: null,
            userId: null,
            id: null
        },
        timeInLastPost:null,
        posts:[]
    },
    mutations: {
        loadPosts(state, payload){
            
            payload.forEach(key=>{
                state.posts.push(key)
            });
            state.timeInLastPost = payload[payload.length-1].time;
            state.posts.pop();
        },
        savePost(state, payload) {
            state.newPost = payload;
        },
        getPosts(state, payload){
            state.posts = payload;
        },
       
        
    },
    actions: {
      
        async getPosts({commit,getters}) {
            commit('clearError')
            commit('setLoading', true)
            try {
             let post;
             if (!getters.timeInLastPost)
            post= await firebase.database().ref('posts').orderByChild('time').startAt(0).limitToLast(11).once('value')
             else
            post= await firebase.database().ref('posts').orderByChild('time').endAt(getters.timeInLastPost).limitToLast(11).once('value')

                const posts =  post.val();
                let postsArray = [];

                Object.keys(posts).forEach(key=>{
                    const p = posts[key]
                    postsArray.push(
                        new Post(
                            p.postName,
                            p.postContent,
                            p.description,
                            p.userId,
                            key,
                            p.url,
                            p.category,
                            p.publish,
                            p.time
                        )
                    ) 
                })
                
                postsArray= postsArray.sort((a, b) => a.time < b.time ? 1 : -1)
                commit('getPosts', postsArray)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },

        async loadPosts({commit,getters}) {
            commit('clearError')
            commit('setLoading', true)
            try {
             let post;
             if (!getters.timeInLastPost)
            post= await firebase.database().ref('posts').orderByChild('time').startAt(0).limitToLast(11).once('value')
             else
            post= await firebase.database().ref('posts').orderByChild('time').endAt(getters.timeInLastPost).limitToLast(11).once('value')

                const posts =  post.val();
                let postsArray = [];

                Object.keys(posts).forEach(key=>{
                    const p = posts[key]
                    postsArray.push(
                        new Post(
                            p.postName,
                            p.postContent,
                            p.description,
                            p.userId,
                            key,
                            p.url,
                            p.category,
                            p.publish,
                            p.time
                        )
                    ) 
                })
                
                postsArray= postsArray.sort((a, b) => a.time < b.time ? 1 : -1)
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
                    getters.user.id,
                    null,
                    null,
                    payload.category,
                    payload.publish,
                    firebase.database.ServerValue.TIMESTAMP
                    );
                const post = await firebase.database().ref('posts').push(newPost);
                
                commit('savePost', newPost);
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async removePost ({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                //logic
                await firebase.database().ref('posts/'+payload).remove();
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }

            
        },

        async updatePost({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                //logic
                const updatedPost = new Post(
                    payload.postName,
                    payload.postContent,
                    payload.description,
                    getters.user.id,
                    null,
                    payload.url,
                    payload.category,
                    payload.publish,
                    firebase.database.ServerValue.TIMESTAMP
                    );
                 await firebase.database().ref('posts/'+payload.id).update(
                    updatedPost
                );
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },

            


    },

    getters: {
        AllPosts: state=>{
            return state.posts
        },
        posts: state=>filter=>{
            return state.posts.filter(item=>{
               return item.category === filter
            })
        },
        post: state=>id=>{
            return state.posts.find(state => state.id === id);
        },
        timeInLastPost:state=>{
            return state.timeInLastPost
        },
    }
}