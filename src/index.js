var nodeGettext = require('node-gettext')

window.ifrxGT = window.ifrxGT || new nodeGettext()

function getUserLanguage() {
  const zhRegexr = /zh/i

  if (zhRegexr.test(window.LANG)) {
    return 'zh'
  } else {
    return 'en'
  }
}

function localeInit(locales) {
  if (!locales) throw new Error('param locales is requried')

  _setIfrxGTLocale()
  window.ifrxGT.addTranslations('en', 'messages', locales['en'])
  window.ifrxGT.addTranslations('zh', 'messages', locales['zh-CN'])
}

function interpolation(msg, args = {}) {
  msg = msg.replace(/\\{/g, '\u007B').replace(/\\}/g, '\u007D')

  for (let key in args) {
    let reg = new RegExp(`\\{\\s*${key}\\s*\\}`, 'g')
    msg = msg.replace(reg, args[key])
  }

  return msg
}

function translate(msg, args = {}, context = false) {
  if (context) {
    msg = window.ifrxGT.pgettext(context, msg)
  } else {
    msg = window.ifrxGT.gettext(msg)
  }

  msg = interpolation(msg, args)

  return msg
}

function pluralTranslate(msg, msgPlural, args = {}, context = false) {
  if (args.count === undefined) {
    args.count = 1
  }

  if (context) {
    msg = window.ifrxGT.npgettext(context, msg, msgPlural, args.count)
  } else {
    msg = window.ifrxGT.ngettext(msg, msgPlural, args.count)
  }

  msg = interpolation(msg, args)

  return msg
}

function translateWithContext(context, msg, args) {
  return translate(msg, args, context)
}

function pluralTranslateWithContext(context, msg, msgPlural, args) {
  return pluralTranslate(msg, msgPlural, args, context)
}

function _setIfrxGTLocale() {
  const locale = getUserLanguage()
  window.ifrxGT.setLocale(locale)
}

module.exports = {
  _: translate,
  _p: pluralTranslate,
  _c: translateWithContext,
  _cp: pluralTranslateWithContext,
  getUserLanguage,
  localeInit
}