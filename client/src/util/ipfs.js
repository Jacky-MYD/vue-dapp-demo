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