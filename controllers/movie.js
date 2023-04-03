const movieschema = require("../model/movie");
const { success, info, error } = require(`consola`);
const { movieAuthentification } = require("../helper/validator")

/*
@Access public
@http request post
@URL api/auth/movies
*/

//storing movie details in database

exports.postmovie = async (req, res) => {
    try {
        let { title, genere, releasedate } = req.body;
        await movieAuthentification.validateAsync(req.body);
        let payload = new movieschema({
            title,
            genere,
            releasedate,
            media: req.files,
        })
        let moviedata = await movieschema.create(payload);
        res.status(200).json({ message: " successfully movie data stored in database", moviedata });
    } catch (error) {
        error(err);
        res.status(501).json({ message: "sorry..your movie not stored in database" });
    }
};

exports.getAllMovie = async (req, res) => {
    try {
        let allmovie = await movieschema.find({});
        res.status(200).json({ message: "successfully get all movie data", allmovie })
    } catch (err) {
        error(err);
        res.staste(501).json({ message: "Sorry..somrthing error while getting movies" });
    }
};

exports.getmovie = async (req, res) => {
    try {
        let onemovie = await movieschema.findOne({ _id: req.params.id });
        res.staste(200).json({ message: "successfully get from database", onemovie });
    } catch (err) {
        res.status(501).json({ message: "Sorry..somrthing error while getting your movie" });
    }

};

exports.updatemovie = async (req, res) => {
    try {
        let updatingmovie = await movieschema.findByIdAndUpdate({ _id: req.params.id });
    } catch (err) {
        error(err);
        res.status(501).json({ message: "Sorry..somrthing error while updating your movie" });
    }


}


exports.deletemovie = async (req, res) => {
    try {
        await movieschema.findOne({ _id: req.params.id });
        res.staste(501).json({ message: "successfully movie deleted from database" });
    } catch (err) {
        error(err);
        res.status(500).json({ message: "Sorry..failed to delete your movie" });
    }
};

