
export const sqlSignup = (uuid, email, name, last_name, password, registration_date) => {
    return `INSERT INTO users  (uuid, email, name, last_name, password, registration_date ) VALUES ( '${uuid}', '${email}', '${name}', '${last_name}', '${password}', '${registration_date}')`
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


export const sqlCreatePublication = (picture, comment, publication_date, userId) => {
    return `INSERT INTO publications (picture, comment, publication_date, userId) VALUES ('${picture}', '${comment}', '${publication_date}', '${userId}')`
};






