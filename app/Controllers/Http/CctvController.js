'use strict'

const Cctv = use('App/Models/AssetCctv')

class CctvController {

    async index({ request, response, view}) {
        const cctvs = await Cctv.all()

        return view.render('cctv.index', {cctvs: cctvs.rows})
    }
}

module.exports = CctvController
