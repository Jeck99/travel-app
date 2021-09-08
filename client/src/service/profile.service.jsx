const API = process.env.NODE_ENV === 'production' ? `https://test-meern-app.herokuapp.com/api` : 'http://localhost:8080/api';
/**
 * async function that updating the Profiles state
 * and returns the Profiles
 * * @returns {data:Profiles array,success:bool}
 */
export async function getAllProfiles() {
    try {
        return await fetch(`${API}/profiles`)
            .then((res) => { return res.json() })
            .then(results => { return results.data })
    } catch (error) {
        console.log(error);
    }

}
/**
 * async function that add a new Profile
 * and returns the Profile 
 * * @returns {data:Profiles array,success:bool}
 */
export async function registerProfile(profileToSave) {
    const options = {
        method: "POST",
        body: JSON.stringify({ profile: profileToSave }),
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        return await fetch(`${API}/profiles/register`, options)
            .then((res) => { return res.json() })
    } catch (error) {
        console.log(error);
    }
}
/**
 * async function that add a new Profile
 * and returns the Profile 
 * * @returns {data:Profiles array,success:bool}
 */
 export async function loginProfileApi(profileItem) {
    const options = {
        method: "POST",
        body: JSON.stringify({ profile: profileItem }),
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        return await fetch(`${API}/profiles/login`, options)
            .then((res) => { return res.json() })
    } catch (error) {
        console.log(error);
    }
}
/**
 * async function that add a new Profile
 * and returns the Profile 
 * * @returns {data:Profiles array,success:bool}
 */
export async function removeProfile(profileId) {
    const options = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    }
    try {
        return await fetch(`${API}/profiles/profile/${profileId}`, options)
            .then((res) => { return res.json() })
    } catch (error) {
        console.log(error);
    }
}