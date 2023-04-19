// 0 - any digit
// a - any letter
// * - any char
// [] - make input optional
// {} - include fixed part in unmasked value
// ` - prevent symbols shift back
import IMask from 'imask'

export const phoneMask = IMask.createMask({
  mask: '(00) 00000-0000',
})
