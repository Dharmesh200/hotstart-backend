const jwt = require(`jsonwebtoken`);
const authschema = require(`../../model/Auth`);
const { JWT_SECRET } = require(`../../config/index`);



exports.Protected = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(res.status(401).json({ message: "Incorrect token or you are not authorized person" }));
    }

    try {
        let decoded = jwt.verify(token, JWT_SECRET);
        req.user = await authschema.findById(decoded.id);
        next();

    } catch (err) {
        return next(res.status(401).json({ message: "Incorrect token or you are not authorized person" }));

    }
};



exports.Authorize = (...roles) => {
    return (req, res, next) => {
        console.log(req);
        if (!roles.includes(req.user.role)) {
            return next(res.status(401).json({ message: `${req.user.role} is not authorized` })
            );
        }
        next();
    };
};