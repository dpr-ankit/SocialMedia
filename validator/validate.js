exports.postValidator = (req, res, next) => {
    req.check("title", "Please provide some title!").notEmpty();
    req.check("title", "Title must be from 4 to 150 chars!").isLength({
        min: 4,
        max: 150
    });
    req.check("body", "Please provide some Body!").notEmpty();
    req.check("body", "Body must be from 4 to 150 chars!").isLength({
        min: 4,
        max: 150
    });
    const errors = req.validationErrors();
    if(errors) {
        const firsterr = errors.map(error => error.msg)[0];
        return res.json({error: firsterr});
    }
    next();
};
exports.userValidator = (req, res, next) => {
    req.check("name", "name is Required").notEmpty();
    req.check("email", "email must be between 7 to 40 characters!")
        .isLength({
            min: 8,
            max: 40
        })
        .matches(/.+\@.+\..+/)
        .withMessage("Email must have @");
    req.check("password", "Password should not be empty!").notEmpty();
    req.check("password", "Password must be between 6 to 20 characters!")
        .isLength({
            min: 8,
            max: 40
        })
    .matches(/\d/)
    .withMessage("Password must have number!");

    const errors = req.validationErrors();
    if(errors) {
        const firsterr = errors.map(error => error.msg)[0];
        return res.json({error: firsterr});
    }
    next();
}