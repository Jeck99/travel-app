const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * 
 * @param {{}} Profile 
 * @returns 
 */
module.exports = function validateProfileData(profile, isLogin) {
  let errors = {};

  profile.email = isEmpty(profile.email) ? "" : profile.email;
  profile.password = isEmpty(profile.password) ? "" : profile.password;
  console.log(Validator.isEmpty(profile.email));

  if (Validator.isEmpty(profile.email)) {
    errors.email = "email field is required";
  }
  if (Validator.isEmpty(profile.password)) {
    errors.password = "password field is required";
  }
  if (!isLogin) {
    profile.firstName = isEmpty(profile.firstName) ? "" : profile.firstName;
    profile.lastName = isEmpty(profile.firstName) ? "" : profile.lastName;
    if (Validator.isEmpty(profile.firstName)) {
      errors.firstName = "first Name field is required";
    }
    if (Validator.isEmpty(profile.lastName)) {
      errors.lastName = "last Name field is required";
    }
    if (!Validator.isLength(profile.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(profile.password, profile.password2)) {
      errors.password2 = "Passwords must match";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};