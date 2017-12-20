function hexToDec (str) {
  str = str.replace(/([a-f])/g, ($0, $1) => {
    let temp = null
    switch ($1) {
      case 'a':
        temp = '0'
        break
      case 'b':
        temp = '1'
        break
      case 'c':
        temp = '2'
        break
      case 'd':
        temp = '3'
        break
      case 'e':
        temp = '4'
        break
      case 'f':
        temp = '5'
        break
      default:
        temp = '6'
    }
    return temp
  })
  return str
}

module.exports = hexToDec