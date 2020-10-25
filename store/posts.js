import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'
import Post from '../srcripts/Post.js'  


    export const state = () => ({
        posts: [],
        counter: 0,
        selectedPost:{}
    })

    export const mutations = {
        savePosts (state, payload) {
            state.posts=payload
          },
        savePost (state, payload) {
            state.selectedPost=payload
          }
      }
    export const actions = {

        async getPosts ({ commit}) {
            try {
                let post;
                    post =await firebase.database().ref('posts').orderByChild('time').startAt(0).limitToLast(11).once('value')
                    let posts =post.val()
                    let postsArray=[];
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
                    commit('savePosts', postsArray)
                }catch (error) {
                throw error
            }
        },
        async getPost ({ commit}, payload) {
            try {
                const post= await firebase.database().ref('posts/'+payload).once('value');
                const p=post.val();
                    const selectedPost=new Post(
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
                
                    commit('savePost', selectedPost)
                }catch (error) {
                throw error
            }
        }
    }
export const getters = {

    AllPosts: state => {
      return state.posts
    },
    getPost: state  => {
        return state.selectedPost
    },
}