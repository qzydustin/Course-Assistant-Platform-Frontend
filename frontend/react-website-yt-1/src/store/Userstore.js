import { extendObservable } from "mobx";

/**
 * userStore
 */
 class UserStore {
     constructor()
     {
         extendObservable(this, {
            loading:true,
            isLoggedin: false,
            username: ''

         })
     }
 }
 export default new UserStore();