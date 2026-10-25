# Adwaita（只读内置文档主题）

这个目录属于 Nota 安装内容，**不要在这里创建、修改或删除任何文件**。
`theme.css` 与 `dark.css` 是随应用发布的只读内置主题；用户目录里的同名文件
也不会覆盖它们。

## 自定义文档主题放哪里

文档主题只管编辑区正文，不等同于界面风格。界面风格另有独立的 `ui-styles`
目录。

### Linux / 其他 XDG Unix-like 系统

默认目录：

```text
~/.config/nota/themes/
```

设置了 `XDG_CONFIG_HOME` 时：

```text
$XDG_CONFIG_HOME/nota/themes/
```

### macOS

```text
~/Library/Application Support/nota/themes/
```

### Windows

```text
%APPDATA%\nota\themes\
```

通常展开为：

```text
C:\Users\<用户名>\AppData\Roaming\nota\themes\
```

## 用户主题格式

用户主题 id 使用 ASCII 字母、数字、`-` 和 `_`。例如：

```text
my-theme.css
```

CSS 里可以用相对路径引用同目录或主题根目录内的资源：

```css
@font-face {
  font-family: "My Theme";
  src: url("./assets/fonts/theme.ttf");
}

:root {
  --doc-bg: #ffffff;
  --doc-fg: #222222;
  --font-doc: "My Theme", serif;
}
```

Unix-like 系统路径使用 `/`，Windows CSS URL 应使用 `/` 或正确转义的相对 URL；
不要写死 `C:\...` 这类本机绝对路径。字体等第三方资源必须把许可证放在资源旁边。

`adwaita` 和 `adwaita-dark` 是保留 id，用户主题不能覆盖。
界面风格不是文档主题，不要放进 `themes/`；界面风格使用独立的
`ui-styles/` 目录。
