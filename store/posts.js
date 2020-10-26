import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'
import Post from '../srcripts/Post.js'


export const state = () => ({
    posts: [],
    counter: 0,
    selectedPost: {}
})

export const mutations = {
    savePosts(state, payload) {
        state.posts = payload
    },
    savePost(state, payload) {
        state.selectedPost = payload
    }
}
export const actions = {

    async getPosts({ commit }) {
        try {
            commit('clearError', null, { root: true })
            commit('setLoading', true, { root: true })
            let post;
            post = await firebase.database().ref('posts').orderByChild('time').startAt(0).limitToLast(11).once('value')
            let posts = post.val()
            let postsArray = [];
            Object.keys(posts).forEach(key => {
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
            commit('setLoading', false, { root: true })
            commit('savePosts', postsArray)
        } catch (error) {
            commit('setLoading', false, { root: true })
            commit('setError', error.message, { root: true })
            throw error
        }
    },
    async getPost({ commit }, payload) {
        try {
            commit('clearError', null, { root: true })
            commit('setLoading', true, { root: true })
            const post = await firebase.database().ref('posts/' + payload).once('value');
            const p = post.val();
            const selectedPost = new Post(
                p.postName,
                p.postContent,
                p.description,
                p.userId,
                payload,
                p.url,
                p.category,
                p.publish,
                p.time
            )
            commit('setLoading', false, { root: true })
            commit('savePost', selectedPost)
        } catch (error) {
            commit('setLoading', false, { root: true })
            commit('setError', error.message, { root: true })
            throw error
        }
    }
}
export const getters = {

    AllPosts: state => {
        return state.posts
    },
    getPost: state => {
        return state.selectedPost
    },
}