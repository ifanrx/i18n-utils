'use strict';

var nodeGettext = require('node-gettext');

window.ifrxGT = window.ifrxGT || new nodeGettext();

function getUserLanguage() {
  var zhRegexr = /zh/i;

  if (zhRegexr.test(window.LANG)) {
    return 'zh';
  } else {
    return 'en';
  }
}

function localeInit(locales) {
  if (!locales) throw new Error('param locales is requried');

  var locale = getUserLanguage();
  window.__locale = locale;
  window.ifrxGT.setLocale(locale);

  window.ifrxGT.addTranslations('en', 'messages', locales['en']);
  window.ifrxGT.addTranslations('zh', 'messages', locales['zh-CN']);
}

function interpolation(msg) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  msg = msg.replace(/\\{/g, '{').replace(/\\}/g, '}');

  for (var key in args) {
    var reg = new RegExp('\\{\\s*' + key + '\\s*\\}', 'g');
    msg = msg.replace(reg, args[key]);
  }

  return msg;
}

function translate(msg) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (context) {
    msg = window.ifrxGT.pgettext(context, msg);
  } else {
    msg = window.ifrxGT.gettext(msg);
  }

  msg = interpolation(msg, args);

  return msg;
}

function pluralTranslate(msg, msgPlural) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (args.count === undefined) {
    args.count = 1;
  }

  if (context) {
    msg = window.ifrxGT.npgettext(context, msg, msgPlural, args.count);
  } else {
    msg = window.ifrxGT.ngettext(msg, msgPlural, args.count);
  }

  msg = interpolation(msg, args);

  return msg;
}

function translateWithContext(context, msg, args) {
  return translate(msg, args, context);
}

function pluralTranslateWithContext(context, msg, msgPlural, args) {
  return pluralTranslate(msg, msgPlural, args, context);
}

module.exports = {
  _: translate,
  _p: pluralTranslate,
  _c: translateWithContext,
  _cp: pluralTranslateWithContext,
  getUserLanguage: getUserLanguage,
  localeInit: localeInit
};