"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contact_get = exports.about_get = exports.index_get = void 0;
const index_get = (req, res) => {
    res.render("index", {
        title: "Welcome!",
        user: req.user,
    });
};
exports.index_get = index_get;
const about_get = (req, res) => {
    res.render("about", {
        title: "About Me",
        user: req.user,
    });
};
exports.about_get = about_get;
const contact_get = (req, res) => {
    res.render("contact", {
        title: "Let's Connect",
        user: req.user,
    });
};
exports.contact_get = contact_get;
//# sourceMappingURL=indexController.js.map