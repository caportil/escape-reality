var Like = require('../models/index.js').Like;

var create = function(props, callback) {
  Like.build(props)
  .save()
  .then(function(like) {
    callback(like);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(query, callback) {
  Like.findAll(query).then(function(likes) {
    callback(likes);
  }).catch(function(err) {
    console.log(err);
  });
};

var update = function(query, callback) {
  Like.findOne(query).done(function(like) {
    // console.log('🍊  Found one like in db:', query);
    // console.log('LIKEEEEEEE:', like.like);
    if (like.like) {
      like.update({like: false});
    } else {
      like.update({like: true})
    }
    callback(like);
  });
};

var findOrCreate = function(query, callback) {
  Like.findOrCreate(query).done(function(likeInfo) {
    like = likeInfo[0];
    console.log('🍊  Found one like in db via findOrCreate:', like);
    if (like.like) {
      like.update({like: false});
    } else {
      like.update({like: true})
    }
    callback(like);
  });
};

exports.create = create;
exports.findAll = findAll;
exports.update = update;
exports.findOrCreate = findOrCreate;
