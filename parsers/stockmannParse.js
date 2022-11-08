module.exports = function stockmannParse(itemArr) {

    return new Promise(async resolve => {

        try {

            const itemArrTest = itemArr.filter(itemObj => !itemObj.category.includes('Для дома'))

            // 2.2. Прохожусь по каждому объекту товара
            itemArrTest.forEach(item => {

                item.idd = parseInt(`11111111${Math.floor(100000 + Math.random() * 900000)}`)
                item.picture = item.image
                item.shop = 'stockmann'
                item.link = 'https://go.redav.online/c49aa853d4fcc770'
                item.shopLink = '/shop/stockmann'
                item.sale = +item.discount_percent
                item.price = +item.price
                item.oldprice = +item.old_price
                item.benefit = +item.discount_sum
                item.instalments = true
                item.delivery = 'Россия'
                item.deliveryPrice = 199
                if (item.brand) item.brand = item.brand.toUpperCase().replace('&APOS;', ' ')

                // 2.3. Получаю категорию
                if (item.category.includes(' > ')) {
                    item.categoryArr = item.category.split(' > ');
                    const ending = item.categoryArr[item.categoryArr.length - 1]
                    item.categoryId = item.categoryArr[item.categoryArr.length - 1]
                    if (item.categoryArr[1] === 'Одежда' || item.categoryArr[1] === 'Обувь' || item.categoryArr[1] === 'Аксессуары') {
                        item.category = item.categoryArr[1]
                        if (item.categoryArr.length === 5) item.categoryId = item.categoryArr[item.categoryArr.length - 2]
                    }
                    if (item.categoryArr[1] === 'Девочкам' || item.categoryArr[1] === 'Мальчикам' || item.categoryArr[1] === 'Новорожденным') item.categoryId = item.categoryArr[item.categoryArr.length - 1]
                    if (ending === 'Демисезонные' || ending === 'С принтом' || ending === 'Повседневные' || ending === 'С круглым вырезом' || ending === 'Слаксы' || ending === 'На пуговицах' || ending === 'Кожаные' || ending === 'Легкие' || ending === 'На молнии' || ending === 'В стиле casual' || ending === 'Коктейльные' || ending === 'Карго' || ending === 'Без рукавов' || ending === 'С капюшоном' || ending === 'С длинным рукавом' || ending === 'Широкие' || ending === 'Узкие' || ending === 'С шортами' || ending === 'С брюками' || ending === 'На каблуке' || ending === 'С открытыми плечами' || ending === 'С коротким рукавом' || ending === 'Удлиненные' || ending === 'Со стандартной посадкой' || ending === 'Оверсайз' || ending === 'Без рисунка' || ending === 'Зимние' || ending === 'На танкетке' || ending === 'С ремешками' || ending === 'Хлопковые' || ending === 'На шнурках' || ending === 'Под джинсы' || ending === 'Однотонные' || ending === 'Бини' || ending === 'Утепленные' || ending === 'Без каблука' || ending === 'Укороченные' || ending === 'Драповые' || ending === 'С высокой посадкой' || ending === 'Однотонные' || ending === 'Льняные' || ending === 'Прямые' || ending === 'Чиносы' || ending === 'Нарядные' || ending === 'Замшевые' || ending === 'Длинные'
                        || ending === 'Джинсовые' || ending === 'С V-образным вырезом' || ending === 'Стеганые') {
                        item.categoryId = item.categoryArr[item.categoryArr.length - 2] + ' ' + ending.toLowerCase()
                    }
                    if (ending === 'Бейсболки' || ending === 'Бейсболки' || ending === 'Панамы и кепки') item.categoryId = 'Кепки'
                    if (item.categoryArr[1] === 'Девочкам' || item.categoryArr[1] === 'Мальчикам' || item.categoryArr[1] === 'Новорожденным') delete item.category
                    delete item.categoryArr
                }
                // 2.4. Создаю доп.свойство для объединения параметров цвета, размера, возраста
                item.param = item.params
                delete item.params

                item.params = {}
                item.params.rating = (Math.random() * (5 - 4.7) + 4.7).toFixed(4)
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
                        if (oneParamArr[0] === 'Возраст') {
                            if (oneParamArr[1] === 'дети' || oneParamArr[1] === 'маленькие дети' || oneParamArr[1] === 'новорожденные') item.params.age = 'Детский'
                            if (oneParamArr[1] === 'взрослые') item.params.age = 'Взрослый'
                        }
                        if (oneParamArr[0] === 'Пол') {
                            if (oneParamArr[1] === 'унисекс') item.params.gender = 'unisex'
                            if (oneParamArr[1] === 'мужской') item.params.gender = 'Мужской'
                            if (oneParamArr[1] === 'женский') item.params.gender = 'Женский'
                            if (oneParamArr[1] === 'девочки') {
                                item.params.gender = 'Женский'
                                item.params.age = 'Детский'
                            }
                            if (oneParamArr[1] === 'мальчики') {
                                item.params.gender = 'Мужской'
                                item.params.age = 'Детский'
                            }
                        }
                        delete item.param
                    })
                }
                if (item.params.gender === 'Мужской' && item.category === 'Обувь') item.params.size = ['38', '39', '40', '41', '42', '43', '44', '45']
                if (item.params.gender === 'Женский' && item.category === 'Обувь') item.params.size = ['35', '36', '37', '38', '39', '40', '41', '42']
                if (item.params.age === 'Детский' && item.category === 'Обувь') item.params.size = ['Требует уточнения']
                if (item.category === 'Одежда') item.params.size = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
                if (item.category === 'Аксессуары') item.params.size = ['ONE SIZE']
                if (item.category && item.category.includes('Детям')) {
                    const catArr = item.category.split(' > ')
                    item.categoryid = catArr[4]
                    item.category = 'Одежда'
                }
                delete item.discount_percent
                delete item.discount_sum
                delete item.available
                delete item.gtin
                delete item.mpn
                delete item.image
                delete item.currency
                delete item.credit_price
                delete item.model
                if (!item.description) delete item.description
            })

            const resultArr = itemArrTest.concat()

            for (let i = 0; i <= resultArr.length; i++) {

                const sourceObj = resultArr[i]

                for (let i2 = 0; i2 <= itemArrTest.length; i2++) {

                    if (sourceObj                                                                   // Объект существует
                        && itemArrTest[i2]                                                             // Оригинал тоже
                        && sourceObj.name                                                         // У него есть имя
                        && itemArrTest[i2].name                                                      // И у оригинала тоже
                        && !!sourceObj.params                                                   // У него есть параметры
                        && !!itemArrTest[i2].params                                                // И у оригинала тоже
                        && !!sourceObj.params.size                                            // Есть размер
                        && !!itemArrTest[i2].params.size) {                                      // И у оригинала тоже

                        if (sourceObj.name === itemArrTest[i2].name                                      // Если имена равны
                            && sourceObj.description === itemArrTest[i2].description                    // И описания
                            && sourceObj.params.color === itemArrTest[i2].params.color) {              // И цвета

                            const sizeArr = sourceObj.params.size;                                       // Для удобства

                            if (+sizeArr[0] !== +itemArrTest[i2].params.size[0]) {                 // Проверяю, что нет размера

                                sizeArr.push(itemArrTest[i2].params.size[0])                     // Добавляю размер в массив

                                resultArr.splice(resultArr.indexOf(itemArrTest[i2]), 1)                   // удаляю из массива товар с добавленным размером

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
