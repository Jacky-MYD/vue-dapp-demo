
const mutations = {
    'WEB3':(state, data) => {
        let result = data;
        console.log(555, data)
        let web3Copy = state.web3;
        web3Copy.coinbase = result.coinbase;
        web3Copy.networkId = result.networkId;
        web3Copy.isInjected = result.injectedWeb3;
        web3Copy.web3Instance = result.web3;
        state.web3 = web3Copy;
    },
    'ACCOUNT_CONTRACT': (state, data) => {
        state.accountContract = () => data;
    }
};
export default mutations;
