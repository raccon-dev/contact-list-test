export const getterList = {
    getContacts: state => state.users,
    getContactById: state => {
        return id => {
            for (let user of state.users) {
                if (user.id === +id) {
                    return user;
                }
            }
        }
    }
};