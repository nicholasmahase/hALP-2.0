var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

      failureRedirect: "/signup"
    })
  );

  app.get("/dashboard", authController.dashboard);

  app.get("/logout", authController.logout);

  //   app.post("/signin", function(req, res) {
  //     console.log(req.body);
  //     res.send("WORKED");
  //   });
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
