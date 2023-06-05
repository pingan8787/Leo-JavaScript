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

In this article, we will share the concept, usage, practical application, compatibility, advantages and disadvantages of Geolocation API to help you better understand and apply this interesting API.

## 🏝 1. What is Geolocation API

### 1.1 Introduction

The [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) is a JavaScript API provided by the browser to obtain the geolocation information of the device. Through this API, developers can obtain data related to the longitude, latitude, altitude, speed and direction of the user's device, as well as detailed location information such as the user's country, city, and street address.

### 1.2 Use Case

Geolocation API can be widely used in various scenarios, such as

- **Personalized geolocation services**
  provide personalized services based on users' geolocation information, such as locating nearby stores, restaurants or attractions, etc.
- **Geolocation data statistics**
  Collect user geolocation data, conduct data analysis and statistics, and use it for market research, user behavior analysis, etc.
- **Route planning and navigation**
  Use geolocation information for route planning and navigation based on the user's starting and ending locations.
- **Social media sharing**
  Combine users' geolocation information with social media to achieve location sharing, check-in and other functions.

## 🎨 2. How to use the Geolocation API

To use the Geolocation API, you need to follow these steps to set up and call it:

### 2.1 Getting the user's geolocation permission

To request the user's geolocation permission in the browser, you can use the `getCurrentPosition()` method of the `navigator.geolocation` object.

```javascript
navigator.geolocation.getCurrentPosition(
  successCallback,
  errorCallback,
  options
);
```

### 2.2 Handling success callback function

The `successCallback` function is called when the geolocation information is successfully retrieved, and the geolocation information is passed to it as an argument.

```javascript
function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // Handling geolocation information
}
```

### 2.3 Handling error callback functions

If obtaining geolocation information fails or the user refuses to provide location permissions, the `errorCallback` function is called and handled according to the error type.

```javascript
function errorCallback(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // Processing logic for users who refuse to provide location permissions
      break;
    case error.POSITION_UNAVAILABLE:
      // Processing logic for not being able to get location information
      break;
    case error.TIMEOUT:
      // Processing logic for getting location information timeout
      break;
    default:
      // Other error handling logic
      break;
  }
}
```

## 🧭 3. Examples

The Geolocation API can be used in many real-world scenarios. The following are some example applications:

### 3.1 Location Service Applications

With the Geolocation API, we can develop location service applications to help users find nearby businesses, attractions, hospitals, and so on. You can use the acquired latitude and longitude information combined with the map service API to implement location tagging, route navigation and other functions.

```javascript
navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Combine latitude and longitude information with map service APIs to implement location service applications
  },
  function (error) {
    // Handling error situations
  }
);
```

### 3.2 Weather Forecast Application

The following example shows how to use the Geolocation API in combination with a third-party weather API to get the weather information of the user's current location.

```javascript
// Get the user's location using the Geolocation API
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;

    // Call the weather API to get weather information using the obtained latitude and longitude
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${latitude},${longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Processing the acquired weather data
        const { temp_c, condition } = data.current;
        console.log(`Current temperature:${temp_c}°C`);
        console.log(`Weather conditions:${condition.text}`);
      })
      .catch((error) => {
        console.error("Failed to get weather information:", error);
      });
  },
  (error) => {
    console.error("Failed to obtain location information:", error);
  }
);
```

In this example, we use the Geolocation API to get the user's latitude and longitude information, and then use the latitude and longitude to call the Weather API (WeatherAPI is used here) to get the weather information. You need to replace `YOUR_API_KEY` in the example with your own weather API key.

### 3.3 Social Media Location Sharing

The following example shows how to use the Geolocation API to get the user's geolocation and combine it with social media sharing capabilities.

```javascript
// Get user's location using Geolocation API
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;

    // Add location information to social media shares after acquiring the user's location
    const shareButton = document.getElementById("shareButton");
    shareButton.addEventListener("click", () => {
      const message = "I am here!";
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const shareText = `${message} 查看我的位置：${url}`;

      // Invoke social media sharing capabilities
      navigator.share({ title: "Share Location", text: shareText, url });
    });
  },
  (error) => {
    console.error("Failed to obtain location information:", error);
  }
);
```

