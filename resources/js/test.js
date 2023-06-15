import CP from '../../node_modules/color-picker/index.mjs'

const picker = new CP(document.querySelector('#color-picker'))

picker.on('change', function (r,b,g,a) {
  this.source.value = `rgba(${r},${b},${g},${a})`
})