# electron-python-experiement

Run this code in order to initlize app. It installs the npm requirements as well as create the virtual env folder for the python environment

```
npm install && ./node_modules/.bin/electron-rebuild
python3 -m virtualenv env && source env/bin/activate && pip3 install -r pytensor/requirements.txt
```

Run the app
`./node_modules/.bin/electron .`

Run this code in order to create and package the application
```
pyinstaller pytensor/api.py --distpath pydist
rm -rf build/
rm -rf api.spec
./node_modules/.bin/electron-packager . --overwrite --ignore="pytensor$" --ignore="env"
```
