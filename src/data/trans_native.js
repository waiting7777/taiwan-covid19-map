const confirm = require('./confirm.json')
const dfns = require('date-fns')
const fs = require('fs')

const confirm_native = confirm.filter(v => {
    return dfns.compareAsc(new Date(v['個案研判日']), new Date('2022-01-01')) === 1 && v["是否為境外移入"] === "否"
})

fs.writeFile('confirm_native.json', JSON.stringify(confirm_native, {}, 4), () => {
    console.log('done')
})