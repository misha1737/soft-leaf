import firebase from 'firebase/app'
import Category from '../srcripts/Category.js'


export const state = () =>( {
        categories: [
        ]
    })
    export const mutations={
        loadCategories(state, payload) {
            state.categories = payload;
        },
        saveCategories(state, payload) {
            state.categories = payload;
        },


    }
    export const actions={
        async loadCategories({ commit }) {
            commit('clearError', null,{ root: true })
            commit('setLoading', true,{ root: true })
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


                
                commit('setLoading', false,{ root: true })
            } catch (error) {
                commit('setLoading', false,{ root: true })
                commit('setError', error.message,{ root: true })
                throw error
            }
        },


        async saveCategories({ commit,state}) {
            commit('clearError', null,{ root: true })
            commit('setLoading', true, { root: true })
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
             
                commit('setLoading', false, { root: true })
            } catch (error) {
                commit('setLoading', false, { root: true })
                commit('setError', error.message,{ root: true })
                throw error
            }
        },
        async removeCategory({ commit }, payload) {
            commit('clearError', null,{ root: true })
            commit('setLoading', true, { root: true })
            try {
                //logic
                
                await firebase.database().ref('categories/' + payload.id).remove();
                commit('setLoading', false,{ root: true });
            } catch (error) {
                commit('setLoading', false, { root: true });
                commit('setError', error.message,{ root: true });
                throw error
            }
        },

        async updateAllCategories({ commit }, payload) {
             commit('clearError', null,{ root: true })
             commit('setLoading', true, { root: true })
            try {
                //logic
                 await firebase.database().ref('posts/'+payload.id).update(
                    payload
                );
                commit('setLoading', false, { root: true })
            } catch (error) {
                commit('setLoading', false, { root: true })
                commit('setError', error.message,{ root: true })
                throw error
            }
        },




    }

    export const getters= {
        categories: state =>  state.categories,
        categoryId: state=>name=>state.categories.find(state => state.categoryName === name) 
    }
