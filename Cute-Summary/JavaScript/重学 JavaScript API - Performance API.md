## 🏝 1. 什么是 Performance API

### 1.1 概念介绍

Performance API 提供了**访问和测量浏览器性能相关信息**的方法。通过 Performance API，开发人员可以获取关于**页面加载时间**、**资源加载性能**、**用户交互延迟**等方面的详细信息，以便进行性能分析和优化。

### 1.2 作用和使用场景

Performance API 的作用在于帮助开发人员定位和解决性能问题，优化网页加载速度和用户体验。它可以用于以下场景：

- **网页性能监测**

测量和分析页面加载时间、资源加载性能、关键渲染路径等指标，了解网页性能瓶颈。

- **性能优化**

识别潜在的性能问题，采取相应的优化措施，提高网页加载速度和响应性能。

- **用户体验分析**

通过测量用户交互延迟和动画性能，评估网页的用户体验质量。

- **性能基准测试**

比较不同版本或不同配置下的性能差异，评估性能改进效果。

## 🎨 2. 如何使用

Performance API 提供了一组方法和属性，用于获取和测量性能相关信息。以下是一些常用的使用示例：

- **获取页面加载时间**

```javascript
const loadTime =
  window.performance.timing.loadEventEnd -
  window.performance.timing.navigationStart;

console.log(`页面加载时间：${loadTime}ms`);
```

- **测量资源加载时间**

```javascript
const resourceTiming = window.performance.getEntriesByType("resource");
resourceTiming.forEach((resource) => {
  console.log(`${resource.name} 的加载时间：${resource.duration}ms`);
});
```

- **监测用户交互延迟**

```javascript
const interactionStart = Date.now();
document.addEventListener("click", () => {
  const interactionEnd = Date.now();
  const interactionDelay = interactionEnd - interactionStart;
  console.log(`用户点击延迟：${interactionDelay}ms`);
});
```

请注意，这些代码只是示例，实际使用时可能需要**根据具体需求和浏览器兼容性进行适当的处理和兼容性检测**。

## 🧭 3. 实际应用

Performance API 可以应用于许多场景和优化方案，下面是几个常见的示例：

### 3.1 网页加载时间监测和优化

通过 Performance API，我们可以监测页面的加载时间并进行优化。下面是一个示例代码，用于监测页面加载时间和资源加载时间：

```javascript
// 监测页面加载时间
const loadTime =
  window.performance.timing.loadEventEnd -
  window.performance.timing.navigationStart;

console.log(`页面加载时间：${loadTime}ms`);

// 监测资源加载时间
const resourceTiming = window.performance.getEntriesByType("resource");
resourceTiming.forEach((resource) => {
  console.log(`${resource.name} 的加载时间：${resource.duration}ms`);
});
```

通过获取 `window.performance.timing` 对象中的时间戳，我们可以计算出页面的加载时间。另外，通过 `window.performance.getEntriesByType('resource')` 方法，我们可以获取到所有资源的加载性能信息，进一步优化资源加载。

### 3.2 资源加载性能分析

对于网页中的关键资源，我们通常需要关注它们的加载时间，以便进行性能优化。
通过 Performance API，我们可以监测和分析关键资源的加载性能。下面是一个示例代码，用于监测指定关键资源的加载时间：

```javascript
// 监测关键资源的加载时间
const keyResources = [
  "https://example.com/css/style.css",
  "https://example.com/js/main.js",
];
keyResources.forEach((resource) => {
  const resourceEntry = window.performance.getEntriesByName(resource)[0];
  console.log(`${resource} 的加载时间：${resourceEntry.duration}ms`);
});
```

通过使用 `window.performance.getEntriesByName()` 方法，我们可以获取特定资源的加载性能信息，进而分析和优化关键资源的加载时间。

### 3.3 用户交互延迟监测

用户体验是网页开发中至关重要的因素之一。Performance API 可以帮助我们监测用户与网页的交互延迟，以便进行优化。下面是一个示例代码，用于监测用户点击延迟：

```javascript
// 监测用户点击延迟
const interactionStart = Date.now();
document.addEventListener("click", () => {
  const interactionEnd = Date.now();
  const interactionDelay = interactionEnd - interactionStart;
  console.log(`用户点击延迟：${interactionDelay}ms`);
});
```

通过记录用户交互的起始时间和结束时间，我们可以计算出用户点击的延迟时间，帮助我们评估和改善用户体验。

### 3.4 页面动画性能监测

在网页中使用动画可以增强用户体验，但不合理的动画实现可能导致性能问题。通过 Performance API，我们可以监测页面动画的性能，以便进行优化。下面是一个示例代码，用于监测动画执行时间：

