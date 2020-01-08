import Colors from '../Themes/Colors';

export const patternEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const config = {
    minLenPassword : 4,
    maxLenPassword : 22
}

export const errorsMsg = {
    emptyFiled          : 'Ce champs ne peux etre vide.',
    emailInvalide       : "format d'email invalide.",
    invalidLogin        : `Login ou Mot de passe, incorrect.`,
    passwordLen         : `Votre mot de passe doit faire entre ${config.minLenPassword} et ${config.maxLenPassword} charactère.`
}



export const dataLanding = [
    {
        title:"Qui sommes nous ?",
        backgroundColor: Colors.darkPrimary,
        navigateName:'AboutUs'
    },
    {
        title:"Accès client" ,
        backgroundColor: Colors.primary ,
        navigateName:'Login',
        dataNavigate:{
            name: 'Login'
        }
    },
    {
        title:"Contact"  ,
        backgroundColor: Colors.lightPrimary ,
        navigateName:'Contact',
    },
    {
        title:"Actualités"  ,
        backgroundColor: Colors.secondary  ,
        navigateName:'News',
        dataNavigate:{
            name: 'News'
        }
    },
    {
        title:"Mentions légales" ,
        backgroundColor: Colors.lightSecondary  ,
        navigateName:'LegalNotice',
        dataNavigate:{
            name: 'Mentions légales'
        }
    },

]