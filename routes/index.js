var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');


router.get('/app', function (req, res, next) {
  const login_token = req.query.login_token;

  res.oidc.login({
    returnTo: '/profile',
    authorizationParams: {
      redirect_uri: 'http://localhost:3000/callback',
      login_token,
    },
  })
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
