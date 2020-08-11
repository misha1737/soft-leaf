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
        async loadCategories({ commit }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const cat = await firebase.database().ref('categories').once('value');
                if (cat.val() != null) {
                    const categories = cat.val();
                    const categoriesArray = [];

                    Object.keys(categories).forEach(key => {
                        const p = categories[key]
                        let id;
                        p.id? id=p.id : id=key
                        categoriesArray.push(
                            new Category(
                                p.categoryName,
                                id,
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


        async saveCategories({ commit,state}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                //logic
             

                 await firebase.database().ref('categories/').remove();
                
                 state.categories.forEach(async item=>{
                    await state.categories
                    let newCategory = new Category(
                        item.categoryName,
                        item.id
                             );
                          
                             firebase.database().ref('categories/').push(newCategory);
                            })
             
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
                
                await firebase.database().ref('categories/' + payload.id).remove();
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }
        },

        async updateAllCategories({ commit }, payload) {
             commit('clearError')
             commit('setLoading', true)
            try {
                //logic
                 await firebase.database().ref('posts/'+payload.id).update(
                    payload
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
        categories: state => {

            return state.categories
        },
        categoryId: state=>name=>{
             return state.categories.find(state => state.categoryName === name);
         },
    }
}