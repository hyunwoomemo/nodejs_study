function checkType(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

console.log(checkType(1))
console.log(checkType(true))
console.log(checkType(null))
console.log(checkType(undefined))
console.log(checkType(NaN))
console.log(checkType(Infinity))
console.log(checkType('1'))
console.log(checkType([]))
console.log(checkType({}))
console.log(checkType(function () {}))