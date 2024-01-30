import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', async (req, res) => {
    res.render('login'); // Corregido: pasando el nombre de la vista correctamente
});

export default router;
