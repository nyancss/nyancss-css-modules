import { NyanCSSMap } from '@nyancss/types'
import {
  applyComponent,
  tryApplyBooleanProp,
  tryApplyEnumProp
} from '@nyancss/utils'
import { NyanCSSModules } from '../types'

export default function convert(cssModules: NyanCSSModules) {
  return Object.keys(cssModules).reduce(
    (map, className) => {
      const processedClassName = cssModules[className]
      tryApplyBooleanProp(map, className, processedClassName) ||
        tryApplyEnumProp(map, className, processedClassName) ||
        applyComponent(map, className, processedClassName)
      return map
    },
    {} as NyanCSSMap
  )
}
