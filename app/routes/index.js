'use strict';

var path = process.cwd();
var passport = require('passport');
var express = require('express');
var app = express.Router();


	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(function (req, res) {
			res.redirect('/build/index.html');
		})


	app.get('/info', function(req, res) {
		res.send(req.user)
	});
	
	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/',
            failureRedirect : '/'
        }));
        
		
module.exports = app;