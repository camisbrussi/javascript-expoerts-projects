import StringUtil from "@camisbrussi/string-util";

const DATE_FORMATS = {
  'dd-mm-yyyy': '$<day>-$<month>-$<year>',
  'dd/mm/yyyy': '$<day>/$<month>/$<year>',
  'yyyy-mm-dd': '$<year>-$<month>-$<day>',
  'yyyy/mm/dd': '$<year>/$<month>/$<day>'
};

const DATE_REGEXPS = {
  'dd-mm-yyyy': /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g,
  'dd/mm/yyyy': /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g,
  'yyyy-mm-dd': /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g,
  'yyyy/mm/dd': /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
};

export default class DateUtil {
  static formatDate(date, format) {
    if (!DATE_FORMATS[format]) {
      return {
        error: `The format ${format} is not available yet :(`
      };
    }

    const dateStringFormat = DATE_FORMATS[format];
    const [result] = date.toISOString().match(DATE_REGEXPS['yyyy-mm-dd']);

    return result.replace(DATE_REGEXPS['yyyy-mm-dd'], dateStringFormat);
  }

  static formatString(dateStr, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(dateStr)) {
      return { error: 'Your text is empty' };
    }

    if (!DATE_REGEXPS[currentFormat]) {
      return { error: `The format ${currentFormat} is not available yet :(` };
    }

    if (!DATE_REGEXPS[expectedFormat]) {
      return { error: `The format ${expectedFormat} is not available yet :(` };
    }

    const toDateExp = DATE_REGEXPS[currentFormat];
    const dateStrInISO = StringUtil.removeEmptySpaces(dateStr).replace(
      toDateExp,
      '$<year>-$<month>-$<day>'
    );

    const finalDate = new Date(dateStrInISO);

    return this.formatDate(finalDate, expectedFormat);
  }
}