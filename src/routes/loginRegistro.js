const express = require("express");
const router = express.Router();
const passport = require("passport");

// Middleware para verificar se o usuário está logado
function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401); // Não autorizado
    }
}

// // Importa a configuração da estratégia do Google
// require('../AuthGoogleS');

// Rotas de autenticação do Google
// Inclui o escopo de solicitação de perfil e e-mail na autenticação inicial
router.get('/google', passport.authenticate('google'));

// Rota de callback do Google após a autenticação
// Direciona para rotas específicas em caso de sucesso ou falha
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure',
        successRedirect: '/auth/protected',
    }));

// Rota de falha no login
router.get("/google/failure", (req, res) => {
    // Aqui você pode redirecionar para uma página de falha personalizada se preferir
    res.render("login/login")
});

// Rota protegida, acessível apenas por usuários autenticados
router.get("/protected", isLoggedIn, (req, res) => {
    // Página ou conteúdo protegido
    res.redirect("/")
});

// Rota de logout
router.get("/logout", (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      // Destruir a sessão ou qualquer outra limpeza necessária
      req.session.destroy(() => {
          res.redirect("/login"); // Redireciona para a página de login após o logout
      });
    });
});

module.exports = router;