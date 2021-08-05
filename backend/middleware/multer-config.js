import multer from 'multer';

const MIME_TYPES = { // dictionaire d'extension 
    'image/jpeg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({ // on dit a multer d'enregistrer sur le disque
    destination: (req, file, callback) => { // on lui dit dans quel dossier enregistrer grace a cette fonction
        callback(null, 'pictures')
    },
    filename: (req, file, callback) => { // explique a multer quel nom de fichier utiliser (pour pas avoir de probleme au niveau des nom)
        const name = file.originalname.split(' ').join('_'); // on créé le nom du fichier en utilisant le nom de fichier de base + on remplace les espaces par "_"
        const extension = MIME_TYPES[file.mimetype]; // on applique l'extensiuon qui correcpond au minetype 
        callback(null, name + Date.now() + '.' + extension); // on assemble le nom complet du fichier avec le nom de base + une date presise (miliseconde pret) + l'extension
    }
});

module.exports = multer({ storage }).single('pictures'); // on prend l'objet et on dit que c'est un fichier unique "single" et on lui dit que c'est un fichier image