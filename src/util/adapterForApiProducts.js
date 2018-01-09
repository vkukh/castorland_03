export const adapter = response => {
    let adapter = {
        items: [],
        links: {},
        meta: {}
    }
    let temp_items = []

    for (let key in adapter) adapter[key] = response.data[`_${key}`]
    for (let item of adapter.items) {
        temp_items.push({
            id: item.id,
            price_retail: item.price ? item.price.retail : 0,
            name: item.name ? item.name : 'no name',
            image_url: item.images[0]
                        ? item.images[0].thumbnails.category.url
                        : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
            meta_subject: item.meta["Тематика"]
                            ? item.meta["Тематика"][0]
                            : 'no subject',
            meta_quantity: item.meta["Количество деталей"]
                            ? item.meta["Количество деталей"][0]
                            : 'no quantity',
            meta_size: item.meta["Размер пазла"]
                        ? item.meta["Размер пазла"][0]
                        : 'no size',
            meta_age: item.meta["Возраст"]
                        ? item.meta["Возраст"][0]
                        : 'no age'
        })
    }
    adapter.items = temp_items

    /**
     * add a number of the last page
     */
    adapter.meta.last_page = Math.ceil(
        adapter.meta.total / adapter.meta.max_results
    )

    return adapter
}
