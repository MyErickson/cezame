const patternEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const config = {
    minLenPassword : 6,
    maxLenPassword : 22
}

const errorsMsg = {
    emptyFiled          : 'Ce champs ne peux etre vide.',
    emailInvalide       : "format d'email invalide.",
    invalidLogin        : `Login ou Mot de passe, incorrect.`,
    passwordLen         : `Votre mot de passe doit faire entre ${config.minLenPassword} et ${config.maxLenPassword} charactère.`
}

export {patternEmail, errorsMsg, config};