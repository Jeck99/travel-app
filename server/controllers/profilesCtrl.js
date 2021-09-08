const profileModel = require('../models/profile-model');
const registerLoginValidations = require('../validations/registerLoginValidations');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
/**
 * Add a new profile
 * @method POST
 * @route /profiles/register
 * @payload body.profile
 * @param {Request} req 
 * @param {Response} res 
 * @returns json HTTP Response
 */
async function register(req, res) {
    const { errors, isValid } = registerLoginValidations(req.body.profile);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    await profileModel.findOne({ email: req.body.profile.email }, (err, profile) => {
        if (err) throw err;
        if (profile) {
            return res.status(400).json({ email: "Email already exists" });
        }
        else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.profile.password, salt, (err, hash) => {
                    if (err) throw err;
                    req.body.profile.password = hash;
                    profileModel.insertMany(req.body.profile, (err) => {
                        if (err) {
                            return res.status(400).json({ success: false, error: err })
                        };
                        res.status(201).json({ success: true, message: `registered of ${req.body.profile.email} new profile` })
                    })
                });
            });
        }
    });
}
/**
 * Find an exist profile
 * @method POST
 * @route /profiles/login
 * @payload body.profile
 * @param {Request} req 
 * @param {Response} res 
 * @returns json HTTP Response with JWT
 */
async function login(req, res) {
    const { errors, isValid } = registerLoginValidations(req.body.profile, true);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { email, password } = req.body.profile;
    await profileModel.findOne({ email }, (err, profile) => {
        if (err) throw err;
        if (!profile) {
            return res.status(404).json({ emailNotFound: "Email not found" });
        }
        bcrypt.compare(password, profile.password, (err, isMatch) => {           
            if (isMatch) {                  
                const payload = {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email
                };
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
                    res.json({ success: true, token: "Bearer " + token, profile: { name: profile.name, email: profile.email } });
                });
            }
            else {
                return res.status(400).json({ passwordIncorrect: "Password incorrect" });
            }
        })
    });
}
module.exports =
{
    register,
    login
};
