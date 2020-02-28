![Cezame Banner](App/Assets/Images/cezame-cover.png "Cezame")

# Cézame  React Native project

## Requirements

Node 8 or greater is required. Development for iOS requires a Mac and Xcode 9 or up, and will target iOS 9 and up.

You also need to install the dependencies required by React Native:

- for [Android development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)
- for [iOS development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)

## Getting Started 

After cloning the repository, in your terminal, enter this in order to install the app dependencies.

```
    cd cezame 
```
```
    npm install 
```

### Run Metro before running Android or IOS App
```
    react-native start
```


You should be ready to run the app when you see this.

```
    Looking for JS files in $HOME/YourWorkingDirectory/Cezame
    Loading dependency graph, done.
```

### CHANGE NODE_MODULE
  ## react-native-imagepicker
     with props quality, crash app when to choose a video
     ```
     ISSUE:  https://github.com/react-native-community/react-native-image-picker/pull/1266/commits/03c3d11746da5bed2c268c495071912b04fcb797 
     ```


## JSON SERVER (FAKE API)

If you want to run the fake api, jsonserver's readme.md is in the api-jsonserver folder.

```
    cd  api-jsonserver
```

#### Install JSONServer

```
    npm install -g json-server
```

the datas are store in cezame.json, db.json can be use as an example to create another "db"

#### Start JSON Server

```
    json-server --watch cezame.json --port 3003
```

open your web browser and go to this url : [http://localhost:3003](http://localhost:3003) and you are ready to rock n roll.

Otherwise you can see more information on [JSON-Server here](https://github.com/typicode/json-server).

##### Big Thanks to Typicode :)


## About us

[DigitalCube](https://www.digitalcube.app) is a web and mobile agency based in Paris and Cergy, France.