interface Array<T> {
  first: () => T | null
  last: () => T | null
}

Array.prototype.first = function () {
  if (this.length === 0) return null
  return this[0]
}

Array.prototype.last = function () {
  if (this.length === 0) return null
  return this[this.length - 1]
}
