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

该配置文件是为 narp 所需的 .narprc 文件，请参考 [narp#configuration](https://github.com/laget-se/narp#configuration)，考虑到各个项目中可能存在的命名冲突，例如项目中使用了 lodash，那么从 i18n-utils/util 中导出的 _ 方法就要被重命名。

```javascript
import _ from lodash
import {_ as _t} from 'i18n-utils/util'

// .narprc 中的 funcArgumentsMap 字段写法应为
{
  "extract": {
    "source": "path/to/source",
    "funcArgumentsMap": {
      "_t": ["msgid"] // 这里应该为 _t 而不是 _
    }
  }
}
```



## 初始化



## 使用

* 纯文本（基本用法）

  ```javascript
  import {_} from 'i18n-utils/util'

  _('版本更新')
  ```

  ​

* 带参文本

  ```javascript
  import {_} from 'i18n-utils/util'

  _('最新版本为 {latestVersion}', {latestVersion: 'v2.3'})
  ```

  ​

* 需要加入上下文的文本

  ```javascript
  import {_c} from 'i18n-utils/util'

  _c('所有弹窗右下角取消按钮的标题', '取消')
  ```

  ​

* 复数（当前仅支持单复数，不支持多元化）

  ```javascript
  import {_p} from 'i18n-utils/util'

  _p('已欠费 1 天', '已欠费 {count} 天', {count: data.arrearageTime})
  ```

* 同时支持上下文和单复数

  ```javascript
  import {_cp} from 'i18n-utils/util'

  _cp('数据表个数','一个数据表', '{count} 个数据表', {count: 2})
  ```

  ​