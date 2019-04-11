# electron-python-experiement

Run this code in order to initlize app. It install the npm requirements as well as create the virtual env folder for the python environment

```
npm install
python3 -m virtualenv env && source env/bin/activate && pip install -r pytensor/requirements.txt
```

Run this code in order to create and package the application
```
pyinstaller pytensor/api.py --distpath pydist
electron-packager . --overwrite --ignore="pytensor$" --ignore="env"
```
