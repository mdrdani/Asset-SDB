'use strict'

const UPS = use('App/Models/AssetUp')

class UpController {

    async index({ request, response, view}) {
        const upss = await UPS.all()

        return view.render('ups.index', {upss: upss.rows})
    }
}

module.exports = UpController
