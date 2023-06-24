## 🏝 1. 快速入门

### 1.1 概念介绍

HTML 拖放 API （[Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)）用于在网页中实现拖放功能。通过拖放 API，我们可以实现将可拖拽（draggable）元素拖动到另一个可放置（droppable）元素，以及实现交互式的拖放体验。这个 API 提供了一系列的事件和方法，使我们能够轻松地处理拖放操作。

### 1.2 作用和使用场景

拖放 API 作用在于使网页具备拖放功能，为用户提供更直观、灵活的交互体验。这里介绍几个常见的使用场景：

- 相册应用中，用户可以拖动图片到不同的分组或标签中进行分类；
- 项目任务管理应用中，用户可以拖动任务卡片进行排序或分组；
- 文件上传功能中，用户可以将文件拖动到指定区域进行上传；
- 游戏中的元素拖放操作，如棋盘游戏中的棋子移动等。

拖放 API 的灵活性和易用性使得它成为开发者们构建交互性强大的网页应用程序的理想选择。

## 🎨 2. 如何使用

使用拖放 API 主要包括以下 3 个步骤：

1. **定义可拖拽的（draggable）元素**：将需要拖动的元素标记为可拖拽，并指定相应的事件处理逻辑。
2. **定义可放置的（droppable）元素**：将用来放置被拖动元素的目标区元素标记为可放置，并指定相应的事件处理逻辑。
3. **处理拖放事件**：根据需要，处理**可拖拽元素**和放置目标的事件，例如拖动开始（[dragstart](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event)）、拖动过程中（[drag](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event)）、拖动结束（[dragend](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event)）以及放置操作（[drop](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event)）等。

下面是一个简单的示例代码，演示了如何使用拖放 API ：

```javascript
// 定义可拖拽的元素
const dragSource = document.getElementById("drag-source");
dragSource.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
});

// 定义可放置的元素
const dropTarget = document.getElementById("drop-target");
dropTarget.addEventListener("dragover", (event) => {
  event.preventDefault();
});
// 处理放置事件
dropTarget.addEventListener("drop", (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(data);
  dropTarget.appendChild(draggedElement);
});
```

在这个示例中，我们通过分别将元素 `drag-source` 和 `drop-target` 设置为可拖拽元素和可放置元素，冰分别监听 `dragstart`和 `dragover`事件，添加相应的处理逻辑，实现了一个简单的拖放操作。
当拖动 `drag-source` 元素时，使用 `event.dataTransfer.setData()` 方法设置了拖动数据，而放置目标元素时，执行 `drop`事件监听的回调方法，实现被拖动的元素添加到可放置元素底下。

## 🧭 3. 实际应用

拖放 API 在实际应用中有许多用途。下面是一些常见的实际应用场景：

### 3.1 图片库应用程序

在相册应用中，用户可以拖动图片到不同的分组或标签中进行分类和管理。下面是一个简单的示例代码，演示了如何使用拖放 API 实现图片库的拖放功能：

```html
<style>
  .album {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .album img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    cursor: move;
  }
  .highlight {
    border-color: #ff0000;
  }
</style>
</head>
<body>
<div id="album-1" class="album">
  <img id="photo-1" draggable="true" alt="Photo 1"
    src="https://th.bing.com/th/id/OIG.m8Fs4GYEDFhEHVFLHPSv?pid=ImgGn"
  />
  <img id="photo-2" draggable="true" alt="Photo 2"
    src="https://th.bing.com/th/id/OIG.5eGiRmmq0t8jdtIzNjL6?pid=ImgGn"
  />
</div>

<div id="album-2" class="album">
  <img id="photo-3" draggable="true" alt="Photo 3"
    src="https://th.bing.com/th/id/OIG.D4dUFPI0FNTcK5qlrc3b?pid=ImgGn"
  />
  <img id="photo-4" draggable="true" alt="Photo 4"
    src="https://th.bing.com/th/id/OIG.oJmwyH4Eobphjk0qtZxz?pid=ImgGn"
  />
</div>

<script>
  const albums = document.querySelectorAll(".album");
  albums.forEach((album) => {
    album.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);
      event.target.classList.add("highlight");
    });

    album.addEventListener("dragend", (event) => {
      event.target.classList.remove("highlight");
    });

    album.addEventListener("dragover", (event) => {
      event.preventDefault();
      album.classList.add("highlight");
    });

    album.addEventListener("dragleave", () => {
      album.classList.remove("highlight");
    });

    album.addEventListener("drop", (event) => {
      event.preventDefault();
      album.classList.remove("highlight");
      const photoId = event.dataTransfer.getData("text/plain");
      const photo = document.getElementById(photoId);
      const clonedPhoto = photo.cloneNode(true);
      album.appendChild(clonedPhoto);
    });
  });
</script>

```

