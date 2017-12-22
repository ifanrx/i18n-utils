import nodeGettext from 'node-gettext'

window.__gt = window.__gt || new nodeGettext()

function getUserLanguage() {
  const zhRegexr = /zh/i

  if (zhRegexr.test(window.LANG)) {
    return 'zh'
  } else {
    return 'en'
  }
}

function localeInit(locales) {
  if (!locales) throw new Error('params locales is requried')

  const locale = getUserLanguage()
  window.__locale = locale
  window.__gt.setLocale(locale)

  window.__gt.addTranslations('en', 'messages', locales['en'])
  window.__gt.addTranslations('zh', 'messages', locales['zh-CN'])
}

const interpolation = (msg, args = {}) => {
  msg = msg.replace(/\\{/g, '\u007B').replace(/\\}/g, '\u007D')

  for (let key in args) {
    let reg = new RegExp(`\\{\\s*${key}\\s*\\}`, 'g')
    msg = msg.replace(reg, args[key])
  }

  return msg
}

const translate = (msg, args = {}, context = false) => {
  if (context) {
    msg = window.__gt.pgettext(context, msg)
  } else {
    msg = window.__gt.gettext(msg)
  }

  msg = interpolation(msg, args)

  return msg
}

const pluralTranslate = (msg, msgPlural, args = {}, context = false) => {
  if (args.count === undefined) {
    args.count = 1
  }

  if (context) {
    msg = window.__gt.npgettext(context, msg, msgPlural, args.count)
  } else {
    msg = window.__gt.ngettext(msg, msgPlural, args.count)
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

export {
  translate as _,
  pluralTranslate as _p,
  translateWithContext as _c,
  pluralTranslateWithContext as _cp,
  getUserLanguage,
  localeInit,
}
