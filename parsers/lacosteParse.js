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
                    item.categoryId = item.categoryId[item.categoryId.length - 1]
                }
                if (item.categoryId === 'Поло') item.categoryId = 'Футболки Поло'

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

                                        Object.keys(sizesShortsObj).forEach(size => {

                                            if (i === +size) resultParamArr.push(sizesShortsObj[size])
                                        })
                                    }

                                    item.params.size = resultParamArr
                                } else item.params.size = paramArr
                            }



                            if (item.categoryId === 'Толстовки') {

                                // const sizesHoodiesObj = {
                                //     2: 'XS',
                                //     3: 'S',
                                //     4: 'M',
                                //     5: 'M-L',
                                //     6: 'L',
                                //     7: 'XL',
                                //     34: 'XXXS',
                                //     36: 'XXS',
                                //     38: 'XS',
                                //     40: 'S',
                                //     42: 'XXS',
                                //     44: 'XS',
                                //     46: 'S',
                                //     48: 'M',
                                //     50: 'L',
                                //     52: 'XL',
                                //     54: 'XXL',
                                // }
                                //
                                // if (!isNaN(paramArr[0])) {
                                //
                                //     for (let i = +paramArr[0]; i <= +paramArr[paramArr.length - 1]; i++) {
                                //
                                //         Object.keys(sizesShortsObj).forEach(size => {
                                //
                                //             if (i === +size) resultParamArr.push(sizesShortsObj[size])
                                //         })
                                //     }
                                //
                                //     item.params.size = resultParamArr
                                // } else item.params.size = paramArr
                                //
                                // console.log(item.params.size);
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

            // console.log(itemArr);

            resolve(itemArr)

        } catch (e) {
            console.log(e);
        }
    })
}
