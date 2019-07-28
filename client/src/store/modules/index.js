import getters from './getters';
import actions from './actions';
import mutations from './mutations';
const state = {
    web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        error: null
    },
    accountContract: null
};
export default {
    state,
    getters,
    actions,
    mutations
}
