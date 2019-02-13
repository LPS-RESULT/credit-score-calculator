/**
 * MODEL DEFINITION
 * This is the declaration of the Model name and supposed schema in mongoose.
 *
 * @author ixi
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let schema = mongoose.Schema({
    username: {type: String, default: '', required: true}, //property name
    email: {type: String, default: '', required: true}, //management name
    hash: {type: String, default: '', required: true}
}, {
    // SCHEMA OPTIONS
    minimize: false,// Do not minimize the collection (by removing empty objects)
    strict: true,// Undeclared properties of the schema will not be saved
    autoIndex: true,// Turn off index events (happens at startup) that may impact performance
    // collection: "CollectionName", // Name of the underlying collection
    // shardKey: { tag: 1, name: 1 } // Sharding options for this schema
    timestamps: true // Add timestamps (createdAt and updatedAt)
});

let model = mongoose.model("User", schema, 'users');

// Export the model
module.exports = model;