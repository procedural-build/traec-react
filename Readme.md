## Traec library

This is the traec core library which provide Javascript utilities and bindings for the Track API - which can be used to build supply-chain reporting applications rapidly on top of the Track | Procedural.build services.

### Use in a project

To use this library in your application simply do:

```
npm install --save traec
```

Then you should be good to go. When you need to make calls to the API for to GET or POST data then you may do it as follows:

```
import Traec from 'traec'

let fetch = new Traec.Fetch('company', 'list')
fetch.dispatch()
```

The traec library makes use of an Immutable Redux store. So you should attach a listener to the store to watch for the response data and perform some action when it has returned.

### Development

If you are developing the Traec library at the same time as another application then you should use a symbolic link to link the src folder to your `/<project>/lib` folder. Like this:

```
/traec-react$ npm install
/traec-react$ cd <your-project-folder>/lib
/<your-project-folder>/lib$ ln -s /traec/src ./traec-react
```

## Publishing to npm

From within this root folder run:

```
npm update traec
rm -rvf dist/*
docker run -it --rm -v "$PWD:/src" node:10.14-slim bash
npm login
npm run matchversion
npm run patchversion
npm run pub
```

or as a one-line command like this:

```
rm -rvf dist/* && docker run -it --rm -v "$PWD:/src" node:10.14-slim bash -c "cd /src/ && npm login && npm run matchversion && npm run patchversion && npm run pub"
```
