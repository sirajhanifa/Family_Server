1. CREATE Documents
Used to insert data into the database.


| Method           | Description                                     | Example                                    |
| ---------------- | ----------------------------------------------- | ------------------------------------------ |
| `new Model()`    | Creates a new document instance (not saved yet) | `const user = new User({ name: "John" });` |
| `.save()`        | Saves a `new` document to DB                    | `user.save();`                             |
| `Model.create()` | Creates and saves in one step                   | `User.create({ name: "John" });`           |




 2. READ / FIND Documents
Used to fetch data.


| Method                        | Description                               | Example                                      |
| ----------------------------- | ----------------------------------------- | -------------------------------------------- |
| `Model.find()`                | Finds **all** documents matching criteria | `User.find({ age: 25 });`                    |
| `Model.findOne()`             | Finds **first** document that matches     | `User.findOne({ email: "john@gmail.com" });` |
| `Model.findById()`            | Finds document by `_id`                   | `User.findById("64d...123");`                |
| `Model.find().limit().sort()` | Used for pagination/sorting               | `User.find().limit(10).sort({ name: 1 })`    |





3. UPDATE Documents
Used to modify existing data.

| Method                      | Description                                    | Example                                                          |
| --------------------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| `Model.updateOne()`         | Updates first matching doc                     | `User.updateOne({ name: "John" }, { $set: { age: 30 } })`        |
| `Model.updateMany()`        | Updates all matching docs                      | `User.updateMany({ active: false }, { $set: { active: true } })` |
| `Model.findByIdAndUpdate()` | Updates by `_id`, returns old value by default | `User.findByIdAndUpdate(id, { name: "New Name" })`               |
| `Model.findOneAndUpdate()`  | Update and return matching doc                 | `User.findOneAndUpdate({ email: "abc@xyz.com" }, { age: 40 })`   |





4. DELETE Documents
Used to remove data.

| Method                      | Description                  | Example                                              |
| --------------------------- | ---------------------------- | ---------------------------------------------------- |
| `Model.deleteOne()`         | Deletes first matching doc   | `User.deleteOne({ name: "John" })`                   |
| `Model.deleteMany()`        | Deletes all matching docs    | `User.deleteMany({ age: { $lt: 18 } })`              |
| `Model.findByIdAndDelete()` | Deletes by `_id`             | `User.findByIdAndDelete("64d...123")`                |
| `Model.findOneAndDelete()`  | Deletes and returns document | `User.findOneAndDelete({ email: "john@gmail.com" })` |





5. COUNT & EXISTENCE
Used to check existence or count documents.

| Method                   | Description                 | Example                                    |
| ------------------------ | --------------------------- | ------------------------------------------ |
| `Model.countDocuments()` | Counts matching docs        | `User.countDocuments({ active: true })`    |
| `Model.exists()`         | Returns true/false-like doc | `User.exists({ email: "john@gmail.com" })` |
