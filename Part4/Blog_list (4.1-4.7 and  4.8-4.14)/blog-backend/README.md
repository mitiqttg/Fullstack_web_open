Make sure you have `.env` file at the root of the backend folder with the following content:
```
MONGODB_URI = mongodb+srv://fullstack:yourclusterPWhere@cluster0.abcdxyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 

PORT = 333

TEST_MONGODB_URI = mongodb+srv://fullstack:yourclusterPWhere@cluster0.abcdxyz.mongodb.net/testBlogApp?retryWrites=true&w=majority&appName=Cluster0
```

Delete node_modules folder. In the terminal, run `npm install`, then `npm run dev` to start the server


Make sure the configuration in `package.json` has the following setup:
```
    -----NOT-WINDOWS-----
    "start": "NODE_ENV=production node index.js",
    "test": "NODE_ENV=test node --test",
    "dev": "NODE_ENV=development nodemon index.js",
    "lint": "eslint ."
```

```
    ----WINDOWS----
    ....
    "start": "cross-env NODE_ENV=production node index.js",
    "test": "cross-env NODE_ENV=test node --test",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "lint": "eslint ."
    ...
```


***NOTE***
- `npm run dev` may caught in an error "... your IP address is not in our white list", check if you validate the current IP of your network in MongoDB cluster.