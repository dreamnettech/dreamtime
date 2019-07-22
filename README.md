![](assets/dream-time.png)

# DreamTime

DreamTime allows you to use the power of your CPU or GPU to transform photos that give you free entertainment, something that in the past you could only dream...

DreamTime offers a version in CLI (Command Line Interface) and one in GUI (Graphical User Interface):

- The CLI version allows you to transform photos using commands, with this you can create automated systems such as _bots, web pages or even a new GUI_. Use the argument `--help` to get more information about usage, keep in mind that the CLI by itself **does not have** a cropping system so you will have to manually resize your photos to 512x512

- The GUI version is a new friendly interface that includes a cropping system, so you only have to tell the program which photo you want to transform and you will get results in a few clicks.

## Community

Join the community of people who use the project either for entertainment or development purposes, you can get valuable help or create interesting discussions to improve the future of DreamTime:

- [Discord](http://bit.ly/32nnbdb)

## Support

Developing an application like DreamTime takes time! Any help is welcome:

- **If you have extra \$\$\$:** Consider 💖[Become a patron](https://www.patreon.com/deepmanyy). Support economically the project monthly and obtain exclusive benefits.
- **If you are a developer:** Consider making a fork of the project and make PR of any improvement you can do, also join our server in [Discord](https://discord.gg/RjBSaND) where we have channels exclusively for development.

## Source Code

The source code of DreamTime will always remain open and you can always download it for free!

- [GitHub](https://github.com/private-dreamnet/dreamtime)
- [NotABug](https://notabug.org/DreamNet/DreamTime)
- [GitGud](https://gitgud.io/dreamnet/dreamtime)

Remember that you can follow the project or make a fork and create your own version! Read the [LICENSE](https://github.com/private-dreamnet/dreamtime/blob/master/LICENSE.md) for more information.

# Alpha

![](https://i.imgur.com/LZo61bq.jpg)

We have had great progress during the last week in alpha, however from time to time users have reported problems in very specific conditions that we still do not understand.

Join the Discord server for help.

---

# 💜 Binaries

![](https://i.imgur.com/kro3wkP.png)

## Requirements

- 64 bits OS
- Windows 10 1803+
- Windows 8
- Windows 7 SP1
- Ubuntu 16.04+
- **8 GB** of RAM or more.

> ⚠ **N versions of Windows 10** require installing the [Media Feature Pack](https://www.microsoft.com/en-us/software-download/mediafeaturepack).

## GPU Processing Requirements

> 👉 If you do not have an NVIDIA or compatible graphics card you can use CPU processing.

- NVIDIA Graphics card with CUDA compatibility
- [Latest NVIDIA drivers](https://www.nvidia.com/Download/index.aspx)

## Download

Download DreamTime is very easy! 2 files and you are ready. _(Get ready to download ~3GB)_

- [CLI & GUI](http://bit.ly/2YYeAvb): The command line interface (CLI) and the graphical user interface (GUI), here you will find everything you need, just download the .zip file that fits your operating system.
- 👉 [Checkpoints](http://bit.ly/2JBP88o): This is the information that the transformation algorithm **requires**, if you do not have this file the application will not work. You only need to download it once, if you update DreamTime use this same file for checkpoints. (unless we tell you otherwise)

## Download Mirrors

- [CLI & GUI (Github)](https://github.com/private-dreamnet/dreamtime/releases)
- [CLI & GUI (MEGA)](http://bit.ly/2YQAEI1)
- [CLI & GUI (MediaFire)](http://bit.ly/2YQAHnb)
- [Checkpoints (MEGA)](http://bit.ly/30GiSbh)
- [Checkpoints (MediaFire)](http://bit.ly/2Y0V6sO)
- [Checkpoints (Magnet Link)](magnet:?xt=urn:btih:ece03d9f696b340aee23ff07fb0bc44b1dd34b65&dn=checkpoints.zip)

## Installation

- Create a folder on your computer, it can be anywhere you want it, call it `DreamTime` and inside it place the 2 zip files you have downloaded.
- Extract the file that contains the CLI and the GUI, this should generate 2 folders: one called `cli` and another one called `gui`
- Extract the other file `checkpoints.zip` and move the extracted folder `checkpoints` inside `cli`.
- Ready! Now you can run `gui/DreamTime.exe` and transform all the photos you want. If you want to use the command line interface run the `cli/cli.exe` file from a console.

> ℹ When you update DreamTime it will only be necessary to download the file that contains the `CLI & GUI`, you can reuse the checkpoints (unless we tell you otherwise)

## F.A.Q.

**Q: Why does the program ask for firewall permissions?**

A: For now the GUI needs to create a local server on your computer to render the interface of the program, basically the GUI is a web browser. Yes I am aware that this method is "retarded" but it is temporary. No, it's not a virus, a botnet or anything like that, I'm not interested in your photos or your files.

**Q: When I open the program, only a white page appears!**

A: This can be caused by some program that interrupts the connection between the GUI and the interface server (see the question above), a VPN, Firewall or Antivirus can be the reason.

---

# About the Author

I am a web developer who found this application interesting and I could not resist making it as accessible as possible to the world.

I know that the project is not ethical and can generate unwanted results for many people, but the truth is that I am a lover of black humor, satire and I believe that anyone can do what they want, not all are equal and there will be people who give them a private or important use to this project.

I suggest everyone use DreamTime only for private entertainment purposes, I advise against using it with malicious motives such as hurting people as this will also hurt the community interested in developing this project more thoroughly.

The source code of this project must be open and free forever.

Email: `deepmanyy[at]msgsafe.io`

4chan: `!!ZOXIOrD0Ory`

Discord: `DeepManYY#5508`

---

# 💻 Development > 🚧 Area only for developers!

## Requirements

- [CUDA 10.0](https://developer.nvidia.com/cuda-10.0-download-archive)
- [Python 3.6.2+](https://www.python.org/downloads/release/python-368/)
- [NodeJS 10+](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)

## What should I know?

- [Python](https://www.codecademy.com/catalog/language/python): For the development of the CLI, the transformation algorithm and the neural network.
- [HTML & CSS](https://www.codecademy.com/catalog/language/html-css), [JavaScript](https://www.codecademy.com/catalog/language/javascript): For website development (The GUI is a website 😮)
- [VueJS](https://vuejs.org/), [NuxtJS](https://nuxtjs.org/): The frameworks that have been used to build the GUI. _(VueJS is the best #changemymind)_
- [Electron](https://electronjs.org/): The software used to "transform" the GUI from a website to a desktop program.

## Setup

> All the source code is inside the src/ folder, from now on all the instructions will be based on this folder.

### Quick Setup

Inside the folder `scripts/` you will find folders for the different supported operating systems, within each folder there is a series of scripts that will allow you to prepare the project for its development.

- **setup**: This script will install all the necessary requirements for Python and NodeJS. In theory you only need to run this script once per version.
- **build**: This script will compile the project in the `dist/` folder (generate the binaries for CLI and GUI), once finished you can compress the `dist/` folder and share it with the world.
- **dev-start**: This script will launch 2 processes, one to start the NuxtJS server (which will compile all the CSS, JavaScript and Vue files) and other that will start Electron that will load the NuxtJS server. Any change you make in `gui/` will be reflected in real time.

> ⚠ If you use [Anaconda](https://www.anaconda.com/) or some other program that encapsulates Python or NodeJS in their own development environment it is very likely that these scripts fail, you will have to read the content and execute the commands manually.

> ⚠ The NuxtJS server incorporates an HTTP server to view the live application in a web browser, **you must not access the web address indicated by the console**, the application only works when it is opened from Electron.

> 👉 The scripts for **macOS** are the same as those for Linux. [More information](src/scripts/mac/README.md).
