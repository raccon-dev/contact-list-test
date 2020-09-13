import { Object } from 'core-js';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        users: [
            {
                id: 1,
                name: 'Bob',
                avatar: './img/Bob.jpg',
                userSelfInfo: {
                    'phone': '12025550116',
                    'email': 'Bob@gmai.com'
                }
            },
            {
                id: 2,
                name: 'Angela',
                avatar: '/img/Angela.jpg',
                userSelfInfo: {
                    'phone': '12025550116',
                    'email': 'Angela@gmai.com'
                }
            },
            {
                id: 3,
                name: 'Amir',
                avatar: '/img/Amir.jpg',
                userSelfInfo: {
                    'phone': '12025550116',
                    'email': 'Amir@gmai.com'
                }
            },
            {
                id: 4,
                name: 'Mari',
                avatar: '/img/Mari.jpg',
                userSelfInfo: {
                    'phone': '12025550116',
                    'email': 'Mari@gmai.com'
                }
            },
            {
                id: 5,
                name: 'Alexa',
                avatar: '/img/Alexa.jpg',
                userSelfInfo: {
                    'phone': '12025550116',
                    'email': 'Alexa@gmai.com'
                }
            },
            
        ],



    },
    beforeEditingCache: {},

    mutations: {
        clearEditingCache() {
            this.beforeEditingCache = {};
        },
        stepBack(state) {
            if (this.beforeEditingCache === undefined
                || Object.keys(this.beforeEditingCache).length === 0
                && this.beforeEditingCache.constructor === Object) {
                return;
            }
            const copyOf = JSON.parse(this.beforeEditingCache);
            state.users = [...copyOf.users]
        },

        createContact(state, args) {
            state.users.push({
                id: +(new Date),
                name: args.contactName,
                avatar: '',
                userSelfInfo: {}
            });
            console.log(state.users)
        },
        contactAddNewLine(state, args) {
            this.beforeEditingCache = JSON.stringify(state);


            for (let user of state.users) {
                if (user.id === args.uid) {
                    user.userSelfInfo = {
                        ...user.userSelfInfo,
                        [args.newLine[0].toLowerCase()]: args.newLine[1]
                    };
                }
            }

        },
        contactRemoveLine(state, args) {
            this.beforeEditingCache = JSON.stringify(state);
            for (let user of state.users) {
                if (user.id === args.uid) {
                    const copyObj = { ...user.userSelfInfo }
                    delete copyObj[args.key]
                    user.userSelfInfo = copyObj

                }
            }

        },
        contactEditLine(state, args) {
            this.beforeEditingCache = JSON.stringify(state);
            function renameKeys(obj, newKeys) {
                const keyValues = Object.keys(obj).map(key => {
                    const newKey = newKeys[key] || key;
                    return { [newKey]: obj[key] };
                });
                return Object.assign({}, ...keyValues);
            }


            const { oldData, newData } = args;
            const oldKey = Object.keys(oldData).join()
            const newKey = Object.keys(newData).join()
            const newValue = Object.values(newData).join()

            for (let user of state.users) {
                if (user.id === args.uid) {
                    let copyObj = { ...user.userSelfInfo }
                    for (let [key] of Object.entries(copyObj)) {
                        if (key === oldKey) {
                            const newKeys = { [oldKey]: newKey };
                            copyObj = renameKeys(copyObj, newKeys);
                            copyObj[newKey] = newValue
                        }

                    }

                    user.userSelfInfo = copyObj

                }
            }
            console.log(state, args)

        },
        deleteContact(state, args) {
            state.users = [...state.users].filter(user => user.id !== args.id);
        }
    },
    getters: {
        getContacts: state => state.users,

        getContactById: state => {
            return id => {

                for (let user of state.users) {
                    if (user.id === +id) {
                        console.log(user)
                        return user;
                    }
                }



            }
        }
    },

    actions: {

    }
})

