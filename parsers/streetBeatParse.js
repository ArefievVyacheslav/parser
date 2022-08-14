module.exports = function streetBeatParse(itemArr) {

    return new Promise(resolve => {

        try {
            // 2.2. Прохожусь по каждому объекту товара
            itemArr.forEach(item => {

<<<<<<< HEAD
                if (item.picture === '') itemArr.splice(itemArr.indexOf(item), 1)

=======
                if (item.picture === '') itemArr.splice(1, itemArr.indexOf(item))
>>>>>>> c913b42eeeb06c133166942206a9fbf933bc1a59
                // 2.3. Создаю доп.свойство для объединения параметров цвета, размера, возраста
                item.params = {}

                item.name = `${item.typePrefix} ${item.vendor} ${item.name}`

                if (item.description === '') delete item.description

                // 2.4. Получаю категорию
                if (item.categoryId.includes('/')) {
                    item.categoryId = item.categoryId.split('/');
                    item.categoryId = item.categoryId[item.categoryId.length - 1]
                }
                // 2.5. Прохожусь по каждому параметру
                if (!!item.param && item.param.includes('|')) {

                    const paramsArr = item.param.split('|')

                    paramsArr.map(option => {
                        const oneParamArr = option.split(':')

                        if (oneParamArr[0] === 'Цвет') item.params.color = oneParamArr[1]
                        if (oneParamArr[0] === 'Возраст') item.params.age = oneParamArr[1];
                        if (oneParamArr[0] === 'Сезон') item.params.season = oneParamArr[1];
                        if (oneParamArr[0] === 'остаток') item.params.remains = oneParamArr[1];
                        if (oneParamArr[0] === 'Материал верха') item.params.upMaterial = oneParamArr[1];
                        if (oneParamArr[0] === 'Материал подкладки') item.params.linings = oneParamArr[1];
                        if (oneParamArr[0] === 'Материал подошвы') item.params.soles = oneParamArr[1];
                        if (oneParamArr[0] === 'Назначение') item.params.appointment = oneParamArr[1];

                        item.params.gender = oneParamArr[0] === 'Пол' ? oneParamArr[1] : 'unisex'

                        if (oneParamArr[0] === 'Размер' && oneParamArr[1].includes('-')) {
                            const paramArr = oneParamArr[1].split('-');
                            const resultParamArr = [];
                            for (let i = +paramArr[0]; i <= +paramArr[1]; i++) {
                                if (paramArr[0] < i < paramArr[1]) resultParamArr.push(+i);
                            }
                            item.params.size = resultParamArr
                        }

                        if (oneParamArr[0] === 'Размер') {
                            if (item.params.size === undefined) {
                                item.params.size = []
                                item.params.size.push(oneParamArr[1])
                            }
                        }

                        delete item.param
                        delete item.typePrefix
                        delete item.vendor

                        // Удаляю ненужные свойства
                        delete item.type
                        if (item.available) delete item.available
                        if (item.currencyId) delete item.currencyId
                        if (item.modified_time) delete item.modified_time
                        if (item.uri) delete item.uri
                        if (item.vendorCode) delete item.vendorCode
                        if (item.model) delete item.model
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

            console.log(itemArr);

            resolve(itemArr)

        } catch (e) {
            console.log(e);
        }
    })
}
