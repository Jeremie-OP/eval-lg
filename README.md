# eval-lg

## Contexte du projet

Vous venez de récupérer ce repo avec les sources et exemple. L'outil a commencé à être réalisé par un autre developpeur néophyte, que vous ne pouvez pas contacter. Le projet est "à vous", vous êtes libre de le modifier comme bon vous semble, d'ajouter des dépendances, de l'optimiser, etc.
Vous ne serez pas seulement évalué sur les fonctionalités restaurées à l'application, mais sur l'ensemble des modifications permettant d'améliorer la pérénité du projet, permettant des développements futurs par vous ou vos collègues.

## Projet

Tous les jours, un fichier JSON est déposé sur la machine du client, contenant des informations sur les clients de son entreprise. Le client souhaite ouvrir ces informations client sur Excel, et pour ne pas avoir à filtrer les clients inactifs sur Excel, le client souhaite que le filtrage soit aussi fait lors de la transformation du fichier.

## Bugs relevés

* Le fichier généré est parfois mal ordonné: certaines lignes ne sont pas séparées, d'autres lignes sont séparées de plusieurs retours à la ligne
    - le probleme vient du fait que la méthode `fs.writeFile()` est asynchrone. Il peut donc arriver que le retour à la ligne se fasse avant l'ajout d'une client dans le fichier csv
* Le fichier généré montre des lignes de clients qui ne sont pas actifs
    - Certains clients sont renseignés sans champs isActive. Le script proposés ne fait que verifier si le champ vaut false
* Le fichier généré affiche mal les lettres accentués et autres caractères Unicode
    - Spécifier le codec utf-8 ne suffit pas. Il faut ajouter le BOM pour eviter la perte des caracteres avec accents dans Excel

## Demandes utilisateur

* Un en-tête avec un intitulé des colonnes devrait être ajouté au début du fichier
* Les colonnes du fichier ne sont pas séparées si Excel est installé sur un système qui n'est pas en français
    - Pour ce point, je ne suis pas sûr à 100%, mais il me semble que le caractere utilisé pour la separation des colonnes par defaut sur la majorité des langues est la virgule. La solution serait donc de remplacer le point virgule par une virgule.

## Performances

Dans le cas d'un fichier de client extrêmement gros, le client relève les deux problèmes suivants :

* Le fichier est long a être généré
* En cas de très gros fichier, l'application se ferme sans avoir terminé, avec une erreur
    - Les deux problemes de performances sont liés à l'utilisation de la méthode `fs.appendFile()` qui à chaque appel va ouvrir le fichier pour ajouter la donnée, puis le fermer. Sur un gros fichier l'utilisation de cette methode dans une boucle pour chaque lignes du fichier est tres peu performante et peux amener à un crash du script en atteignant la limite de fichier que le script peut ouvrir.


## Autres informations

- J'ai renommé certaines variables pour garder plus de sens sur leurs utilisations (`fileSortie` c'est pour hanter mes cauchemars c'est ça ?)
- J'ai vu qu'une compagnie a son nom entre guillemets. Je pourrai empêcher ça dans le csv, mais ma première logique serait de demander au client si il peut y avoir des compagnies avec des guillemets dans le nom.
- Le script est regroupé dans une methode `jsonActiveCustomersToCsv` (plus clair, mieux maintenable et testable).

## Temps pour la réalisation : Environ 40 minutes



