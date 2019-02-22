var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup");
};

exports.signin = function(req, res) {
  if (req.isAuthenticated()) {
    res.render("dashboard");
  } else {
    res.render("signin");
  }
};

exports.dashboard = function(req, res) {
  if (req.isAuthenticated()) {
    res.render("dashboard");
  } else {
    res.render("signin");
  }
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
