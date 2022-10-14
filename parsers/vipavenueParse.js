module.exports = function vipavenueParse(itemArr) {

    return new Promise(async resolve => {

        try {
            // const emptyPicturesArr = []

            // 2.2. Прохожусь по каждому объекту товара
            for (const item of itemArr) {

                item.id = parseInt(`${Math.floor(100000 + Math.random() * 900000)}`)
                item.shop = 'vipavenue'
                item.link = 'https://ad.admitad.com/g/wi6mvea2sq41237c4d2c4c1f95a56e/?ulp=https%3A%2F%2Fvipavenue.ru%2F'
                item.shopLink = '/shop/vipavenue'
                item.sale = +((100 - (item.price / (item.oldprice / 100))).toFixed())
                item.price = +item.price
                item.oldprice = +item.oldprice
                item.benefit = item.oldprice - item.price
                item.delivery = 'Россия'
                item.deliveryPrice = 500
                if (item.vendor) item.brand = item.vendor.replace('&amp;', '&')
                delete item.vendor

                // 2.3. Получаю категорию
                if (item.categoryId === 'Носки') item.category = 'Аксессуары'
                if (item.categoryId.includes('/')) {
                    item.categoryArr = item.categoryId.split('/');
                    item.category = item.categoryArr[0]
                    if (item.category === 'Одежда для дома') item.category = 'Одежда'
                    if (item.category === 'Сумки') item.category = 'Аксессуары'
                    item.categoryId = item.categoryArr[item.categoryArr.length - 1]
                    if (item.categoryId === 'Клеш') item.category = 'Клёш'
                    if (item.categoryId === 'Коктейльные') item.category = 'Платья коктейльные'
                    if (item.categoryId === 'Легинсы') item.category = 'Леггинсы'
                    if (item.categoryId === 'Кольца') item.categoryId = 'Кольца и перстни'
                    if (item.categoryId === 'Часы') item.categoryId = 'Наручные часы'
                    if (item.categoryId === 'Джинсовые куртки') item.categoryId = 'Куртки джинсовые'
                    if (item.categoryId === 'Спортивные брюки') item.categoryId = 'Брюки спортивные'
                    if (item.categoryId === 'Кожаные куртки') item.categoryId = 'Куртки кожаные'
                    if (item.categoryId === 'Спортивные леггинсы') item.categoryId = 'Леггинсы спортивные'
                    if (item.categoryId === 'Спортивные топы') item.categoryId = 'Топы спортивные'
                    if (item.categoryId === 'Спортивные футболки') item.categoryId = 'Футболки спортивные'
                    if (item.categoryId === 'Спортивные шорты') item.categoryId = 'Шорты спортивные'
                    if (item.categoryId === 'Кошельки и портмоне' || item.categoryId === 'Рюкзаки' || item.categoryId === 'Сумки') item.categoryId = 'Сумки, Рюкзаки и Кошельки'
                    if (item.categoryId === 'Колготки и чулки') item.category = 'Аксессуары'
                    if (item.categoryId === 'Бейсболки') item.categoryId = 'Кепки'
                    if (item.categoryId === 'Воротники') item.categoryId = 'Воротники и манжеты'
                    if (item.categoryId === 'Перчатки') item.categoryId = 'Перчатки и рукава'
                    if (item.categoryId === 'Подвески') item.categoryId = 'Подвески, ожерелья, бусы'
                    if (item.categoryId === 'Прямые'
                        || item.categoryId === 'Скинни'
                        || item.categoryId === 'Зауженные'
                        || item.categoryId === 'Классические'
                        || item.categoryId === 'Повседневные'
                        || item.categoryId === 'Вечерние'
                        || item.categoryId === 'Бойфренды'
                        || item.categoryId === 'Широкие'
                        || item.categoryId === 'Укороченные'
                        || item.categoryId === 'Высокая посадка'
                        || item.categoryId === 'Макси'
                        || item.categoryId === 'Миди'
                        || item.categoryId === 'Свободный крой') item.categoryId = item.categoryArr[item.categoryArr.length - 2] + ' ' + item.categoryId.toLowerCase()
                }
                item.name = `${item.categoryId} ${item.brand}`.replace('&amp;', '&')
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
                                let size = oneParamArr[1] === 'Один размер' ? 'ONE SIZE' : oneParamArr[1]
                                item.params.size.push(size)
                            } else if (!item.params.size.includes(oneParamArr[1])) item.params.size.push(oneParamArr[1] === 'Один размер' ? 'ONE SIZE' : oneParamArr[1])
                        }
                        if (oneParamArr[0] === 'Возраст') item.params.age = oneParamArr[1] === 'Для малышей' ? 'Детский' : oneParamArr[1];

                        if (oneParamArr[0] === 'Пол') item.params.gender = oneParamArr[1]
                        if (item.params.gender === 'Для мужчин') item.params.gender = 'Мужской'
                        if (item.params.gender === 'Для женщин') item.params.gender = 'Женский'
                        delete item.param
                    })
                }
                if (item.categoryId === 'Обувь для девочек') {
                    item.category = 'Обувь'
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
                delete item.available
                delete item.currencyId
                delete item.modified_time
                delete item.model
                delete item.type
            }

            const resultArr = itemArr.concat()

            for (let i = 0; i <= resultArr.length; i++) {

                const sourceObj = resultArr[i]

                for (let i2 = 0; i2 <= itemArr.length; i2++) {

                    if (sourceObj                                                                   // Объект существует
                        && itemArr[i2]                                                             // Оригинал тоже
                        && !!sourceObj.params                                                   // У него есть параметры
                        && !!itemArr[i2].params                                                // И у оригинала тоже
                        && !!sourceObj.params.size                                            // Есть размер
                        && !!itemArr[i2].params.size) {                                      // И у оригинала тоже

                        if (sourceObj.description === itemArr[i2].description                    // И описания
                            && sourceObj.params.color === itemArr[i2].params.color) {              // И цвета

                            const sizeArr = sourceObj.params.size                                       // Для удобства

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
