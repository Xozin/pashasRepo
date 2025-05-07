import excelToJson from 'convert-excel-to-json';
import * as fs from 'fs';

const dataFolder = '../data';

const resulte = {}
const isPRICE = (a)=> ['PRICE'].includes(a);

const isCODE = (a) => ['CODE', 'ITEM'].includes(a);

function findKeys(object) {
    let PriceCode;
    let CodeCode;
    // console.log(object)
    for (const [key, value] of Object.entries(object)) {
        if(isPRICE(value)) {
            PriceCode = key;
        }
        if(isCODE(value)) {
            CodeCode = key;
        }
    }

    return {PriceCode,CodeCode };
}

const files = fs.readdirSync(dataFolder);

files.forEach(file => {
    const result = excelToJson({
        sourceFile: `${dataFolder}/${file}`
    });

    // console.log(result);

    const keys = Object.keys(result);
    keys.forEach(key => {
        const {PriceCode, CodeCode} = findKeys(result[key][0])
        // console.log(result[key], 'result[key]');
        result[key].forEach((item) => {
            resulte[item[CodeCode]] = item[PriceCode]
        })
        // console.log(result[key][PriceCode], 'result[key]');
    })

})
const jsonString = JSON.stringify(resulte, null, 2);

fs.writeFile('data.json', jsonString, (err) => {
    if (err) {
        console.error('Ошибка при сохранении файла:', err);
    } else {
        console.log('Файл успешно сохранён!');
    }
});
console.log(resulte)