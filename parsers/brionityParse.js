module.exports = function brionityParse(itemArr) {

    return new Promise(async resolve => {

        try {
            // const emptyPicturesArr = []

            // 2.2. Прохожусь по каждому объекту товара
            for (const item of itemArr) {

                item.id = +item.id
                item.shop = 'brionity'
                item.link = 'https://ad.admitad.com/g/ob1iyryocx41237c4d2c09008834d3/?ulp=https%3A%2F%2Fbrionity.com%2F'
                item.shopLink = '/shop/brionity'
                item.sale = +((100 - (item.price / (item.oldprice / 100))).toFixed())
                item.price = +item.price
                item.oldprice = +item.oldprice
                item.benefit = item.oldprice - item.price
                item.delivery = 'Россия'
                item.deliveryPrice = 290
                if (item.vendor) item.brand = item.vendor

                // 2.3. Получаю категорию
                if (item.categoryId.includes('/')) {
                    item.categoryIdArr = item.categoryId.split('/');

                    if (item.categoryId.length === 2) {
                        const category = item.categoryIdArr[item.categoryIdArr.length - 1].split(' ')
                        item.category = category[1].charAt(0).toUpperCase() + category[1].slice(1)
                        delete item.categoryId
                    }
                    if (item.categoryIdArr.length === 3) {
                        item.category = item.categoryIdArr[1]
                        if (item.category === 'Белье') item.category = 'Одежда'
                        if (item.category === 'Девушки') {
                            item.category = item.categoryIdArr[item.categoryIdArr.length - 1]
                            delete item.categoryId
                        } else item.categoryId = item.categoryIdArr[item.categoryIdArr.length - 1]
                        if (item.categoryId === 'Шлёпанцы') item.categoryId = 'Шлепанцы'
                    }
                    if (item.categoryIdArr.length === 4) {
                        const category = item.categoryIdArr[item.categoryIdArr.length - 2].split(' ')
                        if (category[1] && (category[1] === 'обувь' || category[1] === 'одежда' || category[1] === 'аксессуары')) item.category = category[1].charAt(0).toUpperCase() + category[1].slice(1)
                        else if (category[1]) item.categoryId = category[1]
                        else  item.categoryId = category[0]
                        const check = item.categoryId.split('/')
                        if (check.length === 4) item.categoryId = check[3]
                    }
                    if (item.categoryId === 'Женщины/Женская одежда') {
                        item.category = 'Одежда'
                        delete item.categoryId
                    }
                    if (item.categoryId === 'Женщины/Женская обувь') {
                        item.category = 'Обувь'
                        delete item.categoryId
                    }
                    if (item.categoryId === 'Парики и аксессуары') item.categoryId = 'Парики'
                    delete item.categoryIdArr
                }
                // 2.4. Создаю доп.свойство для объединения параметров цвета, размера, возраста
                item.params = {}
                item.params.rating = (Math.random() * (5 - 4.7) + 4.7).toFixed(2)
                item.params.purchases = (Math.random() * (4 - 2) + 2).toFixed()
                // 2.5. Прохожусь по каждому параметру
                if (!!item.param && item.param.includes('|')) {

                    const paramsArr = item.param.split('|')

                    paramsArr.map(option => {
                        const oneParamArr = option.split(':')

                        if (oneParamArr[0] === 'Цвет') {
                            if (oneParamArr[1] === 'Чёрный'
                                || oneParamArr[1] === 'Тёмно-Серый'
                                || oneParamArr[1] === 'черный') item.params.color = 'Чёрный'
                            if (oneParamArr[1] === 'Белый'
                                || oneParamArr[1] === 'Серый'
                                || oneParamArr[1] === 'Бежевый'
                                || oneParamArr[1] === 'Серебристый') item.params.color = 'Белый'
                            if (oneParamArr[1] === 'Красный'
                                || oneParamArr[1] === 'Бордовый') item.params.color = 'Красный'
                            if (oneParamArr[1] === 'Оранжевый') item.params.color = 'Оранжевый'
                            if (oneParamArr[1] === 'Желтый') item.params.color = 'Желтый'
                            if (oneParamArr[1] === 'Розовый') item.params.color = 'Розовый'
                            if (oneParamArr[1] === 'Фиолетовый') item.params.color = 'Фиолетовый'
                            if (oneParamArr[1] === 'Синий'
                                || oneParamArr[1] === 'Тёмно-Синий'
                                || oneParamArr[1] === 'Тёмно-синий'
                                || oneParamArr[1] === 'Голубой') item.params.color = 'Синий'
                            if (oneParamArr[1] === 'Зелёный'
                                || oneParamArr[1] === 'Зеленый'
                                || oneParamArr[1] === 'зелёный'
                                || oneParamArr[1] === 'зеленый') item.params.color = 'Зелёный'
                            if (oneParamArr[1] === 'Коричневый'
                                || oneParamArr[1] === 'коричневый') item.params.color = 'Коричневый'
                            else item.params.color = oneParamArr[1]
                        }
                        if (oneParamArr[0] === 'Размер') {
                            if (item.params.size === undefined) {
                                item.params.size = []
                                item.params.size.push(oneParamArr[1].replace(' ', ''))
                            } else if (!item.params.size.includes(oneParamArr[1])) item.params.size.push(oneParamArr[1].replace(' ', ''))
                        }
                        if (oneParamArr[0] === 'Возраст') item.params.age = oneParamArr[1] === 'Для малышей' ? 'Детский' : oneParamArr[1];

                        item.params.gender = oneParamArr[0] === 'Пол' ? oneParamArr[1] : 'unisex'
                        delete item.param
                    })
                }
                if (item.categoryId === 'Одежда для девочек') {
                    item.category = 'Одежда'
                    item.params.gender = 'Женский'
                    item.params.age = 'Детский'
                    delete item.categoryId
                }
                if (item.categoryId === 'Обувь для девочек') {
                    item.category = 'Одежда'
                    item.params.gender = 'Женский'
                    item.params.age = 'Детский'
                    delete item.categoryId
                }
                if (item.categoryId === 'Одежда для мальчиков') {
                    item.category = 'Одежда'
                    item.params.gender = 'Мужской'
                    item.params.age = 'Детский'
                    delete item.categoryId
                }
                if (item.categoryId === 'Обувь для мальчиков') {
                    item.category = 'Обувь'
                    item.params.gender = 'Мужской'
                    item.params.age = 'Детский'
                    delete item.categoryId
                }
                if (item.categoryId === 'Рубашки, Поло') item.categoryId = 'Рубашки-поло'
                if (item.categoryId === 'Ремни, шарфы') delete item.categoryId
                if (item.categoryId === 'Топы, майки, футболки') delete item.categoryId
                if (item.category === 'Спорт') delete item.category
                if (item.categoryId === 'Сумки, кошельки, косметички') item.categoryId = 'Сумки, Рюкзаки и Кошельки'
                if (item.categoryId === 'Женщины/Женская одежда/Верхняя одежда/Пальто, полупальто/Демисезонные пальто') item.categoryId = 'Пальто демисезонные'
                if (item.category === 'Женская обувь') item.category = 'Обувь'
                if (item.categoryId === 'Очки') item.categoryId = 'Солнцезащитные очки'

                delete item.country_of_origin
                delete item.available
                delete item.currencyId
                delete item.modified_time
                delete item.type
                delete item.vendorCode
                delete item.vendor
            }

            const resultArr = itemArr.concat()

            for (let i = 0; i <= resultArr.length; i++) {

                const sourceObj = resultArr[i]

                for (let i2 = 0; i2 <= itemArr.length; i2++) {

                    if (sourceObj                                                                   // Объект существует
                        && itemArr[i2]                                                             // Оригинал тоже
                        && sourceObj.name                                                         // У него есть имя
                        && itemArr[i2].name                                                      // И у оригинала тоже
                        && !!sourceObj.params                                                   // У него есть параметры
                        && !!itemArr[i2].params                                                // И у оригинала тоже
                        && !!sourceObj.params.size                                            // Есть размер
                        && !!itemArr[i2].params.size) {                                      // И у оригинала тоже

                        if (sourceObj.name === itemArr[i2].name                                      // Если имена равны
                            && sourceObj.description === itemArr[i2].description                    // И описания
                            && sourceObj.params.color === itemArr[i2].params.color) {              // И цвета

                            const sizeArr = sourceObj.params.size;                                       // Для удобства

                            if (+sizeArr[0] !== +itemArr[i2].params.size[0]) {                 // Проверяю, что нет размера

                                sizeArr.push(itemArr[i2].params.size[0])                     // Добавляю размер в массив

                                resultArr.splice(resultArr.indexOf(itemArr[i2]), 1)                   // удаляю из массива товар с добавленным размером

                                sizeArr.sort((a, b) => a - b);           // Расставляю в порядке возрастания
                            }
                        }
                    }
                }
            }

            resolve(resultArr)

            console.log('Parse ok');

        } catch (e) {
            console.log(e);
        }
    })
}
