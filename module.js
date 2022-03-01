exports.loadnum = function loadnum(file, line) {
  const fs = require('fs')
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
    }
    if (res == 1)
  } else if (isNaN(res) == true) {
    throw new Error('Any input other than numbers is invalid.')
  } else {
    return res
  }
}
exports.loadstr = function loadstr(file, line) {
  const fs = require('fs')
  let text = fs.readFileSync(file, 'utf-8');
  let txt = text.slice().split('\n')
  let res = txt[line - 1]
  return res
}
exports.edit = function edit(file, line, value) {
  const readline = require('readline');
  const fs = require('fs')
  const rs = fs.createReadStream(file, {
    start: 0,
    autoClose: false
  });
  const dt = fs.writeFileSync('dt.dota', '');
  const ws = fs.createWriteStream('dt.dota');
  const rl = readline.createInterface({ /*読み込みたいストリームの設定*/
    input: rs,
    output: ws
  });
  let count = 0
  rl.on('line', (lineString) => {
    if (count == line - 1) {
      ws.write(value + "\n")
    } else {
      ws.write(lineString + '\n');
    }
    count++
    fs.copyFileSync('./dt.dota', file)
  });
  rl.on('close', () => {
    fs.readFile("dt.dota", "utf-8", (err, data) => {
      if (err) throw err;
      fs.copyFileSync('./dt.dota', file)
      fs.unlink('./dt.dota', (err) => {
        if (err) throw err;
      })
    });
  });
}
exports.math = function math(file, line, mathvalue) {
  const readline = require('readline');
  const fs = require('fs')
  const rs = fs.createReadStream(file);
  const dt = fs.writeFileSync('dtm.dota', '');
  const ws = fs.createWriteStream('dtm.dota');
  const rl = readline.createInterface({
    input: rs,
    output: ws
  });
  let count = 0
  rl.on('line', (lineString) => {
    if (count == line - 1) {
      if (mathvalue.startsWith('+')) {
        const result = parseInt(lineString) + parseInt(mathvalue.replace("+", ""))
        ws.write(result + '\n')
        count++
      } else if (mathvalue.startsWith('-')) {
        const result = parseInt(lineString) - parseInt(mathvalue.replace("-", ""))
        ws.write(result + '\n')
        count++
      } else if (mathvalue.startsWith('/')) {
        const result = parseInt(lineString) / parseInt(mathvalue.replace("/", ""))
        ws.write(result + '\n')
        count++
      } else if (mathvalue.startsWith('*')) {
        const result = parseInt(lineString) * parseInt(mathvalue.replace("*", ""))
        ws.write(result + '\n')
        count++
      }
    } else {
      ws.write(lineString + '\n');
      count++
    }
  });
  rl.on('close', () => {　
    fs.readFile("dtm.dota", "utf-8", (err, data) => {
      if (err) throw err;
      fs.copyFileSync('./dtm.dota', file)
      fs.unlink('./dtm.dota', (err) => {
        if (err) throw err;
      })
    });
  });
}
