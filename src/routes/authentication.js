const express = require('express');
const router = express.Router();

const passport = require('passport');

// PORA RENDERIZAR FORMULARIO
router.get('/singup', (req, res) => {
    res.render('auth/singup');
});

// PARA RECIBIR LOS DATOS DEL FORMULARIO
router.post('/singup', passport.authenticate('local.singup', {
    successRedirect: '/profile',
    failureRedirect: '/singup',
    failureFlash: true
}));

router.get('/profile', (req, res) => {
    res.send('Este es mi profile')
});

module.exports = router;