module.exports = function cdekParse(itemArr) {

    return new Promise(async resolve => {

        try {

            const itemArrTest = itemArr.filter(itemObj => {
                try {
                    if (!!itemObj.category
                        & itemObj.category.includes('Одежда')
                        || itemObj.category.includes('Обувь')
                        || itemObj.category.includes('Аксессуары')) return itemObj
                } catch (e) {
                    console.log(e);
                    console.log(itemObj.category);
                }
            })

            // 2.2. Прохожусь по каждому объекту товара
            itemArrTest.forEach(item => {

                item.idd = parseInt(`11111111${Math.floor(100000 + Math.random() * 900000)}`)
                item.picture = item.image
                item.shop = 'cdek'
                item.link = 'https://cdek.shopping/'
                item.shopLink = '/shop/cdek'
                item.sale = 15
                item.price = +item.price
                item.oldprice = (item.price * 1.15).toFixed()
                item.oldprice = item.oldprice.split('')
                item.oldprice[item.oldprice.length - 1] = 0
                item.oldprice = +item.oldprice.join('')
                item.benefit = item.oldprice - item.price
                item.delivery = 'Зарубеж'
                if (item.brand) item.brand = item.brand.toUpperCase()

                delete item.params
                item.params = {}
                // 2.3. Получаю категорию
                if (item.category.includes(' > ')) {
                    item.categoryArr = item.category.split(' > ');
                    const ending = item.categoryArr[item.categoryArr.length - 1]
                    item.categoryId = item.categoryArr[item.categoryArr.length - 1]

                    if (item.categoryArr[0] === 'Одежда' || item.categoryArr[0] === 'Обувь' || item.categoryArr[0] === 'Аксессуары') {
                        item.category = item.categoryArr[0]
                        item.categoryId = ending

                        if (item.categoryId === 'Бейсболки') item.categoryId = 'Кепки'
                        if (item.categoryId === 'Рюкзаки' && item.categoryId === 'Кошельки') item.categoryId = 'Сумки, Рюкзаки и Кошельки'

                        if (item.categoryArr.length >= 3) {
                            if (item.categoryArr[1].includes('Муж')) item.params.gender = 'Мужской'
                            if (item.categoryArr[1].includes('Жен')) item.params.gender = 'Женский'
                        }
                    }
                    delete item.categoryArr
                }

                item.params.rating = (Math.random() * (5 - 4.7) + 4.7).toFixed(2)
                item.params.purchases = (Math.random() * (4 - 2) + 2).toFixed()

                if (item.params.gender === 'Мужской' && item.category === 'Обувь') item.params.size = ['38', '39', '40', '41', '42', '43', '44', '45']
                if (item.params.gender === 'Женский' && item.category === 'Обувь') item.params.size = ['35', '36', '37', '38', '39', '40', '41', '42']
                if (item.category === 'Одежда') item.params.size = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
                if (item.category === 'Аксессуары') item.params.size = ['ONE SIZE']

                let colorArr;

                if (item.name.includes(',')) {
                    colorArr = item.name.split(',')
                    let color = colorArr[colorArr.length - 1]
                    if (color.includes('/')) {
                        color = color.split('/')
                        item.params.color = color[1]
                    } else if (color.includes('-')) {
                        color = color.split('-')
                        item.params.color = color[1]
                    } else item.params.color = color
                    item.params.color = item.params.color.replace(' ', '')
                }

                delete item.discount_percent
                delete item.discount_sum
                delete item.available
                delete item.gtin
                delete item.mpn
                delete item.image
                delete item.currency
                delete item.old_price
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
