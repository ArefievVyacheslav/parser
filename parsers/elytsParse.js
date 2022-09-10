module.exports = function elytsParse(itemArr) {

    return new Promise(async resolve => {

        try {
            // const emptyPicturesArr = []

            // 2.2. Прохожусь по каждому объекту товара
            for (const item of itemArr) {

                item.shop = 'elyts'
                item.link = 'https://ad.admitad.com/g/94i5ql5fv141237c4d2c0440437a08/?ulp=https%3A%2F%2Felyts.ru%2F'
                item.shopLink = '/shop/elyts'
                item.sale = +((100 - (item.price / (item.oldprice / 100))).toFixed())
                item.price = +item.price
                item.oldprice = +item.oldprice
                item.benefit = item.oldprice - item.price
                item.delivery = 'Россия'
                item.deliveryPrice = 350
                if (item.vendor) item.brand = item.vendor
                delete item.vendor

                if (item.categoryId && item.categoryId.includes('Платья и сарафаны/Casual')) item.categoryId = 'Платья и сарафаны'
                if (item.categoryId && item.categoryId.includes('Брюки/Casual')) item.categoryId = 'Брюки'
                if (item.categoryId && item.categoryId.includes('Рубашки/Casual')) item.categoryId = 'Рубашки'
                // 2.3. Получаю категорию
                if (item.categoryId && item.categoryId.includes('/')) {
                    item.categoryId = item.categoryId.split('/')
                    item.categoryId[1] === 'Sale' ? item.category = item.categoryId[2] : item.category = item.categoryId[1]
                    item.categoryId = item.categoryId[item.categoryId.length - 1]
                    if (item.categoryId === 'Сумки') item.categoryId = 'Аксессуары'
                    if (item.categoryId === 'Прямые') item.categoryId = 'Джинсы прямые'
                    if (item.categoryId === 'Зауженные') item.categoryId = 'Джинсы зауженные'
                    if (item.categoryId === 'Классические') item.categoryId = 'Брюки классические'
                    if (item.categoryId === 'Вечерние платья') item.categoryId = 'Платья вечерние'
                    if (item.categoryId === 'Джинсовые жилеты') item.categoryId = 'Жилеты джинсовые'
                    if (item.categoryId === 'Джинсовые куртки') item.categoryId = 'Куртки джинсовые'
                    if (item.categoryId === 'Джинсовые платья') item.categoryId = 'Платья джинсовые'
                    if (item.categoryId === 'Джинсовые рубашки') item.categoryId = 'Рубашки джинсовые'
                    if (item.categoryId === 'Джинсовые шорты') item.categoryId = 'Шорты джинсовые'
                    if (item.categoryId === 'Джинсовые юбки') item.categoryId = 'Юбки джинсовые'
                    if (item.categoryId === 'Классика') item.categoryId = 'Рубашки классические'
                    if (item.categoryId === 'Приталенные') item.categoryId = 'Рубашки приталенные'
                    if (item.categoryId === 'Удлиненные') item.categoryId = 'Рубашки удлиненные'
                    if (item.categoryId === 'Плиссированные') item.categoryId = 'Юбки плиссированные'
                    if (item.categoryId === 'Поло') item.categoryId = 'Футболки Поло'
                    if (item.categoryId === 'Футболки и поло') item.categoryId = 'Футболки Поло'
                    if (item.categoryId === 'Прямые') item.categoryId = 'Джинсы прямые'
                    if (item.categoryId === 'Укороченные') item.categoryId = 'Джинсы укороченные'
                    if (item.categoryId === 'Широкие') item.categoryId = 'Джинсы широкие'
                    if (item.categoryId === 'Портмоне и кошельки') item.categoryId = 'Сумки, Рюкзаки и Кошельки'
                    if (item.categoryId === 'Трикотажные жилеты') item.categoryId = 'Жилеты трикотажные'
                    if (item.categoryId === 'Спортивные брюки') item.categoryId = 'Брюки спортивные'
                    if (item.categoryId === 'Спортивные костюмы') item.categoryId = 'Костюмы спортивные'
                    if (item.categoryId === 'Спортивные лосины') item.categoryId = 'Лосины спортивные'
                    if (item.categoryId === 'Широкие джинсы') item.categoryId = 'Джинсы широкие'
                    if (item.categoryId === 'Стёганые жилеты') item.categoryId = 'Жилеты стёганые'
                    if (item.categoryId === 'Кожаные куртки') item.categoryId = 'Куртки кожаные'
                    if (item.categoryId === 'Пляжные платья') item.categoryId = 'Платья пляжные'
                    if (item.categoryId === 'Коктейльные платья') item.categoryId = 'Платья коктейльные'
                    if (item.categoryId === 'Летние платья') item.categoryId = 'Платья летние'
                    if (item.categoryId === 'Меховые жилеты') item.categoryId = 'Жилеты меховые'
                    if (item.categoryId === 'Меховые куртки') item.categoryId = 'Куртки меховые'
                    if (item.categoryId === 'Офисные платья') item.categoryId = 'Платья офисные'
                    if (item.categoryId === 'Демисезонные куртки') item.categoryId = 'Куртки демисезонные'
                    if (item.categoryId === 'Классические жилеты') item.categoryId = 'Жилеты классические'
                    if (item.categoryId === 'Классические костюмы') item.categoryId = 'Костюмы классические'
                    if (item.categoryId === 'Зимние куртки') item.categoryId = 'Куртки зимние'
                    if (item.categoryId === 'Блузы' || item.categoryId === 'Рубашки') item.categoryId = 'Блузы и рубашки'
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
                            let include = false
                            if (oneParamArr[1] === 'Чёрный'
                                || oneParamArr[1] === 'Тёмно-Серый'
                                || oneParamArr[1] === 'черный') {
                                item.params.color = 'Чёрный'
                                include = true
                            }
                            if (oneParamArr[1] === 'Белый'
                                || oneParamArr[1] === 'Серый'
                                || oneParamArr[1] === 'Бежевый'
                                || oneParamArr[1] === 'Серебристый') {
                                item.params.color = 'Белый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Красный'
                                || oneParamArr[1] === 'Бордовый') {
                                item.params.color = 'Красный'
                                include = true
                            }
                            if (oneParamArr[1] === 'Оранжевый') {
                                item.params.color = 'Оранжевый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Желтый') {
                                item.params.color = 'Желтый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Розовый') {
                                item.params.color = 'Розовый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Фиолетовый') {
                                item.params.color = 'Фиолетовый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Синий'
                                || oneParamArr[1] === 'Тёмно-Синий'
                                || oneParamArr[1] === 'Тёмно-синий'
                                || oneParamArr[1] === 'Голубой') {
                                item.params.color = 'Синий'
                                include = true
                            }
                            if (oneParamArr[1] === 'Зелёный'
                                || oneParamArr[1] === 'Зеленый'
                                || oneParamArr[1] === 'зелёный'
                                || oneParamArr[1] === 'зеленый') {
                                item.params.color = 'Зелёный'
                                include = true
                            }
                            if (oneParamArr[1] === 'Коричневый'
                                || oneParamArr[1] === 'коричневый') {
                                item.params.color = 'Коричневый'
                                include = true
                            }
                            if (!include) item.params.color = oneParamArr[1]
                        }
                        if (oneParamArr[0] === 'Размер') {
                            if (item.params.size === undefined) {
                                item.params.size = []
                                item.params.size.push(oneParamArr[1])
                            }
                        }
                        if (oneParamArr[0] === 'Возраст') item.params.age = oneParamArr[1] === 'Для малышей' ? 'Детский' : oneParamArr[1];

                        item.params.gender = oneParamArr[0] === 'Пол' ? oneParamArr[1] : 'unisex'
                        delete item.param
                        delete item.available
                        delete item.currencyId
                        delete item.model
                        delete item.modified_time
                        delete item.sales_notes
                        delete item.type
                        delete item.typePrefix
                    })
                }
                item.name = `${item.name} №${item.vendorCode}`
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
