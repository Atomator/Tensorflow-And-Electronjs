# ElectronJS as a GUI for TensorFlow (Python)

## Introduction

It is probably important that I start the README of this repo with a pseudo-disclaimer. This project was started with the hopes that through exploration of using these two programs together, that I would be able to understand how it all works, as I believe that experimenting is one of the best ways to learn. As such, I don't necessarily understand all of the code that is here, as it is a result of many hours of searching through Github and StackOverflow. That being said, I figured that I should at least write something in the README that helps to explain this application, and as such feel free to continue reading.

#### Why I am Using TensorFlow with Python and Not Just TensorFlow.js ####

While it undoubtedly makes sense that I could just use TensorFlow.js as it is meant to work with JavaScript, hence the name, I felt that I would be missing out on some features that are present in the Python version. The first problem is just raw preformace, TensorFlow can directly use a GPU and it is also uses a bunch of different tricks to make it incredibly fast. The other problem is that by using the JavaScript varient, I would be missing out on distributed TensorFlow, something that I would like to work with more in the future. While these are not "good" reasons persay, they were all that I needed to go forth an attempt to do something that not many people have done.

#### Why I am Using Electron.js ####

I don't have a great reason for using Electron.js if I am being honest, other than I am familiar with designing UIs in JavaScript, and rather than learning some new Python framwork to make a mediocre UI (the Python options honestly lookmlike garbage), I would rather work with something that I already know pretty well. Like I said, not a great reason.

## Setting Up the Example ##

On from the walls of text!


The code for this app is derived off of this code by [fyears](https://github.com/fyears/electron-python-example).
With that out of the way it also important that the basics of the app are discussed slightly. In order to run Python within the app, a module called [Zerorpc](https://www.zerorpc.io/) is used to create a Python server that is able to communicate with Node. The code for creating the Python server is in `pytensor/api.py`. The main.js server is used for getting the server up and running whether that is the execultable or just the .py file. When the application gets an input, it takes the value, and pushs it to the Python server which then creates an x by x tensor, converts it to a string, and passes it back.

There are two prerequisites for working with this example:
* Python3 (Python 2.7 works as well but the commands below must be changed)
  * Virtualenv (Once again, this app can be created with out it but the commands will need to be changed)
* NPM and Node

Both of these are used to create the node_modules folder, along with the Python execultable that allows for the Python process to run within the app.

To create all of the necessary items for this application run the following commands.
```
# Creates the node_modules folders with the required items
npm install

# Rebuilds Zeromq module that is used for communication between Python and Node
./node_modules/.bin/electron-rebuild

# Creates the folder for the virtual Python environment
python3 -m virtualenv env

# Sets the Python being used to the one in the folder
source env/bin/activate

# Installs the Python requirements
pip3 install -r pytensor/requirements.txt
```
Then to run the app
`./node_modules/.bin/electron .`

Make sure that the Python being used is the one in the `env` folder. If your not sure run `which python`. If the correct one is not outputted run `source env/bin/activate`.

In order to package the environment into a standalone application run this
```
# Builds the standalone Python executable then deletes the build files
pyinstaller pytensor/api.py -p env/lib/python3.6/site-packages --distpath pydist 
rm -rf build/
rm -rf api.spec

It is important to note that once the executable is created, the code will default to using it rather than the Python code. So if changes are made, make sure to delete the executable.

# Uses electron-packager to compile the app
./node_modules/.bin/electron-packager . --overwrite --ignore="pytensor$" --ignore="env"
```
