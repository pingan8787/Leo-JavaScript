Welcome to the **Must Know JavaScript API** series, this series will learn the **JavaScript API** with you, so that you can be more proficient in using it like a senior engineer. Let's start learning together:

- [**Page Visibility API**](https://javascript.plainenglish.io/must-know-javascript-api-page-visibility-api-9f3e10439842)
- [**Broadcast Channel API**](https://javascript.plainenglish.io/must-know-javascript-api-broadcast-channel-api-f059860f9349)
- [**Resize Observer API**](https://javascript.plainenglish.io/must-know-javascript-api-resize-observer-api-9420aab1a74)
- [**Beacon API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-beacon-api-4abe0bee29ff)
- [**Clipboard API**](https://javascript.plainenglish.io/must-know-javascript-api-clipboard-api-22ac0861e27b)
- [**Fetch API**](https://javascript.plainenglish.io/must-know-javascript-api-fetch-api-11846c9a3b07)
- [**Performance API**](https://javascript.plainenglish.io/must-know-javascript-api-performance-api-85f7b8306b90)
- [**Storage API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-storage-api-2141f3066858)
- [**Fullscreen API**](https://javascript.plainenglish.io/must-know-javascript-api-fullscreen-api-64f0d4eff196)
- [**WebSockets API**](https://javascript.plainenglish.io/must-know-javascript-api-websockets-api-fd82719f256e)
- [**Geolocation API**](https://medium.com/@Chris1993/must-know-javascript-api-geolocation-api-f653f2d84b)
- [**IndexedDB API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-indexeddb-api-6e8c990f2c85)
- [**Intersection Observer API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-intersection-observer-api-3d00f4f3aa6d)
- [**Channel Messaging API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-channel-messaging-api-19631745673f)

## 🏝 1. Quick Start

### 1.1 Introduction

The HTML Drag and Drop API ([Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)) is used to implement drag and drop functionality in web pages. The drag and drop API allows us to drag a draggable element to another droppable element and to implement an interactive drag and drop experience.

### 1.2 Use Case

The Drag and Drop API is designed to make web pages Drag and Drop API capable, providing users with a more intuitive and flexible interaction experience. Here are a few common usage scenarios:

- In album applications: users can drag and drop images into different groups or tabs for sorting;
- in project task management application: users can drag task cards to sort or group them;
- in the file upload function: users can drag files to specified areas for uploading;
- Drag and Drop API operations of elements in games: e.g., piece movement in board games, etc.

The flexibility and ease of use of the Drag and Drop API can help developers build more interactive web applications.

## 🎨 2. How to use

Using the Drag and Drop API consists of the following 3 main steps:

1. **Define draggable elements**: mark the elements to be dragged as draggable and specify the corresponding event handling logic.
2. **Define droppable elements**: mark the target area elements used to place the dragged elements as droppable, and specify the corresponding event handling logic.
3. **Handle Drag and Drop API events**: Handle events for **droppable elements** and placement targets as needed, such as drag start ([dragstart](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_ event), during dragging ([drag](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event)), end of dragging ([dragend](https://developer. mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event)), and drop operations ([drop](https://developer.mozilla.org/en-US/docs/Web/API/ HTMLElement/drop_event)), etc.

Next, see a simple sample code that demonstrates how to use the Drag and Drop API API:

```javascript
// Define draggable elements
const dragSource = document.getElementById("drag-source");
dragSource.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
});

// Define the elements that can be placed
const dropTarget = document.getElementById("drop-target");
dropTarget.addEventListener("dragover", (event) => {
  event.preventDefault();
});
// Handling placement events
dropTarget.addEventListener("drop", (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(data);
  dropTarget.appendChild(draggedElement);
});
```

In this example, we have implemented a simple Drag and Drop API operation by setting the elements `drag-source` and `drop-target` as draggable and dropable elements respectively, listening to the `dragstart` and `dragover` events respectively, and adding the corresponding processing logic.

When dragging the `drag-source` element, the dragged data is set using the `event.dataTransfer.setData()` method, and when placing the target element, the callback method listened to by the `drop` event is executed, enabling the dragged element to be added under the placeable element.

## 🧭 3. Examples

The Drag and Drop API API has many uses in real-world applications. Here are some common real-world application scenarios:

### 3.1 Album application

In an album application, users can drag and drop images into different groups or tags to sort and manage them. The following is a simple sample code that demonstrates how to use the Drag and Drop API API to implement the Drag and Drop API functionality of an album application:

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

In this example, we have created two album containers (**album-1** and **album-2**), each containing a number of draggable image elements.

When dragging an image, we use the `dragstart` event to store the image's ID in the `dataTransfer` object. On the placement target container, we use the `dragover` event to block the default behavior and add some transition styles, the `dragleave` event to remove the transition styles, and the `drop` event to append the dragged image element to the placement target container.

The final result: users can easily drag and drop images into different albums for sorting and management.

### 3.2 Project Task Management Application

In the Project Task Management application, users can sort, group or change the status of tasks by dragging and dropping task cards. The following is a simple sample code that demonstrates how to implement Drag and Drop API functionality in a project task management application using the Drag and Drop API API:

```html
<div id="task-list">
  <div class="task" draggable="true">任务 1</div>
  <div class="task" draggable="true">任务 2</div>
  <div class="task" draggable="true">任务 3</div>
</div>
<script>
  // Defining the drag source
  const draggableTasks = document.querySelectorAll(".task");
  draggableTasks.forEach((task) => {
    task.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.innerText);
    });
  });

  // Define placement target
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

In this sample code, we create a task-list container (`task-list`), which contains several draggable task cards. When dragging task cards:

- use the `dragstart` event to store the task name in the `dataTransfer` object;
- use the `dragover` event to block the default behavior and add visual feedback;
- using the `dragleave` event to remove the visual feedback;
- Use the `drop` event to create a new task card in the task list container.

The end result: the user can sort, group or change the status of tasks by dragging the task cards.

### 3.3 Page Builder

The Drag and Drop API API is also widely used in page builder applications, especially in poster designers, low-code platforms, etc. The Page Builder allows users to create custom page layouts and content by dragging and dropping components.
The following is a complete sample code demonstrating how to use the Drag and Drop API API to implement Drag and Drop API functionality in the Page Builder:

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
  <div class="component" draggable="true">Text Components</div>
  <div class="component" draggable="true">Image Components</div>
  <div class="component" draggable="true">Button assembly</div>
</div>

<div id="page">
  <h1>My Page</h1>
</div>

<script>
  // Defining the drag source
  const draggableComponents = document.querySelectorAll(".component");
  draggableComponents.forEach((component) => {
    component.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.innerText);
    });
  });

  // Define placement target
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

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

These are the compatibility lists for the Drag and Drop API, including the major browsers and the minimum versions they support:

- Chrome 4+✅
- Firefox 3.5+✅
- Safari 3.1+✅
- Edge 12+✅
- Opera 12.1+✅
- IE 6+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1686123524367-71f47f1d-d3d9-473b-a45b-f4bdc8775a6e.png#averageHue=%23d7c4a8&clientId=ud5c4a3e9-4086-4&from=paste&height=761&id=Ju1RX&originHeight=761&originWidth=1456&originalType=binary&ratio=1&rotation=0&showTitle=false&size=141563&status=done&style=none&taskId=u99927160-21c5-4174-8868-c4c66eba711&title=&width=1456)

You can find details at [caniuse.com](https://caniuse.com/?search=Drag%20and%20Drop).

### 4.2 Pros and Cons

The Drag and Drop API API has the following advantages and disadvantages:
Pros:

- Provides intuitive and flexible Drag and Drop API functionality to improve user experience.
- Common interactive operations such as Drag and Drop API sorting and file uploading can be easily implemented.
- Provides a rich set of events and methods that allow developers to customize Drag and Drop API behavior.

Disadvantages:

- There may be compatibility issues in some older browsers.
- Drag and Drop API operations may be limited by devices, such as touch operations on mobile devices.
- Requires some learning cost and development time to understand and implement.

### 4.3 Tool Recommendations

1. [Sortable](https://github.com/SortableJS/Sortable): 27k⭐ Reorderable Drag and Drop API lists for modern browsers and touch devices. No jQuery or framework required.
2. [dragula](https://github.com/bevacqua/dragula): 21.6k⭐ 👌 Drag and drop so simple it hurts
3. [React DnD](https://github.com/react-dnd/react-dnd): 19.3k⭐ Drag and Drop for React.
4. [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable): 18.9k⭐ Vue component (Vue.js 2.0) or directive (Vue.js 1.0) allowing Drag and Drop API and synchronization with view model array.

## 🎯 5. Usage suggestions and considerations

- Understand the support of different browsers for Drag and Drop API APIs and handle compatibility well.
- Use existing Drag and Drop API libraries or frameworks to simplify the implementation of Drag and Drop API operations.
- Pay attention to performance issues, especially when dealing with a large number of Drag and Drop API elements.
- Consider touch operations on mobile devices to ensure usability and ease of use of Drag and Drop API functionality on mobile devices.
- Provide appropriate visual feedback and guidance to help users understand and use the Drag and Drop API functionality.

Follow these recommendations and considerations to better apply the Drag and Drop API API and provide a great Drag and Drop API experience for users.

## 🍭 6. Summary

This article mainly introduces the Drag and Drop API, we understand the role of this API and how to use it, in the article also through some common use examples and show you how to implement the code, and finally also give some suggestions and attention to the use, hope that you can better understand the Drag and Drop API, in the actual work can be used reasonably.

## 📚 7. Extensions

- [MDN Web - HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [HTML5 Rocks - Native HTML5 Drag and Drop](http://www.html5rocks.com/en/tutorials/dnd/basics/)
- [A List Apart - Beyond Drag and Drop](https://alistapart.com/article/beyonddraganddrop/)

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
