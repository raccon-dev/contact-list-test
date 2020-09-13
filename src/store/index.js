import Vue from 'vue'
import Vuex from 'vuex'

import { users } from './_users'

import { mutationList } from './mutationsList'
import { getterList } from './gettersList'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        users: [
            ...users
        ],
    },
    beforeEditingCache: {},

    mutations: {
        ...mutationList
    },
    getters: {
        ...getterList
    },

    actions: {}
})

