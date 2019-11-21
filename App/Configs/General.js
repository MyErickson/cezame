const patternEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const errorsMsg = {
    emptyFiled          : 'Ce champs ne peux etre vide',
    emailInvalide       : "format d'email invalide",
    passwordLen         : "Votre mot de passe doit faire entre 8 et 22 charactère",
}

const config = {
    minLenPassword : 6,
    maxLenPassword : 22
}

export {patternEmail, errorsMsg, config};