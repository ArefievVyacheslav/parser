module.exports = function lacosteParse(itemArr) {

    return new Promise(resolve => {

        try {
            // 2.2. Прохожусь по каждому объекту товара
            itemArr.forEach(item => {

                item.shop = 'lacoste'

                item.brand = item.vendor
                delete item.vendor

                // 2.3. Создаю доп.свойство для объединения параметров цвета, размера, возраста
                item.params = {}

                // 2.4. Получаю категорию
                if (item.categoryId.includes('/')) {
                    item.categoryId = item.categoryId.split('/');
                    item.category = item.categoryId[item.categoryId.length - 2]
                    item.categoryId = item.categoryId[item.categoryId.length - 1]
                }
                if (item.categoryId === 'Поло') item.categoryId = 'Футболки Поло'
                if (item.categoryId === 'Спортивная одежда') item.categoryId = 'Штаны'
                if (item.categoryId === 'Верхняя одежда') item.categoryId = 'Куртки'
                if (item.categoryId === 'Сумки и кошельки') item.categoryId = 'Сумки, Рюкзаки и Кошельки'

                // 2.5. Прохожусь по каждому параметру
                if (!!item.param && item.param.includes('|')) {

                    const paramsArr = item.param.split('|')

                    paramsArr.map(option => {
                        const oneParamArr = option.split(':')

                        if (oneParamArr[0] === 'Пол') item.params.gender = oneParamArr[1]
                        if (oneParamArr[0] === 'Артикул') item.params.article = oneParamArr[1];
                        if (oneParamArr[0] === 'Цвет') item.params.color = oneParamArr[1];

                // ОБРАБОТКА РАЗМЕРОВ
                        if (oneParamArr[0] === 'Размер' && oneParamArr[1].includes(',')) {
                            // Получаю массив размеров
                            let paramArr = oneParamArr[1].split(',');
                            // Удаля пробелы вначале и в конце
                            paramArr = paramArr.map(size => size.trim())

                            const resultParamArr = [];

                            if (item.categoryId === 'Нижнее белье и шорты') {

                                const sizesShortsObj = {
                                    2: 'XS',
                                    3: 'M',
                                    4: 'L',
                                    5: 'L-XL',
                                    6: 'XL',
                                    8: 'XXL',
                                    38: 'XS',
                                    40: 'S',
                                    42: 'M',
                                    44: 'L',
                                    46: 'L-XL',
                                    48: 'XL',
                                    50: 'XXL',
                                }

                                if (!isNaN(paramArr[0])) {

                                    for (let i = +paramArr[0]; i <= +paramArr[paramArr.length - 1]; i++) {

                                        Object.keys(sizesShortsObj).forEach(size => {

                                            if (i === +size) resultParamArr.push(sizesShortsObj[size])
                                        })
                                    }

                                    item.params.size = resultParamArr
                                } else item.params.size = paramArr
                            }

                            if (item.categoryId === 'Футболки' || item.categoryId === 'Футболки Поло') {

                                const sizesTShortsObj = {
                                    2: 'XS',
                                    3: 'S',
                                    4: 'M',
                                    5: 'M-L',
                                    6: 'L',
                                    7: 'XL',
                                    34: 'XXXS',
                                    36: 'XXS',
                                    38: 'XS',
                                    40: 'S',
                                    42: 'XXS',
                                    44: 'XS',
                                    46: 'S',
                                    48: 'M',
                                    50: 'L',
                                    52: 'XL',
                                    54: 'XXL',
                                }

                                if (!isNaN(paramArr[0])) {

                                    for (let i = +paramArr[0]; i <= +paramArr[paramArr.length - 1]; i++) {

                                        Object.keys(sizesTShortsObj).forEach(size => {

                                            if (i === +size) resultParamArr.push(sizesTShortsObj[size])
                                        })
                                    }

                                    item.params.size = resultParamArr
                                } else item.params.size = paramArr
                            }

                            if (item.categoryId === 'Толстовки') {

                                const sizesHoodiesObj = {
                                    2: 'XS',
                                    3: 'S',
                                    4: 'M',
                                    5: 'M-L',
                                    6: 'L',
                                    7: 'XL',
                                    34: 'XXXS',
                                    36: 'XXS',
                                    38: 'XS',
                                    40: 'S',
                                    42: 'XXS',
                                    44: 'XS',
                                    46: 'S',
                                    48: 'M',
                                    50: 'L',
                                    52: 'XL',
                                    54: 'XXL',
                                }

                                if (!isNaN(paramArr[0])) {

                                    for (let i = +paramArr[0]; i <= +paramArr[paramArr.length - 1]; i++) {

                                        Object.keys(sizesHoodiesObj).forEach(size => {

                                            if (i === +size) resultParamArr.push(sizesHoodiesObj[size])
                                        })
                                    }

                                    item.params.size = resultParamArr
                                } else item.params.size = paramArr
                            }

                            if (item.categoryId === 'Штаны' || item.categoryId === 'Брюки') {

                                const sizesTrousersObj = {
                                    2: 'XXS',
                                    3: 'XXS',
                                    4: 'XS',
                                    5: 'XS',
                                    6: 'S',
                                    7: 'S',
                                    8: 'M',
                                    32: 'XXS',
                                    34: 'XS',
                                    36: 'S',
                                    38: 'M',
                                    40: 'M',
                                    42: 'L',
                                    44: 'L'
                                }

                                if (!isNaN(paramArr[0])) {

                                    for (let i = +paramArr[0]; i <= +paramArr[paramArr.length - 1]; i++) {

                                        Object.keys(sizesTrousersObj).forEach(size => {

                                            if (i === +size && !resultParamArr.includes(sizesTrousersObj[size])) resultParamArr.push(sizesTrousersObj[size])
                                        })
                                    }

                                    item.params.size = resultParamArr
                                } else item.params.size = paramArr
                            }

                            if (item.categoryId === 'Платья и юбки') {

                                const sizesDressesObj = {
                                    32: 'XXS',
                                    34: 'XS',
                                    36: 'S',
                                    38: 'M',
                                    40: 'M',
                                    42: 'L',
                                    44: 'L'
                                }

                                if (!isNaN(paramArr[0])) {

                                    for (let i = +paramArr[0]; i <= +paramArr[paramArr.length - 1]; i++) {

                                        Object.keys(sizesDressesObj).forEach(size => {

                                            if (i === +size) resultParamArr.push(sizesDressesObj[size])
                                        })
                                    }

                                    item.params.size = resultParamArr
                                } else item.params.size = paramArr
                            }

                            if (item.categoryId === 'Куртки') {

                                const sizesJacketsObj = {
                                    32: 'XXS',
                                    34: 'XS',
                                    36: 'S',
                                    38: 'M',
                                    40: 'M',
                                    42: 'L',
                                    44: 'L',
                                    46: 'S',
                                    48: 'M',
                                    50: 'L',
                                    52: 'XL',
                                    54: 'XXL',
                                    56: 'XXXL',
                                    58: 'XXXXL'
                                }

                                if (!isNaN(paramArr[0])) {

                                    for (let i = +paramArr[0]; i <= +paramArr[paramArr.length - 1]; i++) {

                                        Object.keys(sizesJacketsObj).forEach(size => {

                                            if (i === +size) resultParamArr.push(sizesJacketsObj[size])
                                        })
                                    }

                                    item.params.size = resultParamArr
                                } else item.params.size = paramArr
                            }

                            if (item.categoryId === 'Блузы и рубашки' || item.categoryId === 'Блузы и рубашки') {

                                const sizesShirtsObj = {
                                    32: 'XXS',
                                    34: 'XS',
                                    36: 'S',
                                    38: 'M',
                                    40: 'M',
                                    42: 'L',
                                    44: 'L',
                                    46: 'S',
                                    48: 'M',
                                    50: 'L',
                                    52: 'XL',
                                    54: 'XXL',
                                    56: 'XXXL'
                                }

                                if (!isNaN(paramArr[0])) {

                                    for (let i = +paramArr[0]; i <= +paramArr[paramArr.length - 1]; i++) {

                                        Object.keys(sizesShirtsObj).forEach(size => {

                                            if (i === +size) resultParamArr.push(sizesShirtsObj[size])
                                        })
                                    }

                                    item.params.size = resultParamArr
                                } else item.params.size = paramArr
                            }

                            if (item.categoryId === 'Кроссовки' || item.categoryId === 'Кеды') {

                                const sizesSneakersObj = {
                                    4: '36.5',
                                    5: '37.5',
                                    6: '38',
                                    6.5: '38.5',
                                    7: '39',
                                    7.5: '39.5',
                                    8: '40',
                                    8.5: '40.5',
                                    9: '41',
                                    9.5: '41.5',
                                    10: '42',
                                    10.5: '42.5',
                                    11: '43',
                                    11.5: '43.5',
                                    12: '44',
                                    12.5: '44.5',
                                    13: '45'
                                }

                                if (!isNaN(paramArr[0])) {

                                    for (let i = +paramArr[0]; i <= +paramArr[paramArr.length - 1]; i++) {

                                        Object.keys(sizesSneakersObj).forEach(size => {

                                            if (i === +size) resultParamArr.push(sizesSneakersObj[size])
                                        })
                                    }

                                    item.params.size = resultParamArr
                                } else item.params.size = paramArr
                            }
                        }

                        if (oneParamArr[0] === 'Размер' && !oneParamArr[1].includes(',')) item.params.size = [...oneParamArr[1]]

                        if (oneParamArr[0] === 'Размер') {
                            if (item.params.size === undefined) {
                                item.params.size = []
                                item.params.size.push(oneParamArr[1])
                            }
                        }

                        delete item.param

                    })
                }
            })

            resolve(itemArr)

        } catch (e) {
            console.log(e);
        }
    })
}
