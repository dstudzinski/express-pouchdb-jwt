# `express-pouchdb-jwt` example

Check `index.js` sourcecode for inline comments
  
## How to run 
  
```
npm install
npm start
```  

Now you can try to make (with e.g. Postman or from terminal) request to e.g. `localhost:3000/db`  
You should get `500 Internal Server Error` with `{"error":"JsonWebTokenError","reason":"jwt must be provided"}`  

Now add `Authorization` header with `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQ3R4Ijp7Im5hbWUiOiJ0ZXN0bmFtZSIsInJvbGVzIjpbXX19.dPAxDR1yzgp3vu38h87ZEZr3elesm-t0bEtzT3EFz_Q` as a value  
You should get `200 OK` with `{"express-pouchdb":"Welcome!","version":"2.1.4","vendor":{"name":"PouchDB authors","version":"2.1.4"},"uuid":"29d3979d-1d64-4b15-a2ea-eb3bc18b657a"}
` which means JWT Token was ok    

You can use [https://jwt.io/](https://jwt.io/) to encode/decode JWT Tokens.  
Example uses string: `secret` as a secret  