在这个示例中，我们创建了两个相册容器（**album-1**和**album-2**），每个相册容器中包含了一些可拖动的图片元素。
当拖动图片时，我们使用 `dragstart` 事件将图片的 ID 存储在 `dataTransfer` 对象中。在放置目标容器上，我们使用 `dragover` 事件阻止默认行为并添加一些过渡样式，使用 `dragleave` 事件移除过渡样式，使用 `drop` 事件在放置目标容器中追加拖动的图片元素。
通过这样的实现，用户可以轻松地将图片拖动到不同的相册中进行分类和管理。

### 3.2 项目任务管理应用

在项目任务管理应用中，用户可以通过拖动任务卡片进行排序、分组或更改任务状态。下面是一个简单的示例代码，演示了如何使用拖放 API 实现项目任务管理应用中的拖放功能：

```html
<div id="task-list">
  <div class="task" draggable="true">任务 1</div>
  <div class="task" draggable="true">任务 2</div>
  <div class="task" draggable="true">任务 3</div>
</div>
<script>
  // 定义拖动源
  const draggableTasks = document.querySelectorAll(".task");
  draggableTasks.forEach((task) => {
    task.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.innerText);
    });
  });

  // 定义放置目标
  const taskList = document.getElementById("task-list");
  taskList.addEventListener("dragover", (event) => {
    event.preventDefault();
    taskList.classList.add("highlight");
  });
  taskList.addEventListener("dragleave", () => {
    taskList.classList.remove("highlight");
  });
  taskList.addEventListener("drop", (event) => {
    event.preventDefault();
    taskList.classList.remove("highlight");
    const taskName = event.dataTransfer.getData("text/plain");
    const task = document.createElement("div");
    task.innerText = taskName;
    task.classList.add("task");
    taskList.appendChild(task);
  });
</script>
```

在上述示例中，我们创建了一个任务列表容器（`task-list`），其中包含了几个可拖动的任务卡片。当拖动任务卡片时：

- 使用 `dragstart` 事件将任务名称存储在 `dataTransfer` 对象中；
- 使用 `dragover` 事件阻止默认行为并添加视觉反馈；
- 使用 `dragleave` 事件移除视觉反馈；
- 使用 `drop` 事件在任务列表容器中创建新的任务卡片。

通过这样的实现，用户可以通过拖动任务卡片来进行排序、分组或更改任务状态。

### 3.3 页面生成器

拖放 API 在页面生成器应用程序中也有广泛的应用，尤其是海报设计器、低代码平台等。页面生成器允许用户通过拖放组件来创建自定义的网页布局和内容。
下面是一个完整示例代码，演示了如何使用拖放 API 实现页面生成器中的拖放功能：

```html
<style>
  #canvas {
    border: 2px dashed #ccc;
    padding: 10px;
    min-height: 200px;
    margin-bottom: 20px;
  }
  .component {
    background-color: #f0f0f0;
    padding: 10px;
    margin-bottom: 10px;
    cursor: move;
  }
  #page {
    border: 2px solid #ccc;
    padding: 20px;
    min-height: 200px;
  }
  .highlight {
    border-color: #ff0000;
  }
</style>

<div id="canvas">
  <div class="component" draggable="true">文本组件</div>
  <div class="component" draggable="true">图片组件</div>
  <div class="component" draggable="true">按钮组件</div>
</div>

<div id="page">
  <h1>我的页面</h1>
</div>

<script>
  // 定义拖动源
  const draggableComponents = document.querySelectorAll(".component");
  draggableComponents.forEach((component) => {
    component.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.innerText);
    });
  });

  // 定义放置目标
  const page = document.getElementById("page");
  page.addEventListener("dragover", (event) => {
    event.preventDefault();
    page.classList.add("highlight");
  });
  page.addEventListener("dragleave", () => {
    page.classList.remove("highlight");
  });
  page.addEventListener("drop", (event) => {
    event.preventDefault();
    page.classList.remove("highlight");
    const componentName = event.dataTransfer.getData("text/plain");
    const component = document.createElement("div");
    component.innerText = componentName;
    component.classList.add("component");
    page.appendChild(component);
  });
</script>
```

