Mock data is the use of virtual data instead of real data in development and testing environments. mock data prevents development and testing from failing due to unfinished back-end interfaces or data exceptions.

This article will introduce the common mock data solutions, including **writing manually**, **using third-party libraries** and **online mock data platform**. These solutions can help developers to better use mock data.

## 🎨 Writing mock data manually

**Writing mock data manually** is a relatively common mock data scheme. It has the advantage of **high flexibility** and can write mock data in any format according to actual needs. The disadvantage is that it is a lot of work\*\* to write each data item manually.
Code example:

```javascript
const mockData = {
  name: "Chris1993",
  age: 18,
  gender: "Male",
};
```

## 🏝 Using third-party libraries to generate mock data

Generating mock data using third-party libraries is a common mock data solution. The advantage is that it can generate various types of mock data quickly and easily. The following are a few open source libraries that are commonly used to generate mock data:

### 1. Mock.js （19.1k⭐）

Mock.js is a library for generating random data and intercepting Ajax requests, supporting both browser-side and Node.js-side use to quickly and easily generate various types of mock data.

> Homepage: [http://mockjs.com/](http://mockjs.com/)  
> Repository: [https://github.com/nuysoft/Mock](https://github.com/nuysoft/Mock)

![](https://files.mdnice.com/user/5763/28a9a26d-2d9f-4fcd-94c8-71da9380d47f.png)

Usage:

1. Install mock.js in the project:

```bash
$ npm install mockjs
```

2. Write mock data rules:

```javascript
// Use Mock
var Mock = require("mockjs");
var data = Mock.mock({
  // The value of the property list is an array of 1 to 10 elements
  "list|1-10": [
    {
      // The attribute id is a self-incrementing number that starts at 1 and is incremented by 1 each time
      "id|+1": 1,
    },
  ],
});
// Output
console.log(JSON.stringify(data, null, 4));
```

- Pros: Supports generating various types of data and can mimic the back-end interface by intercepting Ajax requests to return data.
- Cons: Need to learn the syntax rules of Mock.js.

### 2. faker.js （9.8k⭐）

faker.js is a library for generating random data, supporting the generation of various types of data, including names, addresses, phone numbers, emails, dates, numbers, and more.

> Homepage: [https://fakerjs.dev/](https://fakerjs.dev/)  
> Repository: [https://github.com/faker-js/faker](https://github.com/faker-js/faker)

![](https://files.mdnice.com/user/5763/a68cf0b5-76c8-4ef7-b143-7378574f6aae.png)

Usage:

1. Install faker.js in the project:

```bash
$ npm install --save-dev @faker-js/faker
```

2. Write the code to generate random data:

```javascript
// ESM
import { faker } from "@faker-js/faker";

// CJS
const { faker } = require("@faker-js/faker");

export function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
```

- Pros: Support generating various types of data and customizable data rules.
- Cons: The code to generate the data needs to be written manually.

### 3. Chance.js （6.2k⭐）

Chance.js is a library for generating random data, supporting the generation of various types of data, including strings, numbers, dates, boolean values, colors, addresses, and more.

> Homepage: [https://chancejs.com/](https://chancejs.com/)  
> Repository: [https://github.com/chancejs/chancejs](https://github.com/chancejs/chancejs)

![](https://files.mdnice.com/user/5763/6480a02a-67c3-44c8-b4df-dbbb5acd9193.png)

Usage:

1. Introduce chance.js in the HTML file:

```html
<script src="https://cdn.bootcdn.net/ajax/libs/chance/1.1.11/chance.min.js"></script>
```

2. Write the code to generate random data:

```javascript
const chance = new Chance();
const mockData = {
  name: chance.name(),
  age: chance.age(),
  gender: chance.gender(),
};
```

- Pros: Support generating various types of data and customizable data rules.
- Cons: The code to generate the data needs to be written manually.

### 4. axios-mock-adapter （3.2k⭐️）

axios-mock-adapter is an Axios adapter that does a good job of emulating the HTTP response of axios. We just need to configure the response data template and add it to axios as an axios response interceptor.

> Repository: [https://github.com/ctimmerm/axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter)

![](https://files.mdnice.com/user/5763/ba05b1cb-149c-4fcf-9646-c0fca49b9f3c.png)

Usage:

1. install axios-mock-adapter in the project:

```bash
$ npm install axios-mock-adapter --save-dev
```

2. Write the code to generate random data

```javascript
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/users").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});

axios.get("/users").then(function (response) {
  console.log(response.data);
});
```

Simulate GET requests with specific parameters:

```typescript
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock GET request to /users when param `searchText` is 'John'
// arguments for reply are (status, data, headers)
mock.onGet("/users", { params: { searchText: "John" } }).reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});

axios
  .get("/users", { params: { searchText: "John" } })
  .then(function (response) {
    console.log(response.data);
  });
```

### 5. json-schema-faker （3k⭐）

json-schema-faker is a library for generating mock data based on JSON Schema, supporting the generation of various types of data, including strings, numbers, dates, boolean values, objects, and more.

> Homepage: [https://json-schema-faker.js.org/](https://json-schema-faker.js.org/)  
> Repository: [https://github.com/json-schema-faker/json-schema-faker](https://github.com/json-schema-faker/json-schema-faker)

![](https://files.mdnice.com/user/5763/c7b4441b-fbbd-48d1-b281-c02c2d2d1e4d.png)

Usage:

1. Introduce json-schema-faker in the HTML file:

```html
<script src="https://cdn.bootcdn.net/ajax/libs/json-schema-faker/0.4.7/json-schema-faker.min.js"></script>
```

2. Write JSON Schema rules:

```javascript
const schema = {
  type: "object",
  properties: {
    name: { type: "string", faker: "name.findName" },
    age: { type: "integer", minimum: 18, maximum: 60 },
    gender: { type: "string", enum: ["Male", "Female"] },
  },
};
```

3. Generate mock data:

```javascript
const mockData = jsf.generate(schema);
```

- Pros: Support automatic generation of mock data based on JSON Schema, and customizable data rules.
- Cons: You need to learn the syntax rules of JSON Schema.

### 6. casual （3k⭐）

casual is a library for generating random data and supports generating various types of data, including strings, numbers, dates, boolean values, colors, addresses, and more.

> Repository: [https://github.com/boo1ean/casual](https://github.com/boo1ean/casual)

![](https://files.mdnice.com/user/5763/74dd90e1-daaa-4354-86e6-a9fd182579ff.png)

Usage:

1. Install casual in the project:

```bash
$ npm install casual
```

2. Write the code to generate random data:

```javascript
var casual = require("casual");

// Generate random sentence
// You don't need function call operator here
// because most of generators use properties mechanism
var sentence = casual.sentence;

// Generate random city name
var city = casual.city;

// Define custom generator
casual.define("point", function () {
  return {
    x: Math.random(),
    y: Math.random(),
  };
});

// Generate random point
var point = casual.point;

// And so on..
```

- Pros: Support generating various types of data and customizable data rules.
- Cons: The code to generate the data needs to be written manually.

## 🍭 Using the online mock data platform

Using the online mock data platform is a convenient and fast solution. Developers only need to define the rules of mock data on the platform, and then they can get mock data by calling the interface without writing any code.

Common online mock data platforms include Easy Mock, Mockoon, Mocky, MockServer, etc.

### 1. Easy Mock

Easy Mock is an open source, Node.js-based mock data platform that supports custom interfaces, custom data returns, interface proxies, and other features.

> Official Website: [https://easymock.org/](https://easymock.org/)

![](https://files.mdnice.com/user/5763/ff4d2b82-d282-4750-945e-74a25526d975.png)

Usage:

1. Register an account on the Easy Mock official website and create a project.
2. Create an interface in the project and define the request method, path, request parameters, response data and other information of the interface.
3. Get the mock data by calling the interface.

- Pros: Easy to use, support more custom functions, you can freely customize the mock data according to the actual needs.
- Cons: You need to build your own server and need some technical skills.

### 2. Mockoon

Mockoon is an open source, cross-platform mock data platform that supports custom interfaces, custom data returns, interface proxies, and other features.

> Official Website: [https://mockoon.com/](https://mockoon.com/)

![](https://files.mdnice.com/user/5763/c60d5b52-b37a-4c2d-a941-4719e9e474c6.png)

Usage:

1. Download and install the application from the Mockoon website.
2. Create a project in the application and define the request method, path, request parameters, response data, and other information for the interface.
3. Get the mock data by calling the interface.

- Pros: Easy to use, support more custom functions, cross-platform support.
- Cons: You need to install the application by yourself, can not be used directly in the browser.

### 3. Mocky

Mocky is an online mock data platform that supports custom interfaces, custom data returns, interface proxies, and other features.

> Official Website: [https://designer.mocky.io/](https://designer.mocky.io/)

![](https://files.mdnice.com/user/5763/a317bdde-d149-4661-8dc9-570f2f010168.png)

Usage:

1. Create an account on the Mocky official website and create a project.
2. Create an interface in the project and define the request method, path, request parameters, response data and other information of the interface.
3. Get the mock data by calling the interface.

- Pros: Easy to use, no need to build a server.
- Cons: The free version has limited features and the paid version is more expensive.

### 4. MockServer

MockServer is an open source, Java-based mock data platform that supports custom interfaces, custom data returns, interface proxies and other features.

> Official Website: [https://mock-server.com/](https://mock-server.com/)

![](https://files.mdnice.com/user/5763/112a4352-9b64-4814-8f08-a5e9b4278126.png)

Usage:

1. Download and install the application from the MockServer website.
2. Create a project in the application and define the request method, path, request parameters, response data and other information of the interface.
3. Get the mock data by calling the interface.

- Pros: Easy to use, support more custom functions, you can freely customize the mock data according to the actual needs.
- Cons: You need to build your own server and need some technical skills.

## 🎯 Summary

Mocking data is a very important task. Whether you write mock data manually, use third-party libraries or online mock data platforms, you need to choose the right solution according to the actual needs. In the development process, developers can choose different mock data solutions according to different situations to improve development efficiency and testing results.
