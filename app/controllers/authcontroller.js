var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup.html");
};

exports.signin = function(req, res) {
  if (req.isAuthenticated()) {
    res.render("index.html");
  } else {
    res.render("signin.html");
  }
};

exports.dashboard = function(req, res) {
  if (req.isAuthenticated()) {
    res.render("index.html");
  } else {
    res.render("signin.html");
  }
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
