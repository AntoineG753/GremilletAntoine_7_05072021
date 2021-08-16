#GremilletAntoine_7_05072021
Groupomania
Projet 7 du parcour développeur web

#Pré-requis:
NodeJS version 14.0 ou plus
Mysql version 8.0 ou plus

#Installation:
cloner le repo.
Ouvrir un terminal se rendre dans le dossier backend et éxécuter npm ou yarn install
Procéder de la même manière dans le dossier frontend.
Éxécuter les requétes Mysql présentes dans le fichier DataBase.sql.
Changer les fichiers .env.example présents dans les dossier backend et frontend,
par .env et y insérré vos variable d'envirronement correspondantes.

#Démarrage:
Ouvrir 2 terminaux un dossier backend l'autre dossier frontend,
éxécuter npm start dans chacun des terminaux.

#Connexion utilisateur admin
Ouvrez postman puis insérer cela dedans comme sur le screen fourni,
Vérifier bien que tous les paramètres sont équivalents à ceux du screen.

{
    "email": "admin@gmail.com",
    "nom": "Groupomania",
    "prenom": "Hugo",
    "password": "753Anais951",
    "role": "admin"
}