```javascript
// 监测动画性能
function measureAnimationPerformance() {
  const animationStart = performance.now();
  // 执行动画操作
  requestAnimationFrame(() => {
    const animationEnd = performance.now();
    const animationDuration = animationEnd - animationStart;
    console.log(`动画执行时间：${animationDuration}ms`);
  });
}

measureAnimationPerformance();
```

在这个示例中，我们使用 `performance.now()` 方法获取动画的起始时间和结束时间，并计算出动画的执行时间。通过监测动画性能，我们可以判断动画是否流畅，是否占用过多的资源，从而进行优化和改进。

## 📋 4. 兼容性和优缺点

### 4.1 兼容性

以下是 Performance API 在不同浏览器上的兼容性情况：

- Chrome 6+ ✅
- Firefox 7+ ✅
- Safari 8+ ✅
- Edge 12+ ✅
- Internet Explorer: 部分支持，支持 IE 9+

建议在实际开发中，根据目标用户的浏览器使用情况进行兼容性测试，并根据需要提供备用方案或使用 polyfill 来填补兼容性差异。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1683790790592-e9c20410-6d51-4f2d-a4bb-43c67ad97d8b.png#averageHue=%23d9c8ae&clientId=uc899b73c-d249-4&from=paste&height=581&id=u2c913053&originHeight=581&originWidth=1431&originalType=binary&ratio=1&rotation=0&showTitle=false&size=78885&status=done&style=none&taskId=ue90ce6df-805c-4802-bff1-7286d767d44&title=&width=1431)

详细兼容性信息，请访问 [Can I use](https://caniuse.com/?search=Performance%20API)。

### 4.2 优缺点

Performance API 具有以下优点和缺点：

优点：

- 提供了**丰富的性能指标和测量方法**，能够全面评估网页的性能表现。
- 支持获取页面加载时间、资源加载性能、用户交互延迟等关键指标，帮助开发人员定位和解决性能问题。
- 能够进行性能优化和用户体验分析，**提高网页的加载速度和响应性能**。

缺点：

- 在某些情况下，获取性能指标可能会对网页性能产生一定影响，需要谨慎使用。
- 在一些旧版本的浏览器中可能不被支持，**需要进行兼容性处理或使用替代方案**。
- 部分指标的精确性可能受到浏览器实现和设备性能的限制，需要进行综合考虑和验证。

在使用时，需要结合实际需求和兼容性要求进行合理的使用和处理。

### 4.3 工具推荐

推荐几个基于 Performance API 封装的第三方库：

1. [Web Vitals](https://github.com/GoogleChrome/web-vitals)：6.1K⭐

一个用于测量和监控核心网页性能指标的库，基于 Performance API，包括 Largest Contentful Paint (LCP)、First Input Delay (FID)、Cumulative Layout Shift (CLS) 等指标。

2. [Perfume.js](https://github.com/Zizzamia/perfume.js)：2.8K⭐

一个小巧而强大的性能度量库，可用于监测页面加载时间、关键资源加载时间和用户交互延迟。

3. [PerformanceNow.js](https://github.com/myrne/performance-now)：100⭐

一个小巧的性能计时库，基于 Performance API 的高分辨率时间戳，提供更准确的性能测量功能。

这些库都是在 Performance API 的基础上进行封装和扩展，提供了更便捷的接口和功能，帮助开发者更好地监测和优化网页性能。我们可以根据具体需求选择适合的库来简化性能监测和分析的工作。

## 👍 5. 使用建议和注意事项

总结了几个 Performance API 的使用建议和注意事项：

1. 在测量性能时，应该选择合适的时机和目标，避免对页面性能造成额外的负担。
2. 注意兼容性问题，根据目标浏览器进行兼容性测试和处理，考虑使用 polyfill 或替代方案。
3. 结合其他工具和方法，如浏览器开发者工具、性能分析工具等，综合分析和优化网页的性能。
4. 了解不同指标的含义和解释，避免误解或错误地解读性能数据。
5. 使用性能数据进行有针对性的优化，优先解决影响用户体验的瓶颈。
6. 随着浏览器的更新和标准的发展，关注 Performance API 的最新变化和功能增强。

## 🍭 6. 总结

Performance API 是一个重要的 JavaScript API，用于访问和测量浏览器性能相关信息。它提供了丰富的性能指标和测量方法，帮助开发人员定位和解决性能问题，优化网页加载速度和用户体验。
通过 Performance API，可以获取页面加载时间、资源加载性能、用户交互延迟等关键指标，进行性能分析和优化。

## 🎯 7. 拓展学习

如果你对 Performance API 感兴趣，可以参考以下资料进行拓展学习：

- [MDN web docs - Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [Google Developers - Assessing Loading Performance in Real Life with Navigation and Resource Timing](https://developers.google.com/web/fundamentals/performance/navigation-and-resource-timing)

希望这篇文章对你理解和使用 Performance API 有所帮助。如有任何问题，请随时提问。
