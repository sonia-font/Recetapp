const configWeeklyPlan = {
    configEmail: "ortrecetapp@gmail.com",
    configPass: "recetapport",
    configSubject: "Tus recetas de la semana",
    dirEmailBody: "./src/shared/mails/templates/WeekPlanBody.html"
}

const configPrintRecipe = {
    configEmail: "ortrecetapp@gmail.com",
    configPass: "recetapport",
    configSubject: "Las recetas seleccionadas son..",
    dirEmailBody: "./src/shared/mails/templates/PrintRecipeBody.html"
}

export default {
    configWeeklyPlan,
    configPrintRecipe
}