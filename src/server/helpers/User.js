const knex = require('../db/db');
const Playlist = require('./Playlist');
const Devices = require('./Devices');

const User = {};

User.getUser = user =>
  new Promise((resolve, reject) =>
    knex('usertest').where('id', user.id)
      .then((userData) => {
        if (userData.length > 0) resolve(userData[0]);
        else resolve(false);
      })
      .catch(err => reject(err)));

User.login = profile =>
  new Promise((resolve, reject) => {
    User.getUser(profile)
    .then((userData) => {
      if (userData) {
        resolve(profile);
      } else {
        const newUser = {
          id: profile.id,
          username: profile.username,
          profile_url: profile.profileUrl,
          // user_image: user.photos[0],
          sync: false,
        };
        knex('usertest').insert(newUser)
        .then(() => {
          console.log(`User ${profile.id} successfully added!`);
          resolve(profile);
        });
      }
    })
    .catch(err => reject(err));
  });

User.getFavoriteTracks = user =>
  new Promise((resolve, reject) => {
    knex('tracks')
    .join('favorites', 'tracks.track_id', '=', 'favorites.track')
    .where('favorites.user', user.id)
    .then(favs => resolve(favs))
    .catch(err => reject(err));
  });

User.addFavorite = (req, res) => {
  knex('favorites').insert({ user: req.user.id, track: req.body.track_id })
  .then(() => {
    User.getFavoriteTracks(req.user)
    .then(updatedFavs => res.send(updatedFavs))
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
};

User.removeFavorite = (req, res) => {
  knex('favorites')
  .where('user', req.user.id).andWhere('track', req.body.track_id)
  .del()
  .then(() => User.getFavoriteTracks(req.user))
  .then(updatedFavs => res.send(updatedFavs))
  .catch(err => console.log(err));
};

User.toggleSync = (req, res) => {
  User.getUser(req.user)
    .then((userData) => {
      if (userData.user_sync !== req.body.sync) {
        knex('usertest').where('id', req.user.id).update({
          sync: req.body.sync,
        })
        .then(() => res.send(req.body.sync));
        if (req.body.sync === true) {
          User.getFavoriteTracks(req.user)
            .then(favs => Playlist.sync(req.user, favs))
            .catch(err => console.log(err));
        }
      } else {
        res.send(req.body.sync);
      }
    });
};

User.info = (req, res) => {
  if (req.user) {
    Promise.all([
      User.getUser(req.user),
      User.getFavoriteTracks(req.user),
      Devices.getDevices(req.user),
    ])
    .then(([user, favs, devices]) => {
      const info = { sync: user.sync, favs, devices };
      res.send(info);
    })
    .catch(err => console.log(err));
  } else {
    res.status(403).send();
  }
};

User.all = (req, res) => {
  knex('user').select('*').then(data => res.send(data));
};

module.exports = User;
