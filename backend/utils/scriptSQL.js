
export const sqlSignup = (uuid, email, name, last_name, password) => {
    return `INSERT INTO users  (uuid, email, name, last_name, password ) VALUES ( '${uuid}', '${email}', '${name}', '${last_name}', '${password}'`
};

export const sqlLogin = (email) => {
    return `SELECT * FROM users WHERE email = '${email}'`
};

export const sqlUpdateAccount = (email, name, last_name, password) => {
    return `UPDATE users SET email = '${email}', name = '${name}', last_name = '${last_name}', password = '${password}' WHERE uuid = '10419ce1-c1d3-564d-8ab3-9b08f0db622e'`
};

export const sqlDeleteAccount = () => {
    return `DELETE FROM users WHERE uuid = 'efe89ffa-c7d2-5143-b5c0-cea4bc0b6e0f'`
};


export const sqlCreatePublication = (picture, comment, user_id) => {
    return `INSERT INTO publications (picture, comment, user_id) VALUES ("${picture}", "${comment}", "${user_id}")`
};


export const sqlRealPublication = () => {
    return "SELECT * FROM publications LEFT JOIN users ON publications.user_id = users.uuid ORDER BY publication_date DESC"
};


export const sqlUpdatePublication = (picture, comment, publication_date, user_id, publication_id) => {
    return `UPDATE publications SET picture = "${picture}", comment = "${comment}" WHERE user_id = "${user_id}" and publication_id = "5"` // tester la sous requete
};


export const sqlDeletePublication = (user_id, publication_id) => {
    return `DELETE FROM publications WHERE publication_id = "1" and user_id = "${user_id}"`
};











