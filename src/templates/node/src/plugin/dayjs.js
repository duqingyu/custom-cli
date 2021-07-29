import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs
  .extend(isBetween)
  .extend(isSameOrBefore)
  .extend(customParseFormat)
  .extend(weekOfYear)

export default dayjs
