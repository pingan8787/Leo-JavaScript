Article review: <[How to select the Node.js Version](https://medium.com/@Chris1993/how-to-select-the-node-js-version-3a6ae31be18c)>

When our local development environment needs to install Node.js 8.0.0 and Node.js 17.0.0 at the same time, how to do it?

Next, I will share 3 tools for managing the Node.js version of the local environment.

## 1. nvm

⭐ *Github stars: 60K+*

[nvm](https://github.com/nvm-sh/nvm) allows you to quickly install and use different versions of node via the command line.

![](https://images.pingan8787.com/images/20220807/image1.png)
(Image from: [github](https://github.com/nvm-sh/nvm#additional-notes))

nvm can only be used in projects for macOS and Linux users. If you are Windows users, you can use [nvm-windows](https://github.com/coreybutler/nvm-windows), [nodist](https://github. com/marcelklehr/nodist) or [nvs](https://github.com/jasongin/nvs).

### Installation

macOS download method:

```bash
# Method 1 Browser open the following link to download
https://github.com/nvm-sh/nvm/blob/v0.39.1/install.sh
# After the download is complete, install it through the command
sh install.sh

# Method 2 ✅
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Method 3
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
````

If you encounter problems during the installation process, you can check the [nvm supplementary notes](https://github.com/nvm-sh/nvm#additional-notes).

### Common commands

```bash
nvm ls # view version install all versions
nvm ls-remote # View all remote Node.js versions
nvm install 17.0.0 # Install the specified Node.js version
nvm use 17.0.0 # use the specified Node.js version
nvm alias default 17.0.0 # Set the default Node.js version
nvm alias dev 17.0.0 # Set the alias of the specified version, for example, set the alias of version 17.0.0 to dev
````

**Example**:
```bash
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
````
Simple as that!

## 2. n

⭐ *Github stars: 16.7K+*

[n](https://github.com/tj/n) is an interactive Node.js version manager: no subshells, no profile setup, no convoluted API, just simple.

![](https://images.pingan8787.com/images/20220807/image3.gif)

`n` is supported on macOS, Linux, including with Windows Subsystem for Linux, and various other unix-like systems. It is written as a BASH script but does not require you to use BASH as your command shell.

### Installation

If you already have Node.js installed, an easy way to install `n` is using npm:

```bash
npm install n -g
````

[Third Party Installers](https://github.com/tj/n#third-party-installers)

### Common commands

```bash
n # show all downloaded versions
n 10.16.0 # Download the specified version
n lts # View all LTS Node.js versions remotely
n run 10.16.0 # run the specified Node.js version
````

Use the `n -h` command to read help information, there are these main commands:

```bash
  n Display downloaded Node.js versions and install selection
  n latest Install the latest Node.js release (downloading if necessary)
  n lts Install the latest LTS Node.js release (downloading if necessary)
  n <version> Install Node.js <version> (downloading if necessary)
  n install <version> Install Node.js <version> (downloading if necessary)
  n run <version> [args ...] Execute downloaded Node.js <version> with [args ...]
  n which <version> Output path for downloaded node <version>
  n exec <vers> <cmd> [args...] Execute command with modified PATH, so downloaded node <version> and npm first
  n rm <version ...> Remove the given downloaded version(s)
  n prune Remove all downloaded versions except the installed version
  n --latest Output the latest Node.js version available
  n --lts Output the latest LTS Node.js version available
  n ls Output downloaded versions
  n ls-remote [version] Output matching versions available for download
  n uninstall Remove the installed Node.js
````

## 3. fnm

⭐ *Github stars: 8.4K+*

[fnm](https://github.com/Schniz/fnm): 🚀 Fast and simple Node.js version manager, built in Rust

![](https://images.pingan8787.com/images/20220807/image4.png)
(Image from: [freecodecamp](https://www.freecodecamp.org/news/fnm-fast-node-manager/))

**Features include**:

🌎 Cross-platform support (macOS, Windows, Linux)

✨ Single file, easy installation, instant startup

🚀 Built with speed in mind

📂 Works with .node-version and .nvmrc files

### Installation

macOS / Linux environment:

```bash
# bash, zsh and fish shells
curl -fsSL https://fnm.vercel.app/install | bash
````

Windows environment:

```bash
# Open the terminal in administrator mode. After installation, it can only be opened in administrator mode.

choco install fnm

# After the installation is complete, you need to manually set the environment variables
````

Linux/macOS/Windows environments can also directly download binary files for installation, download address: [https://github.com/Schniz/fnm/releases](https://github.com/Schniz/fnm/releases)

### Common commands

```bash
fnm -h # View help
fnm install 17.0.0 # Install the specified Node.js version
fnm use 17.0.0 # use the specified Node.js version
fnm default 17.0.0 # Set the default Node.js version
````

If you have a better tool, please leave a message to share.

If this article helps you, please like and support it.👍

✨follow me： https://dev.to/chris1993