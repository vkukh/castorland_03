import axios from 'axios'

const _api = 'http://test.nv4hqsgnvx.eu-central-1.elasticbeanstalk.com/'
const _productParam = 'products?where={"catalogs":"castorland"}&page='

export function getProducts(page) {
    return new Promise((resolve, reject) => {
        let isString = toString.call(page) === '[object String]'
        let query = undefined 
        let adapter = {
            items: [],
            links: {},
            meta: {}
        }

        isString 
            ? query = _api + page 
            : query = _api + _productParam + page 
        axios.get(query)
            .then(response => {
                adapter.items = response.data._items
                adapter.links = response.data._links
                adapter.meta = response.data._meta
                adapter.meta.last_page = Math.ceil(adapter.meta.total / adapter.meta.max_results)
                resolve(adapter)
            })
            .catch(error => {
                console.warn(`Error in API ${error}`)
                reject(error)
            })
    })
}