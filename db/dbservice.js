// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software
const errors = require('../defs/errors');

// MongoDB Service
const MongoClient = require('mongodb').MongoClient;

class DbService {
  constructor(collection) {
    this.collection = collection;

    openConnection().then(db => {
      db.collection(this.collection).ensureIndex({
        username: ''
      }, {unique: true}).then(() => db.close());
    }).catch(e => e);
  }

  queryAll(query = {}) {
    return new Promise((resolve, reject) => {
      openConnection().then(db => {
        db.collection(this.collection).find(query).toArray((error, result) => {
          db.close();
          if (error)
            throw error;
          console.info(this.tag, "Records fetched!");
          resolve(result);
        });
      }).catch(e => reject(e));
    });
  }

  queryOne(query = {}) {
    return new Promise((resolve, reject) => {
      openConnection().then(db => {
        db.collection(this.collection).findOne(query, (error, result) => {
          db.close();
          if (error)
            throw error;
          if (result === null)
            return reject(errors.NOT_FOUND)
          console.info(this.tag, "Record fetched!");
          resolve(result);
        });
      }).catch(e => reject(e));
    });
  }

  insert(record) {
    return new Promise((resolve, reject) => {
      openConnection().then(db => {
        db.collection(this.collection).insertOne(record, (error, result) => {
          db.close();
          if (error)
            return reject(this.checkError(error));
          console.info(this.tag, "Record inserted!");
          resolve(result.ops[0]);
        });
      });
    });
  }

  update(id, record) {
    return new Promise((resolve, reject) => {
      openConnection().then(db => {
        db.collection(this.collection).updateOne({
          _id: record.id
        }, record, (error, result) => {
          db.close();
          if (error)
            return reject(this.checkError(error));
          console.info(this.tag, "Record inserted!");
          resolve(result.ops[0]);
        });
      });
    });
  }

  delete(filter) {
    return new Promise((resolve, reject) => {
      openConnection().then(db => {
        db.collection(this.collection).deleteOne(filter, (error, result) => {
          db.close();
          if (error)
            return reject(this.checkError(error));
          if (result.deletedCount === 0)
            return reject(errors.NOT_FOUND)
          console.info(this.tag, "Record deleted!");
          resolve(true);
        });
      });
    });
  }

  // DANGER
  drop() {
    return new Promise((resolve, reject) => {
      openConnection().then(db => {
        db.collection(this.collection).drop((error, result) => {
          db.close();
          if (error)
            return reject(error);
          console.info(this.tag, "Collection Dropped!");
          resolve(result);
        });
      });
    });
  }

  checkError(error) {
    if (error.code === 11000)
      return errors.DUPLICATE_KEY;

    return errors.UNKNOWN_ERROR;
  }
}

// Private
const openConnection = () => {
  const url = `mongodb://localhost:27017/DbTodo`;
  return new Promise((resolve) => {
    MongoClient.connect(url, (err, db) => {
      if (err)
        throw err;

      resolve(db);
    });
  });
}

module.exports = DbService;

// const openConnection = (kioskId) => {
//   const url = `mongodb://localhost:27017/${kioskId}`;
//   return new Promise((resolve, reject) => {
//     MongoClient.connect(url, (err, db) => {
//       if (err)
//         throw err;
//       resolve(db);
//     });
//   });
// }
//
// const createDatabase = (kioskId) => {
//   return openConnection(kioskId).then(db => {
//     console.log("Database created!", kioskId);
//     db.close();
//   }).catch(err => console.error(err));
// }
//
// const dropCollection = (kioskId, collection) => {
//   return new Promise((resolve, reject) => {
//     openConnection(kioskId).then(db => {
//       db
//         .collection(collection)
//         .drop((err, res) => {
//           console.log("Collection dropped!", kioskId, collection);
//           resolve(res);
//           db.close();
//         });
//     });
//   });
// }
//
// const queryAll = (kioskId, collection, query = {}) => {
//   return new Promise((resolve, reject) => {
//     openConnection(kioskId).then(db => {
//       db
//         .collection(collection)
//         .find(query)
//         .toArray((err, res) => {
//           console.log("Records fetched!", kioskId, collection);
//           resolve(res);
//           db.close();
//         });
//     });
//   });
// }
//
// const insertMany = (kioskId, collection, records) => {
//   return new Promise((resolve, reject) => {
//     openConnection(kioskId).then(db => {
//       db
//         .collection(collection)
//         .drop((errDrop, resDrop) => {
//           db
//             .collection(collection)
//             .insertMany(records, (err, res) => {
//               if (err)
//                 console.info(err);
//               console.log("Records inserted!", kioskId, collection);
//               resolve();
//               db.close();
//             });
//         });
//     });
//   });
// }
// const insertOne = (kioskId, collection, record) => {
//   return new Promise((resolve, reject) => {
//     openConnection(kioskId).then(db => {
//       db
//         .collection(collection)
//         .insertOne(record, (err, res) => {
//           console.log("Record inserted!", kioskId, collection);
//           resolve();
//           db.close();
//         });
//     });
//   });
// }
//
// module.exports = {
//   createDatabase,
//   dropCollection,
//   insertOne,
//   insertMany,
//   queryAll
