import Web3 from 'web3'
import { address, ABI } from './comtractsAbi/Account'
import AccountContract from '../../build/contracts/Account'

let getContract = new Promise((resolve, rejects) => {
    let web3 = new Web3(window.web3.currentProvider)
    let MyContract = new web3.eth.Contract(AccountContract.abi, AccountContract.networks[5777].address)
    // let MyContract = new web3.eth.Contract(ABI, address)
    if (!MyContract) {
        reject("no contract instance build")
      }
      resolve(MyContract);
})

export default getContract