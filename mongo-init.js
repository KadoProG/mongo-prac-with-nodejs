db = db.getSiblingDB("admin");
db.createUser({
  user: "myuser", // env MONGO_USER
  pwd: "mypassword", // env MONGO_PASSWORD
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "dbAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" },
  ],
});

db = db.getSiblingDB("mydatabase");
db.createCollection("mycollection");
db.mycollection.insertMany([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
]);
