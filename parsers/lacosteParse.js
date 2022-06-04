module.exports = function lacosteParse(itemArr) {

    return new Promise(resolve => {

        try {
            // 2.2. Прохожусь по каждому объекту товара
            itemArr.forEach(item => {

                item.shop = 'lacoste'
                item.link = 'https://ad.admitad.com/g/f446ccbb45e7566f8b4dd5f2d2f9d4/?ulp=https%3A%2F%2Flacoste.ru%2F'
                item.shopLink = '/shop/lacoste'
                item.sale = +((100 - (item.price / (item.oldprice / 100))).toFixed())
                item.price = +item.price
                item.oldprice = +item.oldprice
                item.instalments = true
                item.benefit = item.oldprice - item.price
                item.delivery = 'Россия'
                if (item.vendor) item.brand = item.vendor
                delete item.vendor

                // 2.3. Создаю доп.свойство для объединения параметров цвета, размера, возраста
                item.params = {}
                item.params.rating = (Math.random() * (5 - 4.7) + 4.7).toFixed(2)
                item.params.purchases = (Math.random() * (4 - 2) + 2).toFixed()

                // 2.4. Получаю категорию
                if (item.categoryId.includes('/')) {
                    item.categoryId = item.categoryId.split('/');
                    item.category = item.categoryId[item.categoryId.length - 2]
                    item.categoryId = item.categoryId[item.categoryId.length - 1]
                }
                if (item.categoryId === 'Поло') item.categoryId = 'Футболки Поло'
                if (item.categoryId === 'Спортивная одежда') item.categoryId = 'Штаны и брюки'
                if (item.categoryId === 'Брюки') item.categoryId = 'Штаны и брюки'
                if (item.categoryId === 'Верхняя одежда') item.categoryId = 'Куртки'
                if (item.categoryId === 'Сумки и кошельки') item.categoryId = 'Сумки, Рюкзаки и Кошельки'

                // 2.5. Прохожусь по каждому параметру
                if (!!item.param && item.param.includes('|')) {

                    const paramsArr = item.param.split('|')

                    paramsArr.map(option => {
                        const oneParamArr = option.split(':')

                        if (oneParamArr[0] === 'Пол') item.params.gender = oneParamArr[1]
                        if (oneParamArr[0] === 'Артикул') item.params.article = oneParamArr[1];
                        if (oneParamArr[0] === 'Цвет') {
                            let coincidence = false
                            if (oneParamArr[1] === 'Чёрный'
                                || oneParamArr[1] === 'Тёмно-Серый'
                                || oneParamArr[1] === 'чёрный'
                                || oneParamArr[1] === 'черный') {
                                coincidence = true
                                item.params.color = 'Чёрный'
                            }
                            if (oneParamArr[1] === 'Белый'
                                || oneParamArr[1] === 'белый'
                                || oneParamArr[1] === 'молочный'
                                || oneParamArr[1] === 'Серый'
                                || oneParamArr[1] === 'серый'
                                || oneParamArr[1] === 'Бежевый'
                                || oneParamArr[1] === 'бежевый'
                                || oneParamArr[1] === 'Серебристый') {
                                coincidence = true
                                item.params.color = 'Белый'
                            }
                            if (oneParamArr[1] === 'Красный'
                                || oneParamArr[1] === 'красный'
                                || oneParamArr[1] === 'бордовый'
                                || oneParamArr[1] === 'Бордовый') {
                                coincidence = true
                                item.params.color = 'Красный'
                            }
                            if (oneParamArr[1] === 'Оранжевый'
                                || oneParamArr[1] === 'оранжевый'
                                || oneParamArr[1] === 'персиковый'
                                || oneParamArr[1] === 'Персиковый') {
                                coincidence = true
                                item.params.color = 'Оранжевый'
                            }
                            if (oneParamArr[1] === 'Желтый'
                                || oneParamArr[1] === 'Жёлтый'
                                || oneParamArr[1] === 'жёлтый'
                                || oneParamArr[1] === 'желтый') {
                                coincidence = true
                                item.params.color = 'Желтый'
                            }
                            if (oneParamArr[1] === 'Розовый'
                                || oneParamArr[1] === 'розовый') {
                                coincidence = true
                                item.params.color = 'Розовый'
                            }
                            if (oneParamArr[1] === 'Фиолетовый'
                                || oneParamArr[1] === 'фиолетовый') {
                                coincidence = true
                                item.params.color = 'Фиолетовый'
                            }
                            if (oneParamArr[1] === 'Синий'
                                || oneParamArr[1] === 'синий'
                                || oneParamArr[1] === 'Тёмно-Синий'
                                || oneParamArr[1] === 'Тёмно-синий'
                                || oneParamArr[1] === 'темно-синий'
                                || oneParamArr[1] === 'тёмно-синий'
                                || oneParamArr[1] === 'тёмно-синяя'
                                || oneParamArr[1] === 'голубой'
                                || oneParamArr[1] === 'Голубой') {
                                coincidence = true
                                item.params.color = 'Синий'
                            }
                            if (oneParamArr[1] === 'Зелёный'
                                || oneParamArr[1] === 'Зеленый'
                                || oneParamArr[1] === 'зелёный'
                                || oneParamArr[1] === 'хаки'
                                || oneParamArr[1] === 'тёмно-зелёный'
                                || oneParamArr[1] === 'зеленый') {
                                coincidence = true
                                item.params.color = 'Зелёный'
                            }
                            if (oneParamArr[1] === 'Коричневый'
                                || oneParamArr[1] === 'коричневый') {
                                coincidence = true
                                item.params.color = 'Коричневый'
                            }
                            if (!coincidence) item.params.color = oneParamArr[1]
                        }

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
                item.name = `${item.name} ${item.params.article}`
            })

            resolve(itemArr)

        } catch (e) {
            console.log(e);
        }
    })
}
