'use strict'
const User = use("App/Models/User")
const Macro = use("App/Models/Macro")

class MacroController {
    async storeMacro({ request, auth, response }) {
        let user = await auth.getUser()
        const { clientId, macros } = request.post();



        const mappedMacros = macros.map(async macro => {
            await Macro.create({
                client_id: clientId,
                coach_id: user.id,
                date: macro.date,
                protein: macro.proteinSelected,
                carbohydrates: macro.carbsSelected,
                fats: macro.fatSelected,
                total_daily_calories: macro.totalDailyCalories,
            });
        })

        response.json({
            message: "${user.username} is going to get healthy!"
        });

    }
    async fetchMacro({auth}) {
        let user = await auth.getUser()
        const macros = await Macro.query().where('client_id', user.id).fetch()
        return macros
      }
}

module.exports = MacroController
