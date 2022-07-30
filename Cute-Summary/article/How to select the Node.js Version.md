[Node.js](https://nodejs.org/) is a JavaScript runtime environment based on the [Chrome V8](https://v8.dev/) engine.

Nowadays, Node.js is used more and more, from server-side projects to development tool scripts, so it is necessary to have some basic knowledge of Node.js.

Today we will focus on the differences between LTS and Current in Node.js and how to choose the appropriate version.

## 1. What is the version of Node.js?

On the official website, you can see that Node.js has the LTS series and the Current series, which correspond to different latest versions.
![nodejs](https://images.pingan8787.com/images/20220730/nodejs1.png)
(photo via [Nodejs](https://nodejs.org/en/))

The naming of Node.js version numbers follows the ["Semantic Versioning"](https://semver.org/) rule, which specifies how versions are represented, how they are instrumentalized, how they are compared, and what different versions mean.

Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible API changes.
2. MINOR version when you add functionality in a backward compatible manner.
3. PATCH version when you make backward-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## 2. LTS Version

The full name of the LTS version is **Long Time Support**, which means **Long Time Support**. The core of the LTS version is to ensure stability and security. The large version number of each LTS version is **even**. Reduce unknown problems during development.

The LTS Version has a three-stage life cycle:

| **Life Cycle** | **Introduce** |
| - - | - - |
| Active | Each even-numbered version that enters the LTS from Current is actively maintained and upgraded for 18 months. |
| Maintenance | After the active phase reaches 18 months, there is a 12-month maintenance phase during which only bug fixes and security patches are made. |
| End of Life | After the maintenance period expires, the version enters the EOL phase and will not be maintained. In other words, each LTS version will be maintained for a maximum of 30 months, after which it will not be maintained. |

A version of the Life Cycle chart (2022–2025) :
![nodejs](https://images.pingan8787.com/images/20220730/nodejs2.png)
(photo via [Node. Js](https://nodejs.org/en/about/releases/))

## 3. Current Version

Current means the latest release, which is intended for feature development and API perfection, with a shorter lifetime and more frequent code updates.
You can experience the latest features in this release, as well as all sorts of unexpected problems and compatibility issues.

In general, Current releases a major version every 6 months (most of the time) :

- Release new Even versions every April;
- Release new Odd versions every October;

![nodejs releases](https://images.pingan8787.com/images/20220730/nodejs3.png)
(photo via : [Node. Js releases](https://nodejs.org/en/download/releases/))

Details version update records, you can view [Node.js releases](https://nodejs.org/en/download/releases/).

## 4. How to choose the right version?

- Use the **LTS** version

It is usually used in a production environment to ensure stability. It is recommended to use the **LTS** version.

- Use the **Current** version

Usually used for testing environments, if you want to try out new versions and features (such as new ECMAScript features), or be able to upgrade quickly and easily without disrupting the environment, it is recommended to use the **Current** version.

## 5. Conclusion

This article mainly introduces the differences between LTS and Current in Node.js and how to choose the appropriate version.

It is usually not necessary to update to the latest version. We can decide whether to upgrade according to the lowest Node.js version that the project technology stack depends on. If possible, it is recommended to upgrade at least the large version to the latest LTS version.
