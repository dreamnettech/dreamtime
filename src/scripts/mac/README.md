## macOS Scripts

In this folder should go the scripts to install, compile and run the project in macOS.

### Running these scripts 
You will need to add execute permissions to each one of these scripts to run them. Do this for all scripts you want to run:

```bash
chmod +x build.sh
./build.sh
```
### Issues you may encounter

You will need to have python 3.6 installed because that is what the author uses. I had less issues after installing it.
Assuming you have homebrew installed, do this:

```bash
brew unlink python
brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/f2a764ef944b1080be64bd88dca9a1d80130c558/Formula/python.rb
```
----

Pytorch fails with `Library not loaded: /usr/local/opt/libomp/lib/libomp.dylib`

run

```bash
brew install libomp
```
----

You cannot build the electron app.

No idea yet, run the dev server or the CLI and it works.

---
Please do not hesitate to do a PR if you have a Mac and you can correct these files!

**⚠ Note:**

Torch in macOS does not support CUDA. If you want to obtain GPU processing compability you will have to compile [PyTorch](https://pytorch.org/) yourself.
