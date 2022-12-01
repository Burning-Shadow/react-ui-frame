## 文档 & 调试
### npm run build-storybook
本项目的 index.js 作为导出总文件已无法通过 `npm run start` 正常查看。
而需要通过 `npm run build-storybook` 来完成调试。执行后会自动在本地起服务并提供文档 & 调试界面。

## npm 包发布
### 本地测试
```
<!-- 1. cd 至文件夹根目录下，全局创建软链接 -->
npm link

<!-- 2. cd 至要使用 npm 包的地方【比如叫 ui-frame-test】，完成 ui-frame-test -> global soft link -> react-ui-frame 的软链搭建 -->
npm link react-ui-frame

<!-- 3. 在 ui-frame-test 项目中可以直接导入 react-ui-frame -->
import { Button } from 'react-ui-frame';
import 'react-ui-frame/build/index.css';

<!-- 4. 为保证 react 版本一致，还需在 react-ui-frame 根目录下执行 npm link ../ui-frame-test/node_modules/react，而后重启 ui-frame-test -->
<!-- Ps: 这只是调试的权宜之计，真正处理还需在 publish 的过程中 -->
```

### 上传发布包
#### 准备工作
```
<!-- 1. 依赖需要进行控制，也就是 package.json 文件中将不必要的内容，诸如 @types/xxx、react-script 等均移入 devDependencies 中，减小体积 -->

<!-- 2. package.json 中增加 peerDependencies 项目，将前置依赖项放入【Ps: 移动的部分需增加至 devDependencies 中，保证开发时的正常使用】 -->

<!-- 3. 增加 welcome.stories.tsx，使得页面重定向位置改变 -->

<!-- 4. 执行 npm run build-storybook，生成静态文件，可直接上传至文档网站 -->
```

### CI-CD
```
<!-- 在 travis-ci.com 中绑定自身项目【开源项目免费使用】 -->

<!-- package.json 中的 prepublish 会在 npm install 和 npm publish 前均会运行，故 scripts 中的关键字需改为 prepublish-Only -->

<!-- 正常 push 即可触发【地址为 https://app.travis-ci.com/github/Burning-Shadow/react-ui-frame】 -->

<!-- 在更新 .travis.yml 后
注意 github_token 变量需要和 setting 中的 `Personal access tokens`
【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】 对应 
-->
```
