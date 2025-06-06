
# AndroViz: AI-Powered Android Layout Editor

AndroViz is a web-based tool designed to streamline the Android XML layout creation and optimization process. It provides a visual interface (illustrative) alongside a powerful XML editor, a dynamic property editor, and AI-driven suggestions to improve your layouts. This tool is built within Firebase Studio, leveraging Next.js, React, ShadCN UI components, Tailwind CSS, and Genkit for AI features.

## Key Features

*   **Visual Preview (Illustrative):** Get an illustrative visual representation of your Android XML layout. Select from various screen presets (phones, tablets, foldables, wearables) or define custom dimensions. *Note: This is a mock/illustrative preview and not a full Android rendering engine.*
*   **XML Code Editor:** A dedicated panel for directly editing Android XML layout code.
*   **Property Editor:** Dynamically edit the attributes of selected UI components. Changes are reflected based on the current XML.
*   **AI Layout Optimization:** Leverage Generative AI (via Genkit) to analyze your XML layout and receive suggestions for performance, readability, and maintainability improvements. You can also provide your coding style preferences.
*   **Component Library:** Access a library of standard Android UI components (TextView, Button, ImageView, LinearLayout, ConstraintLayout, etc.) and add their XML snippets to your layout. Supports adding custom component snippets.
*   **Blueprint View (Placeholder):** A tab dedicated to a future blueprint-style view of your layout, similar to Android Studio's blueprint mode (currently a placeholder).
*   **Screen & Editor Settings:** Configure preview screen dimensions, manage custom resolutions, and access editor-related settings like (conceptual) auto-save.
*   **Menubar:** Provides common actions like Save (download XML), and placeholders for New, Open, Edit operations (Undo, Redo, Cut, Copy, Paste), and Tools (Toggle Comment, Format XML, Jump to Line).

## Technology Stack

*   **Frontend:** Next.js (App Router), React, TypeScript
*   **UI Components:** ShadCN UI
*   **Styling:** Tailwind CSS
*   **AI Integration:** Genkit (with Google AI models)
*   **Development Environment:** Firebase Studio

## Purpose

AndroViz aims to be a helpful companion for Android developers by:
*   Providing a visual aid for layout design (even if illustrative).
*   Simplifying the process of writing and managing XML layout code.
*   Offering AI-powered insights to create more efficient and robust layouts.
*   Allowing quick experimentation with different components and properties.

## Getting Started

This application is designed to run within Firebase Studio.
1.  The main interface is accessible via `src/app/page.tsx`.
2.  Explore the different tabs: Visual Editor, Blueprint, XML Editor, Component Library, Property Editor, Layout Optimization, and Settings.
3.  Modify XML in the "XML Editor" tab or use the "Property Editor" after (mock) selecting an element in the "Visual Preview".
4.  Use the "Layout Optimization" tab to get AI suggestions for your XML.
5.  Add components from the "Component Library".
6.  Configure preview settings in the "Settings" tab.

---

# AndroViz: AI 赋能的安卓布局编辑器 (中文说明)

AndroViz 是一个基于 Web 的工具，旨在简化 Android XML 布局的创建和优化过程。它提供了一个可视化界面（示意性）、一个强大的 XML 编辑器、一个动态属性编辑器，以及由 AI 驱动的建议来改进您的布局。此工具构建在 Firebase Studio 之上，利用 Next.js、React、ShadCN UI 组件、Tailwind CSS 和 Genkit (用于 AI 功能)。

## 主要功能

*   **可视化预览 (示意性):** 获取您的 Android XML 布局的示意性可视化表示。可以从各种屏幕预设（手机、平板电脑、可折叠设备、可穿戴设备）中选择，或定义自定义尺寸。*请注意：这是一个模拟/示意性预览，并非完整的 Android 渲染引擎。*
*   **XML 代码编辑器:** 一个专门用于直接编辑 Android XML 布局代码的面板。
*   **属性编辑器:** 动态编辑所选 UI 组件的属性。更改会根据当前 XML 反映出来。
*   **AI 布局优化:** 利用生成式 AI (通过 Genkit) 分析您的 XML 布局，并接收有关性能、可读性和可维护性改进的建议。您还可以提供您的编码风格偏好。
*   **组件库:** 访问标准 Android UI 组件（如 TextView, Button, ImageView, LinearLayout, ConstraintLayout 等）的库，并将其 XML 代码片段添加到您的布局中。支持添加自定义组件代码片段。
*   **蓝图视图 (占位符):** 一个专用于未来蓝图风格布局视图的标签页，类似于 Android Studio 的蓝图模式（当前为占位符）。
*   **屏幕与编辑器设置:** 配置预览屏幕尺寸，管理自定义分辨率，并访问与编辑器相关的设置，如（概念性的）自动保存。
*   **菜单栏:** 提供常用操作，如保存（下载 XML），以及新建、打开、编辑操作（撤销、重做、剪切、复制、粘贴）和工具（切换注释、格式化 XML、跳转到行）的占位符。

## 技术栈

*   **前端:** Next.js (App Router), React, TypeScript
*   **UI 组件:** ShadCN UI
*   **样式:** Tailwind CSS
*   **AI 集成:** Genkit (使用 Google AI 模型)
*   **开发环境:** Firebase Studio

## 项目目的

AndroViz 旨在成为 Android 开发者的得力助手，通过以下方式：
*   为布局设计提供可视化辅助（即使是示意性的）。
*   简化编写和管理 XML 布局代码的过程。
*   提供 AI 驱动的见解，以创建更高效、更健壮的布局。
*   允许快速尝试不同的组件和属性。

## 如何开始

此应用程序设计在 Firebase Studio 中运行。
1.  主界面通过 `src/app/page.tsx` 访问。
2.  探索不同的标签页：可视化编辑器 (Visual Editor)、蓝图 (Blueprint)、XML 编辑器 (XML Editor)、组件库 (Component Library)、属性编辑器 (Property Editor)、布局优化 (Layout Optimization) 和设置 (Settings)。
3.  在“XML 编辑器”选项卡中修改 XML，或在“可视化预览”中（模拟）选择一个元素后使用“属性编辑器”。
4.  使用“布局优化”选项卡获取针对您的 XML 的 AI 建议。
5.  从“组件库”中添加组件。
6.  在“设置”选项卡中配置预览设置。
