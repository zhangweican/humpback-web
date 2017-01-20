const path = require('path');
const uuid = require('uuid');
const Datastore = require('nedb');
const config = require('./../config');

let db = new Datastore({
  filename: path.join(__dirname, `./../db/${config.systemConfigCollection}.db`),
  autoload: true
});

exports.get = (req, res, next) => {
  db.findOne({ ID: 1 }, (err, doc) => {
    if (err) return next(err);
    res.json(doc || {});
  });
}

exports.save = (req, res, next) => {
  let clientConfig = req.body;
  db.update({ ID: 1 }, clientConfig, { upsert: true }, (err, numReplaced, upsert) => {
    if (err) return next(err);
    res.send({
      result: true
    });
  });
}