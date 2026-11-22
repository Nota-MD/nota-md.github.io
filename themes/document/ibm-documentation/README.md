# IBM Documentation

IBM Documentation 风格的 Nota 文档主题。它参考 IBM Documentation 的技术文档气质和 Carbon 中性色体系，保留以下特征：

- IBM Plex Sans SC 离线中文正文
- IBM Plex Mono 离线代码字体
- IBM Carbon 蓝色链接与交互强调色
- 清晰的标题层级和细边框
- 浅灰代码块、表格表头和辅助区域
- 蓝色左侧引用线
- 浅色与深色配色
- 与 IBM/Carbon 蓝色一致、并带对比度兜底的文字与表格选区
- 不包含 IBM 标志、网站导航、反馈控件或其他站点级 UI

主题参考 IBM Documentation 与 Carbon Design System 的公开配色角色：白色/灰色文档层次、Carbon Blue 60/40 链接色、IBM Plex 字体和深浅两套中性色。主题只复现写作纸面，不复制站点外壳。

## 安装

打开 Nota 的 **设置 → 文档主题 → 打开…**，选择本目录中的 `theme.css`，或者将整个 `ibm-documentation` 目录复制到文档主题目录后从主题菜单选择。

主题目录必须保持完整，因为 `theme.css` 会从 `assets/fonts/` 加载离线字体。

## 字体

本主题随附以下 IBM Plex 字体文件：

- IBM Plex Sans SC Regular、SemiBold、Bold
- IBM Plex Mono Regular

字体来自 IBM 官方 `IBM/plex` 项目，对应 npm 包 `@ibm/plex-sans-sc@1.1.0` 和 `@ibm/plex-mono@2.5.0`。字体按 SIL Open Font License 1.1 分发，许可证正文位于 `assets/fonts/`。

`assets/fonts/SHA256SUMS` 用于校验字体文件完整性。

## 主题边界

本主题只控制 Nota 的文档纸面和导出排版，不改变 Nota 的侧栏、标签页、菜单、按钮或其他应用界面。