## 📋 4. 兼容性和优缺点

### 4.1 兼容性

以下是 Drag and Drop API 的兼容性列表，包含了主流浏览器及其支持的最低版本：

- Chrome 4+✅
- Firefox 3.5+✅
- Safari 3.1+✅
- Edge 12+✅
- Opera 12.1+✅
- IE 6+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1686123524367-71f47f1d-d3d9-473b-a45b-f4bdc8775a6e.png#averageHue=%23d7c4a8&clientId=ud5c4a3e9-4086-4&from=paste&height=761&id=Ju1RX&originHeight=761&originWidth=1456&originalType=binary&ratio=1&rotation=0&showTitle=false&size=141563&status=done&style=none&taskId=u99927160-21c5-4174-8868-c4c66eba711&title=&width=1456)
也可以在 [caniuse.com](https://caniuse.com/?search=Drag%20and%20Drop) 上查看具体的兼容性信息。

### 4.2 优缺点

拖放 API 有以下优点和缺点：
优点：

- 提供了直观、灵活的拖放功能，提高用户体验。
- 可以轻松实现拖放排序、文件上传等常见交互操作。
- 提供了丰富的事件和方法，使开发者可以自定义拖放行为。

缺点：

- 在某些较旧的浏览器中可能存在兼容性问题。
- 拖放操作可能受到设备的限制，如移动设备上的触摸操作。
- 需要一定的学习成本和开发时间来理解和实现。

### 4.3 工具推荐

以下是 5 个推荐的工具，可辅助您在使用拖放 API 进行开发时提高效率：

1. [Sortable](https://github.com/SortableJS/Sortable): 27k⭐，可拖放排序库，具有丰富的自定义选项和事件。Reorderable drag-and-drop lists for modern browsers and touch devices. No jQuery or framework required.
2. [dragula](https://github.com/bevacqua/dragula): 21.6kk⭐，简化拖放操作的 JavaScript 库，浏览器支持包括所有常用浏览器和**IE7+**，框架支持包括 vanilla JavaScript，Angular 和 React。👌 Drag and drop so simple it hurts
3. [React DnD](https://github.com/react-dnd/react-dnd): 19.3k⭐，适用于 React 的强大拖放库。Drag and Drop for React.
4. [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable): 18.9k⭐， Vue.js 的拖放组件，提供了易用的拖放功能。Vue component (Vue.js 2.0) or directive (Vue.js 1.0) allowing drag-and-drop and synchronization with view model array.

通过使用这些工具，您可以简化拖放操作的实现，并提高开发效率。

## 🎯 5. 使用建议和注意事项

以下是一些建议和注意事项：

- 了解不同浏览器对拖放 API 的支持情况，并做好兼容性处理。
- 使用现有的拖放库或框架，以简化拖放操作的实现。
- 注意性能问题，特别是在处理大量拖放元素时。
- 考虑移动设备上的触摸操作，确保拖放功能在移动设备上的可用性和易用性。
- 提供适当的视觉反馈和指导，以帮助用户理解和使用拖放功能。

遵循这些建议和注意事项，可以更好地应用拖放 API ，并为用户提供优秀的拖放体验。

## 🍭 6. 总结

本文主要介绍了 Drag and Drop API，我们了解了这个 API 的作用和如何使用，在文章中还通过一些常见使用示例和大家展示代码如何实现，最后还给出一些使用建议和注意，希望大家能够更好的了解 Drag and Drop API，在实际工作中能够合理使用。

## 📚 7. 拓展阅读

以下是一些拓展阅读资源，可以帮助您深入学习和理解拖放 API ：

- [MDN Web - HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)：MDN 上关于拖放 API 的详细文档。
- [HTML5 Rocks - Native HTML5 Drag and Drop](http://www.html5rocks.com/en/tutorials/dnd/basics/)：HTML5 Rocks 上的一篇关于原生 HTML5 拖放的教程。
- [A List Apart - Beyond Drag and Drop](https://alistapart.com/article/beyonddraganddrop/)：一篇深入探讨拖放交互设计的文章。

阅读这些资源将帮助大家更深入地了解拖放 API 的更多细节和最佳实践。
