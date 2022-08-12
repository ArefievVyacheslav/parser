module.exports = function amerSportParse(itemArr) {

    return new Promise(resolve => {

        try {
            // 2.2. Прохожусь по каждому объекту товара
            itemArr.forEach(item => {

                item.picture = item.picture.replace('https://amersport.ru', 'https://nonconform.ru')
                item.shop = 'amerSport'
                item.link = 'https://ad.admitad.com/g/bc2ebmobf9e7566f8b4d043bf79eb7/?ulp=https%3A%2F%2Famersport.ru%2F'
                item.shopLink = '/shop/amerSport'
                item.sale = +((100 - (item.price / (item.oldprice / 100))).toFixed())
                item.price = +item.price
                item.oldprice = +item.oldprice
                item.benefit = item.oldprice - item.price
                item.delivery = 'Россия'
                item.deliveryPrice = 99
                if (item.vendor) item.brand = item.vendor
                delete item.vendor

                if (item.categoryId === 'Amersport' || item.categoryId === 'Converse') item.categoryId = 'Обувь';
                // 2.3. Получаю категорию
                if (item.categoryId.includes('/')) {
                    item.categoryId = item.categoryId.split('/');
                    item.categoryId = item.categoryId[item.categoryId.length - 1]

                    if (item.categoryId === 'Высокие' || item.categoryId === 'Низкие') {
                        item.categoryId = 'Кеды'
                        item.category = 'Обувь'
                    }
                    if (item.categoryId === 'Верхняя') {
                        item.category = 'Одежда'
                        delete item.categoryId
                    }
                }
                if (item.categoryId === 'Обувь') {
                    item.category = 'Обувь'
                    delete item.categoryId
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
                                item.params.size.push(oneParamArr[1])
                            }
                        }
                        if (oneParamArr[0] === 'Возраст') item.params.age = oneParamArr[1] === 'Для малышей' ? 'Детский' : oneParamArr[1];

                        item.params.gender = oneParamArr[0] === 'Пол' ? oneParamArr[1] : 'unisex'
                        delete item.param
                    })
                }
            })

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

        } catch (e) {
            console.log(e);
        }
    })
}
