module.exports = function amerSportParse(itemArr) {

    return new Promise(resolve => {

        try {
            // 2.2. Прохожусь по каждому объекту товара
            itemArr.forEach(item => {

                item.shop = 'amerSport'

                if (item.categoryId === 'Amersport' || item.categoryId === 'Converse') item.categoryId = 'Обувь';
                // 2.3. Создаю доп.свойство для объединения параметров цвета, размера, возраста
                item.params = {}
                // 2.4. Получаю категорию
                if (item.categoryId.includes('/')) {
                    item.categoryId = item.categoryId.split('/');
                    item.categoryId = item.categoryId[item.categoryId.length - 1]

                    if (item.categoryId === 'Высокие') item.categoryId = 'Кеды'
                    if (item.categoryId === 'Верхняя') item.categoryId = 'Одежда'
                }
                // 2.5. Прохожусь по каждому параметру
                if (!!item.param && item.param.includes('|')) {

                    const paramsArr = item.param.split('|')

                    paramsArr.map(option => {
                        const oneParamArr = option.split(':')

                        if (oneParamArr[0] === 'Цвет') item.params.color = oneParamArr[1]
                        if (oneParamArr[0] === 'Размер') {
                            if (item.params.size === undefined) {
                                item.params.size = []
                                item.params.size.push(oneParamArr[1])
                            }
                        }
                        if (oneParamArr[0] === 'Возраст') item.params.age = oneParamArr[1];

                        item.params.gender = oneParamArr[0] === 'Пол' ? oneParamArr[1] : 'unisex'
                        delete item.param

                        // Удаляю ненужные свойства
                        // if (!item.type) delete item.type
                        // if (!item.available) delete item.available
                        // if (item.currencyId) delete item.currencyId
                        // if (item.modified_time) delete item.modified_time
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

                            if (sizeArr[0] !== itemArr[i2].params.size[0]) {                // Проверяю, что нет размера

                                sizeArr.push(itemArr[i2].params.size[0])                     // Добавляю размер в массив

                                sizeArr.sort((a, b) => a - b);                       // Расставляю в порядке возрастания
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
