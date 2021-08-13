
export const sqlSignup = (uuid, email, name, last_name, password, role, avatar) => {
    return `INSERT INTO users  (uuid, email, name, last_name, password, role, avatar ) VALUES ( "${uuid}", "${email}", "${name}", "${last_name}", "${password}", "${role}", "${avatar}")`
};

export const sqlLogin = (email) => {
    return `SELECT * FROM users WHERE email = '${email}'`
};

export const sqlUpdateAccount = (email, name, last_name, password, avatar,uuid) => {
    return `UPDATE users SET email = '${email}', name = '${name}', last_name = '${last_name}', password = '${password}', avatar = '${avatar}' WHERE uuid = '${uuid}'`
};

export const sqlGetAccount = (uuid) => {
    return `SELECT * FROM users WHERE uuid = '${uuid}'`
}

export const sqlallAccount = (uuid) => {
    return `SELECT * FROM users ORDER BY last_name`
}

export const sqlDeleteAccount = (uuid) => {
    return `DELETE FROM users WHERE uuid = "${uuid}"`
};


export const sqlCreatePublication = (picture, comment, user_id) => {
    return `INSERT INTO publications (picture, comment, user_id) VALUES ("${picture}", "${comment}", "${user_id}")`
};


export const sqlRealPublication = () => {
    return "SELECT * FROM publications LEFT JOIN users ON publications.user_id = users.uuid ORDER BY publication_date DESC"
};


export const sqlUpdatePublication = (picture, comment, user_id, publication_id) => {
    return `UPDATE publications SET picture = "${picture}", comment = "${comment}" WHERE user_id = "${user_id}" and publication_id = "5"` // tester la sous requete
};


export const sqlDeletePublication = (publication_id) => {
    return `DELETE FROM publications WHERE publication_id = "${publication_id}"`
};

export const sqlAuthToken = (uuid) => {
    return `SELECT uuid FROM users WHERE uuid = "${uuid}"`
};

export const sqlCreateLike = (publication_id, user_id, like_user_id) => {
    return `INSERT INTO likes (publication_id, user_id, like_user_id) VALUES ("${publication_id}", "${user_id}", "${like_user_id}")`
};

export const sqlDeleteLike = (publication_id, user_id) => {
    return `DELETE FROM likes WHERE publication_id = "${publication_id}" AND  user_id = "${user_id}"`
};

export const sqlGetLike = (publication_id) => {
    return `SELECT * FROM likes WHERE publication_id = "${publication_id}"`
};








