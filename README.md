# i18n-utils

借助 [narp](https://github.com/laget-se/narp) 工作流，使用 [react-gettext-parser](https://github.com/laget-se/react-gettext-parser)、[node-gettext](https://github.com/alexanderwallin/node-gettext) 等工具实现的一套国际化方案。目前仅支持中英文

## 安装

```javascript
npm i narp
npm i github:ifanrx/i18n-utils
```



## 配置

请参考 [narp#configuration](https://github.com/laget-se/narp#configuration) 配置项目所需的 .narprc



### options

该配置文件用于 narp 运行时需要读取的 .narprc 文件，请参考 [narp#configuration](https://github.com/laget-se/narp#configuration)。一般情况下，```funcArgumentsMap``` 字段应该为：

```javascript
// 一般情况下 .narprc 中的 funcArgumentsMap 字段如下
{
  "extract": {
    "source": "path/to/source",
    "funcArgumentsMap": {
      "_": ["msgid"],
      "_p": ["msgid", "msgid_plural"],
      "_c": ["msgctxt","msgid"],
      "_cp": ["msgctxt","msgid", "msgid_plural"]
    }
  }
}

```

各方法定义如下：

* _ ('待翻译文本', [{param}])

  使用默认的文本域来翻译该字符串，字符串中可包含参数。

* _p('单数情况下的表达', '复数情况下的表达 {count}', {count: 具体值})

  翻译复数字符串

* _c('特定的上下文', '待翻译文本')

  在特定的语境 / 上下文环境下翻译文本

* _cp('特定上下文', '单数时的翻译文本', '复数时的翻译文本 {count}', {count: count 的具体值})

以上方法最终会调用 [node-gettext 中 gettext.js 的相关方法](https://github.com/alexanderwallin/node-gettext/blob/master/lib/gettext.js)

## 初始化

```javascript
import {localeInit} from 'i18n-utils'
import locales form 'locales.json' // 项目所需的语言包文件

localeInit(locales)
```



## 使用

* 纯文本（基本用法）

  ```javascript
  import {_} from 'i18n-utils'

  _('版本更新')
  ```

* 带参文本

  ```javascript
  import {_} from 'i18n-utils'

  _('最新版本为 {latestVersion}', {latestVersion: 'v2.3'})
  ```

* 需要加入上下文的文本

  ```javascript
  import {_c} from 'i18n-utils'

  _c('所有弹窗右下角取消按钮的标题', '取消')
  ```

* 复数（当前仅支持单复数，不支持多元化）

  ```javascript
  import {_p} from 'i18n-utils'

  _p('已欠费 1 天', '已欠费 {count} 天', {count: data.arrearageTime})
  ```

* 同时支持上下文和单复数

  ```javascript
  import {_cp} from 'i18n-utils'

  _cp('数据表个数','一个数据表', '{count} 个数据表', {count: 2})
  ```

  ​