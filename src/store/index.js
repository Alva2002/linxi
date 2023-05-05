import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
new Vuex.Store({
    state: {
        articles
    },
    getters: {},
    mutations: {
        articles: (state, articles) => {
            state.articles = articles
            window.localStorage.setItem('articles', JSON.stringify(articles))
        }
    }
})