import firebase from 'firebase/app'
import Category from './category_help.js'
export default {

    state: {
        categories: [
        ]
    },
    mutations: {
        loadCategories(state, payload) {
            state.categories = payload;
        },
        saveCategories(state, payload) {
            state.categories = payload;
        },


    },
    actions: {
        async loadCategories({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const cat = await firebase.database().ref('categories').once('value');
                if (cat.val() != null) {
                    const categories = cat.val();
                    const categoriesArray = [];

                    Object.keys(categories).forEach(key => {
                        const p = categories[key]
                        categoriesArray.push(
                            new Category(
                                p.categoryName,
                                key,
                            )
                        )
                    })
                commit('loadCategories', categoriesArray)
                }else{
                    commit('loadCategories', []) 
                }


                
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },


        async saveCategories({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                //logic
                const newCategory = new Category(
                    payload.categoryName,
                    null
                );
                const category = await firebase.database().ref('categories').push(newCategory);

                //commit('saveCategories', category);
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async removeCategory({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                //logic
                console.log(payload.id);
                await firebase.database().ref('categories/' + payload.id).remove();
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }
        },

        async updateCategories({ commit, getters }, payload) {
            // commit('clearError')
            // commit('setLoading', true)
            // try {
            //     //logic
            //     const updatedPost = new Post(
            //         payload.postName,
            //         payload.postContent,
            //         payload.description,
            //         getters.user.id,
            //         null,
            //         payload.url
            //         );
            //      await firebase.database().ref('posts/'+payload.id).update(
            //         updatedPost
            //     );
            //     commit('setLoading', false)
            // } catch (error) {
            //     commit('setLoading', false)
            //     commit('setError', error.message)
            //     throw error
            // }
        },




    },

    getters: {
        categories: state => {

            return state.categories
        },
        // post: state=>id=>{
        //     return state.posts.find(state => state.id === id);
        // },
    }
}