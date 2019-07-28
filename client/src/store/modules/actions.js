import {api} from './api';
import ajax from '../ajax';
import getWeb3 from '../../util/getWeb3'
import getContract from '../../util/getContract'

const actions = {
    async initWeb3 ({commit}, data) {
        await getWeb3.then(res => {
            commit('WEB3', res)
        }).catch(err => {
            console.log('error in action registerWeb3', err)
        })
    },
    async initContract ({commit}, data) {
        await getContract.then(result => {
            commit('ACCOUNT_CONTRACT', result)
          }).catch(e => console.log(e))
    },
    register ({commit}, data) {
        return ajax.post(api.register, data)
    },
    productList ({commit}, data) {
        return ajax.get(api.productList, data)
    },
    insertProduct ({commit}, data) {
        return ajax.post(api.insertProduct, data)
    },
};
export default actions;
