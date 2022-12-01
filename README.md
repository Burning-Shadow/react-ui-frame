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
