const readline = require('readline');
const fs = require('fs')
exports.loadnum = function load(file, line) {
    let text = fs.readFileSync(file, 'utf-8');
    let txt = text.slice().split('\n')
    let res = txt[line - 1]
    if (res.startsWith('b:')) {
        const b = res.substr(2)
        if (b == 0) {
            return false
        } else if (b == 1) {
            return true
        } else {
            throw new Error('The value you entered is invalid. Usage: b:<1 | 0>')
            exit()
        }
    } else if (isNaN(res) == true) {
        throw new Error('Any input other than numbers is invalid.')
        exit()
    } else {
        return res
    }
}
exports.loadstr = function load(file, line) {
    let text = fs.readFileSync(file, 'utf-8');
    let txt = text.slice().split('\n')
    let res = txt[line - 1]
    return res
}
exports.edit = function edit(file, line, value) {
    const rs = fs.createReadStream(file, {
        start: 0,
        autoClose: false
    });
    let text = fs.readFileSync(file, 'utf-8');
    let txt = text.slice().split('\n')
    let res = txt[line]
    const dt = fs.writeFileSync('dt.eldat', '');
    const ws = fs.createWriteStream('dt.eldat');
    const rl = readline.createInterface({ /*読み込みたいストリームの設定*/
        input: rs,
        output: ws
    });
    let count = 0
    rl.on('line', (lineString) => {
        if (count < res.length) {
            if (count == line - 1) {
                ws.write(value + "\n")
            } else {
                ws.write(lineString + '\n');
            }
            count++
        } else if (count == res.length) {
            if (count == line - 1) {
                ws.write(value)
            } else {
                ws.write(lineString);
            }
        }
    });
    rl.on('close', () => {
        fs.readFile("dt.eldat", "utf-8", (err, data) => {
            if (err) throw err;
            fs.copyFileSync('./dt.eldat', file)
            fs.unlink('./dt.eldat', (err) => {
                if (err) throw err;
            })
        });
    });
}
exports.math = function math(file, line, mathvalue) {
    let text = fs.readFileSync(file, 'utf-8');
    let txt = text.slice().split('\n')
    let res = txt[line]
    const rs = fs.createReadStream(file);
    const dt = fs.writeFileSync('dtm.eldat', '');
    const ws = fs.createWriteStream('dtm.eldat');
    const rl = readline.createInterface({
        input: rs,
        output: ws
    });
    let count = 0
    rl.on('line', (lineString) => {
        if (count < res.length) {
            if (count == line - 1) {
                if (mathvalue.startsWith('+')) {
                    const result = parseInt(lineString) + parseInt(mathvalue.replace("+", ""))
                    ws.write(result + '\n')
                    if (isNaN(lineString)) {
                        throw new Error('Any input other than numbers is invalid.')
                    }
                    count++
                } else if (mathvalue.startsWith('-')) {
                    const result = parseInt(lineString) - parseInt(mathvalue.replace("-", ""))
                    ws.write(result + '\n')
                    if (isNaN(lineString)) {
                        throw new Error('Any input other than numbers is invalid.')
                    }
                    count++
                } else if (mathvalue.startsWith('/')) {
                    const result = parseInt(lineString) / parseInt(mathvalue.replace("/", ""))
                    ws.write(result + '\n')
                    if (isNaN(lineString)) {
                        throw new Error('Any input other than numbers is invalid.')
                    }
                    count++
                } else if (mathvalue.startsWith('*')) {
                    const result = parseInt(lineString) * parseInt(mathvalue.replace("*", ""))
                    ws.write(result + '\n')
                    if (isNaN(lineString)) {
                        throw new Error('Any input other than numbers is invalid.')
                    }
                    count++
                }
            } else {
                ws.write(lineString + '\n');
                count++
            }
        } else if (count == res.length) {
            if (count == line - 1) {
                if (mathvalue.startsWith('+')) {
                    const result = parseInt(lineString) + parseInt(mathvalue.replace("+", ""))
                    ws.write(result)
                    if (isNaN(lineString)) {
                        throw new Error('Any input other than numbers is invalid.')
                    }
                    count++
                } else if (mathvalue.startsWith('-')) {
                    const result = parseInt(lineString) - parseInt(mathvalue.replace("-", ""))
                    ws.write(result)
                    if (isNaN(lineString)) {
                        throw new Error('Any input other than numbers is invalid.')
                    }
                    count++
                } else if (mathvalue.startsWith('/')) {
                    const result = parseInt(lineString) / parseInt(mathvalue.replace("/", ""))
                    ws.write(result)
                    if (isNaN(lineString)) {
                        throw new Error('Any input other than numbers is invalid.')
                    }
                    count++
                } else if (mathvalue.startsWith('*')) {
                    const result = parseInt(lineString) * parseInt(mathvalue.replace("*", ""))
                    ws.write(result)
                    if (isNaN(lineString)) {
                        throw new Error('Any input other than numbers is invalid.')
                    }
                    count++
                }
            } else {
                ws.write(lineString);
                count++
            }
        }
    });
    rl.on('close', () => {　
        fs.readFile("dtm.eldat", "utf-8", (err, data) => {
            if (err) throw err;
            fs.copyFileSync('./dtm.eldat', file)
            fs.unlink('./dtm.eldat', (err) => {
                if (err) throw err;
            })
        });
    });
}
exports.linecount = function linecount(file) {
    let text = fs.readFileSync(file, 'utf-8');
    let txt = text.slice().split('\n')
    return txt.length
}
