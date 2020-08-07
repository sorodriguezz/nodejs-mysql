const express = require('express');
const router = express.Router();

const passport = require('passport');

// PORA RENDERIZAR FORMULARIO
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

// PARA RECIBIR LOS DATOS DEL FORMULARIO
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', (req, res) => {
    res.send('Este es mi profile');
});

module.exports = router;