In this example, we use the Geolocation API to get the user's latitude and longitude information and add a share button to the page. When the user clicks the share button, we construct a share text with the user's location information and call the browser's `navigator.share()` method to trigger a social media share.

Note that the `navigator.share()` method requires that the browser supports the `Web Share API` and that the user must authorize the sharing feature in the browser.
With this example, we can provide users with an easy way to share their location information, such as by making a post on social media that includes a geolocation, or by sharing their current location with friends.

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

These are the minimum versions of major browsers supported by the Geolocation API:

- Chrome 5+✅
- Firefox 3.5+✅
- Safari 5+✅
- Edge 12+✅
- Opera 11.5+✅
- Internet Explorer 9+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1684412906503-0063264b-b3d1-4f8b-a6ff-60466dcf92e8.png#averageHue=%23d2c2a7&clientId=uf2fdd9c3-242e-4&from=paste&height=641&id=u2292d3de&originHeight=641&originWidth=1461&originalType=binary&ratio=1&rotation=0&showTitle=false&size=92692&status=done&style=none&taskId=ueb650098-c4ae-4ee7-b4ab-30c6ab0de1c&title=&width=1461)

You can find details at [caniuse.com](https://caniuse.com/?search=Geolocation%20API%20).

### 4.2 Pros and Cons

The Geolocation API has the following advantages:

- **Easy to use**

The Geolocation API provides a simple and intuitive way to make it easy to get geolocation information.

- **Widely Supported**

The Geolocation API is supported by almost all major browsers, allowing developers to use the API across multiple platforms.

- **Real-time**

Geolocation API can provide real-time geolocation information to help developers implement features such as real-time positioning and navigation.

However, the Geolocation API also has some disadvantages:

- **Requires user authorization**.

Geolocation API requires explicit authorization from the user to obtain geolocation information due to the privacy information of the user.

- **Accuracy limitation**

The accuracy of geolocation information is affected by various factors, such as device type, network conditions and user settings.

### 4.3 Tool Recommendations

A few commonly used tools are recommended:

1. [Leaflet](https://github.com/Leaflet/Leaflet)：37.6k⭐, 🍃 JavaScript library for mobile-friendly interactive maps.
2. [OpenLayers](https://github.com/openlayers/openlayers)：10k⭐A high-performance, feature-rich JavaScript map library that supports a variety of map sources and interactive features.
3. [Mapbox](https://github.com/mapbox/mapbox-gl-js) ：9.9k⭐,Interactive, thoroughly customizable maps in the browser, powered by vector tiles and WebGL.
4. [Turf.js](https://github.com/Turfjs/turf)：8k⭐,A modular geospatial engine written in JavaScript.
5. [Geolib](https://github.com/manuelbieh/geolib) ：4k⭐,Zero dependency library to provide some basic geo functions.

## 🎯 5. Usage suggestions and considerations

When using the Geolocation API, you should be aware of the following points:

- **Prompt the user**

Before getting the geolocation information, you should explain to the user the purpose of getting the location information and get the explicit authorization from the user.

- **Handle error situations**

You should reasonably handle possible error situations, such as users refusing to provide location permissions, timeouts for obtaining location information, etc.

- **Consider Accuracy Limitations**

Since the accuracy of geolocation information is affected by a variety of factors, developers should consider accuracy limits when designing applications and handle them appropriately.

- **Protect user privacy**

Developers should handle users' geolocation information appropriately and comply with relevant privacy protection laws and policies.

## 🍭 6. Summary

Through this article, we have learned about the concept, usage and practical applications of Geolocation API, which provides a simple and powerful way to obtain geolocation information of a device and offers many interesting application scenarios for developers. However, we also need to be aware of the limitations of user privacy and accuracy of geolocation information, and comply with related laws and policies during use.

We hope this article has helped you understand and apply the Geolocation API!

## 📚 7. Extensions

- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) - The Geolocation API documentation, provided by the Mozilla Developer Network (MDN), contains detailed references and examples.
- [Using the Geolocation API](https://developers.google.com/web/fundamentals/native-hardware/user-location) - A guide on using the Geolocation API on the Google Developers website provides more examples and tips for practical applications.

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
