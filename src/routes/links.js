const express = require('express');
const router = express.Router();

const pool = require('../database');

// RUTA QUE ENVIA A LA VENTANA PARA AGREGAR LINKS
router.get('/add', (req, res) => {
    res.render('links/add');
});

// RUTA PARA AGREGAR UN NUEVO LINK
router.post('/add', async (req, res) => {
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query(`INSERT INTO links SET ?`, [newLink]);
    req.flash('success', 'Link guardado correctamente');
    res.redirect('/links');
});

// RUTA PARA LISTAR TODOS LOS LINKS INSERTADOS
router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', {links: links[0]});
});

// RUTA PARA ELIMINAR LINK POR ID
router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?',[id]);
    req.flash('success', 'Link eliminado satisfactoriamente');
    res.redirect('/links');
});

// RUTA PARA MOSTRAR LA VENTANA CON LOS DATOS DE UNA ID Y LUEGO EDITAR
router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0][0]});
});

// RUTA PARA EDITAR LINK CON LOS DATOS NUEVOS QUE SE PONGA
router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link editado satisfactoriamente');
    res.redirect('/links');
});

module.exports = router;