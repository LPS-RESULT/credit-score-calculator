/**
 * USER SERVICE
 * This is the service for users
 *
 * @author ixi
 */
const model = require('./models/User');
const mongoose = require('mongoose');
const cryptojs = require('crypto-js');

mongoose.Promise = global.Promise; // set up mongoose to use the global Promise

function establishConnection() {
    return mongoose.connect('mongodb://localhost:27017/', {
        useMongoClient: true
    });
}


/**
 * Retrieves a user with a given id,
 * Returns a promise for a user
 * @param id - the _id of the user object
 * @returns {Promise<T>|Promise}
 */
exports.getUser = (id) => {
    return new Promise((resolve, reject) => {
        establishConnection().then((db) => {
            model.findById(id,
                (err, object) => {
                    db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(object);
                    }
                }
            );
        });

    });
};

/**
 * Creates a user, and returns a promise of
 * the created user
 * @param user - partial (or full) user object
 * @returns {Promise<T>|Promise}
 */
exports.createUser = (user) => {
    return new Promise((resolve, reject) => {
        establishConnection().then((db) => {
            user.hash = cryptojs.SHA3(user.password);
            delete user.password;
            model.create(user,
                (err, object) => {
                    db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(object);
                    }
                }
            );
        });

    });
};

/**
 * Updates a user object with matching id;
 * Returns a promise of the update response
 * @param id - the _id of the user object
 * @param user - partial (or full) user object
 * @returns {Promise<T>|Promise}
 */
exports.updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
        establishConnection().then((db) => {
            model.findByIdAndUpdate(id, user, {new: true},
                (err, object) => {
                    db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(object);
                    }
                }
            );
        });
    });
};

/**
 * Deletes a user given the id;
 * Returns a promise of the delete response
 * @param id - the _id of the user object
 * @returns {Promise<T>|Promise}
 */
exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        establishConnection().then((db) => {
            model.findByIdAndRemove(id,
                (err, object) => {
                    db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(object);
                    }
                }
            );
        });
    });
};

/**
 * Queries users given a search query;
 * Returns a promise of the result set
 * @param searchQuery - query string used to find matches
 * @param limit - number of items per page
 * @param offset - number of items to skip
 * @returns {Promise<T>|Promise}
 */
exports.getUsers = (searchQuery, limit, offset, sort) => {
    limit = Number.parseInt(limit);
    offset = Number.parseInt(offset);
    return new Promise((resolve, reject) => {
        establishConnection().then((db) => {
            let meta = { // the meta properties are added to the response
                limit: limit,
                offset: offset,
                q: searchQuery
            }; // create meta properties for this request
            let regex = new RegExp(searchQuery, 'ig');
            let query =
                searchQuery && searchQuery.trim().length ? // create a regex query to match the ff props
                    {
                        $or: ['username', 'email'].map((cur) => {
                            return {[cur]: regex};
                        })
                    } :
                    {};

            // let sort = createQuerySort(meta,opts);

            //let promisedQuery = model.find(query, {score: {$meta: 'textScore'}}) // set query options
            let promisedQuery = model.find(query).limit(meta.limit).// set pagination limit
            skip(meta.offset); //set how many items to skip

            if (sort.length > 0) {
                promisedQuery.sort(sort);
            }
            promisedQuery.exec();

            let promisedCount = model.count(query).exec();

            Promise.all([promisedCount, promisedQuery]).// execute both asynchronously
            then(([total, objects]) => { // when both responses are available
                meta.total = total; // set the total count into meta
                db.close();
                resolve({
                    meta: meta,
                    objects: objects
                });
            }, (error) => {
                db.close();
                reject(error);
            });
        });
    });
};