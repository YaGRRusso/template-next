import IMask from 'imask'

const clearMask = (value: string) => value.replace(/[^a-zA-Z0-9\s]/g, '')

/**
 * Mask a string into a IMask pattern
 * @param value String that will be masked
 * @param masks 0 as Digit, a as Letter, * as Any, [] as Optional, {} as Fixed
 * @returns Masked string
 */
export const mask = (value: string | undefined, masks: string | string[]) => {
  if (value) {
    if (typeof masks === 'string') masks = [masks]

    if (masks.length > 1) {
      masks.sort((a, b) => clearMask(a).length - clearMask(b).length)
      for (const mask of masks) {
        if (clearMask(value).length <= clearMask(mask).length) {
          return IMask.createMask({
            mask,
          }).resolve(value)
        }
      }
    }

    return IMask.createMask({
      mask: masks[masks.length - 1],
    }).resolve(value)
  }
}
