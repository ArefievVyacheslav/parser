module.exports = function brandshopParse(itemArr) {

    return new Promise(async resolve => {

        try {
            // const emptyPicturesArr = []

            // 2.2. Прохожусь по каждому объекту товара
            for (const item of itemArr) {

                item.idd = parseInt(`11111111${Math.floor(100000 + Math.random() * 900000)}`)
                item.picture = item.image
                item.shop = 'brandshop'
                item.link = 'https://go.redav.online/32d7e3ac52dcabb0'
                item.shopLink = '/shop/brandshop'
                item.sale = +item.discount_percent
                item.price = +item.price
                item.oldprice = +item.old_price
                item.benefit = +item.discount_sum
                item.delivery = 'Россия'
                item.deliveryPrice = 350
                item.brand = item.brand.toUpperCase()

                // 2.3. Получаю категорию
                if (item.category.includes(' > ')) {
                    item.categoryArr = item.category.split(' > ');
                    if (item.categoryArr[0] === 'Аксессуары') {
                        item.category = 'Аксессуары'
                        item.categoryId = item.categoryArr[item.categoryArr.length - 1]
                        if (item.categoryId === 'Товары для скейтборда') continue
                        if (item.categoryId === 'Рюкзаки и суки') item.categoryId = 'Сумки, Рюкзаки и Кошельки'
                        if (item.categoryId === 'Перчатки') item.categoryId = 'Перчатки и рукава'
                        if (item.categoryId === 'Подвески') item.categoryId = 'Подвески, ожерелья, бусы'
                        if (item.categoryId === 'Рюкзаки и сумки') item.categoryId = 'Сумки, Рюкзаки и Кошельки'
                    } else {
                        item.category = item.categoryArr[1].split(' ')
                        item.category = item.category[item.category.length - 1].charAt(0).toUpperCase() + item.category[item.category.length - 1].slice(1)
                        item.categoryId = item.categoryArr[item.categoryArr.length - 1].split(' ')
                        item.categoryId = item.categoryId[item.categoryId.length - 1].charAt(0).toUpperCase() + item.categoryId[item.categoryId.length - 1].slice(1)
                    }
                    delete item.categoryArr
                }
                item.name = item.categoryId + ' ' + item.name
                // 2.4. Создаю доп.свойство для объединения параметров цвета, размера, возраста
                item.param = item.params
                delete item.params

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
                                || oneParamArr[1] === 'черный'
                                || oneParamArr[1] === 'чёрный') {
                                item.params.color = 'Чёрный'
                                include = true
                            }
                            if (oneParamArr[1] === 'Белый'
                                || oneParamArr[1] === 'Серый'
                                || oneParamArr[1] === 'серый'
                                || oneParamArr[1] === 'Бежевый'
                                || oneParamArr[1] === 'бежевый'
                                || oneParamArr[1] === 'Серебристый'
                                || oneParamArr[1] === 'серебряный'
                                || oneParamArr[1] === 'белый'
                            ) {
                                item.params.color = 'Белый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Красный'
                                || oneParamArr[1] === 'Бордовый'
                                || oneParamArr[1] === 'красный') {
                                item.params.color = 'Красный'
                                include = true
                            }
                            if (oneParamArr[1] === 'Оранжевый' || oneParamArr[1] === 'оранжевый') {
                                item.params.color = 'Оранжевый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Желтый' || oneParamArr[1] === 'желтый' || oneParamArr[1] === 'жёлтый') {
                                item.params.color = 'Желтый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Розовый' || oneParamArr[1] === 'розовый') {
                                item.params.color = 'Розовый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Фиолетовый' || oneParamArr[1] === 'фиолетовый') {
                                item.params.color = 'Фиолетовый'
                                include = true
                            }
                            if (oneParamArr[1] === 'Синий'
                                || oneParamArr[1] === 'Тёмно-Синий'
                                || oneParamArr[1] === 'Тёмно-синий'
                                || oneParamArr[1] === 'Голубой'
                                || oneParamArr[1] === 'голубой'
                                || oneParamArr[1] === 'синий') {
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
                            if (oneParamArr[1] === 'Коричневый' || oneParamArr[1] === 'коричневый') {
                                item.params.color = 'Коричневый'
                                include = true
                            }
                            if (!include) item.params.color = oneParamArr[1]
                        }
                        if (oneParamArr[0] === 'Размер') {
                            if (item.params.size === undefined) {
                                item.params.size = []
                                let size = oneParamArr[1] === 'UNI RU' ? 'ONE SIZE' : oneParamArr[1].replace(' INT', '')
                                item.params.size.push(size)
                            }
                        }
                        if (oneParamArr[0] === 'Возраст') item.params.age = oneParamArr[1] === 'Для малышей' ? 'Детский' : oneParamArr[1];

                        item.params.gender = oneParamArr[0] === 'Пол' ? oneParamArr[1] : 'unisex'
                        delete item.param
                    })
                }
                delete item.discount_percent
                delete item.discount_sum
                delete item.available
                delete item.gtin
                delete item.mpn
                delete item.image
                delete item.currency
                delete item.credit_price
                if (!item.description) delete item.description
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
