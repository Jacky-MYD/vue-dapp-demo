# vue-dapp-demo
经过好一段时间的折腾，还好搞出一个稍微有点含金量的的提升，在这里得感谢我的大飞哥的鼎力支持！阿里嘎多。。。
##该demo涉及的技术点(仅供参考)：
[element-ui]([https://element.eleme.cn/#/zh-CN/component/installation](https://element.eleme.cn/#/zh-CN/component/installation)
)
[koa2]([https://www.liaoxuefeng.com/wiki/1022910821149312/1099752344192192](https://www.liaoxuefeng.com/wiki/1022910821149312/1099752344192192)
)
[MongoDB]([https://www.runoob.com/mongodb/mongodb-tutorial.html](https://www.runoob.com/mongodb/mongodb-tutorial.html)
)
[Solidity]([https://solidity.readthedocs.io/en/v0.5.10/](https://solidity.readthedocs.io/en/v0.5.10/)
)
[go-ethereum]([https://www.jianshu.com/p/65ae648b97ae](https://www.jianshu.com/p/65ae648b97ae)
)
[PFS星际文件系统]([https://docs.ipfs.io/introduction/usage/#install-ipfs](https://docs.ipfs.io/introduction/usage/#install-ipfs)
)
[web3]([http://cw.hubwiz.com/card/c/web3.js-1.0/1/4/1/](http://cw.hubwiz.com/card/c/web3.js-1.0/1/4/1/)
)
[truffle]([https://www.trufflesuite.com/docs](https://www.trufflesuite.com/docs)
)
## 辅助链接及工具：
[Solidity在线编译]([http://remix.ethereum.org/#optimize=false&evmVersion=null&appVersion=0.7.7&version=soljson-v0.5.8+commit.23d335f2.js](http://remix.ethereum.org/#optimize=false&evmVersion=null&appVersion=0.7.7&version=soljson-v0.5.8+commit.23d335f2.js)
)
[MateMask]([https://www.baidu.com/link?url=GKADelIN0XGHXbiL6rK60mMeYBBBP7IEBLeAjDVq3Fs9DW2VCQH2d6bt4KNcFEsq&wd=&eqid=decf7fdb00007f43000000065d3d5838](https://www.baidu.com/link?url=GKADelIN0XGHXbiL6rK60mMeYBBBP7IEBLeAjDVq3Fs9DW2VCQH2d6bt4KNcFEsq&wd=&eqid=decf7fdb00007f43000000065d3d5838)
)
[源码地址]([https://github.com/Jacky-MYD/vue-dapp-demo](https://github.com/Jacky-MYD/vue-dapp-demo)
): [https://github.com/Jacky-MYD/vue-dapp-demo](https://github.com/Jacky-MYD/vue-dapp-demo)

至于开发环境的搭建应该是比较繁琐的，上述链接可以参考，当然各技术点的官网会好一点。

###项目目录
![image.png](https://upload-images.jianshu.io/upload_images/7458297-75ee2fd2994f787b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)
内置客户端（client）和服务端（serve），可以download项目
启动项目：
1.启动：MongoDB
```
sudo mongod
```
2.cd到服务端：
```
cd serve 
npm install
npm run start // 默认端口8081
```
3.cd到客户端
```
cd clietn 
npm install
npm run dev // 默认端口：8090
```
4.打开Ganache，默认本地环境：http://127.0.0.1:7545
5.登录MateMask
6.启动ipfs环境
```
ipfs daemon
```
7.浏览器访问：[http://127.0.0.1:8090](http://127.0.0.1:8090)
在各种环境都启动好之后，就可以通过合约进行注册用户

demo简介
在编写好服务端register的API以及客户端代码后（这里就不解释了），
编写合约：
Account.sol
```
pragma solidity ^0.5.8;
import "./SafeMath.sol";//开源的安全操作unit256的合约

contract Account{
    using SafeMath for uint256;
    //新成员创建事件
    event NewMember(string _name, string _avator);
    //成员信息结构
    struct Member {
        string name;//名字
        string avatar;//头像
        bool isExist;//是否注册
        uint256 balance;//可周转余额
    }
    //地址到成员信息的mapping
    mapping(address => Member) internal addressToMember;
    //限制调用的条件
    modifier onlyMemberOf(address _from){
        require(addressToMember[_from].isExist);
        _;
    }
    // 注册
    function registerMember(string memory _name, string memory _avatar) public {
        require(!isMemberOf());
        addressToMember[msg.sender] = Member(_name, _avatar, true, 0);
        emit NewMember(_name, _avatar);
    }
  ...
}
```
通过truffle进行合约编译 ，编译后会得一个Account.json文件，里面含有合约的ABI和合约地址等信息
```
const Account = artifacts.require("Account");

module.exports = function(deployer) {
  deployer.deploy(Account);
};
```
连接web3
```
import Web3 from 'web3'

let getWeb3 = new Promise((resolve, rejects) => {
    var web3js = window.web3;
    var web3Provider;
    if (typeof web3js !== 'undefined') {
        web3Provider = web3js.currentProvider;
    } else {
        // If no injected web3 instance is detected, fall back to Ganache
        web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    }
    var web3 = new Web3(web3Provider);
    resolve({
        injectedWeb3: web3.eth.net.isListening(),
        web3() {
            return web3
        }
    })
}).then((result) => {
    return new Promise(function (resolve, reject) {
        result.web3().eth.net.getId((err, networkId) => {
            if(err) {
                reject(new Error('Unable to retrieve network ID'))
            } else {
                console.log('retrieve newworkId: ' + networkId)
                result = Object.assign({}, result, {networkId})
                resolve(result)
            }
        })
  	})
}).then(result => {
  	return new Promise(function (resolve, reject) {
        result.web3().eth.getCoinbase((err, coinbase) => {
            if(err) {
            reject(new Error('Unable to retrieve coinbase'))
        } else {
            coinbase = result.web3().utils.toChecksumAddress(coinbase);
            console.log('retrieve coinbase: '+ coinbase);
            result = Object.assign({}, result, {coinbase});
            resolve(result)
        }})
  	})
});

export default getWeb3
```
通过web3调用合约中的方法
```
import Web3 from 'web3'
import { address, ABI } from './comtractsAbi/Account'
import AccountContract from '../../build/contracts/Account'

let getContract = new Promise((resolve, rejects) => {
    let web3 = new Web3(window.web3.currentProvider)
    let MyContract = new web3.eth.Contract(AccountContract.abi, AccountContract.networks[5777].address)
    if (!MyContract) {
        reject("no contract instance build")
      }
      resolve(MyContract);
})

export default getContract
```
配置ipfs
```
import ipfsAPI from 'ipfs-api'
import util from './util'

let ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

let ipfsPublic = {
    /**
     * set ipfs
     */
    add: (param) => {
        return new Promise(async (resolve, reject) => {
            const buffer = Buffer.from(param)
            await ipfs.add(buffer).then( rsp => {
                resolve(rsp[0].hash)
            }).catch(err => {
                console.error(err)
                reject (err)
            })
        })
        
    },
    /**
     * get ipfs buffer
     */
    getBuff: (hash) => {
        return new Promise(async (resolve, reject) => {
            await ipfs.cat(hash).then( buff => {
                resolve(buff)
            })
            .catch(err => {
                console.error(err)
                reject (err)
            })
        })
    },
    /**
     * buffer to utf-8 str
     */
    get: (hash) => {
        return new Promise(async (resolve, reject) => {
            await ipfs.cat(hash).then( buff => {
                let strContent = util.Utf8ArrayToStr(buff);
                resolve(strContent)
            })
            .catch(err => {
                console.error(err)
                reject (err)
            })
        })
    }
}

export default ipfsPublic
```
至于代码详情，可看源码
项目流程简单说明
在合约部署后，项目启动完成时，会得到一个合约地址（address："0x07f417017aa903616eecc7fb4932b7f1383305a3"）
![image.png](https://upload-images.jianshu.io/upload_images/7458297-670b9e7e5f73835d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在点击注册后，注册信息会存储到ipfs中，ipfs将返回一个hash值（'QmT1QLKwUkgsR2uR8XFxhyoVp3SRnJFyxqHvdPG1RicUS6'），用于获取相应的信息
获取hash后，通过合约地址调用合约中的registerMember方法，然后会自动打开MateMask，进行一笔交易
![image.png](https://upload-images.jianshu.io/upload_images/7458297-41216c049ec65286.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)
交易完整后，就会产生一个block(块)，这个block中含有一些信息，如：调用者（address："0xd0922930b70f81777458aa965482bf6f28ea840a"），交易hash（transactionHash: "0xeddcf41eb0b35004bdc95daaeb31708a2634cc577e1bf13f69c5506d3ea69215"），区块高度（blockNumber：33）等
![image.png](https://upload-images.jianshu.io/upload_images/7458297-154f396f5058fa6b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
最后，我在这里将一些相应的字段信息同步到MongoDB中。
Over！！！


