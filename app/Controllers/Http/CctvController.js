'use strict'

const Cctv = use('App/Models/AssetCctv')

class CctvController {

    async index({ request, response, view}) {
        const cctvs = await Cctv.all()

        return view.render('cctv.index', {cctvs: cctvs.rows})
    }

    create({ request, response, view}) {
        return view.render('cctv.create')
    }

    async store({ request, response, view, session}) {
        const cctv = new Cctv()

        cctv.tanggal = request.input('tanggal')
        cctv.keterangan = request.input('keterangan')
        cctv.serialnumber = request.input('serialnumber')
        cctv.bagianunit = request.input('bagianunit')
        cctv.quantity = request.input('quantity')
        cctv.harga = request.input('harga')
        cctv.kendala = request.input('kendala')
        await cctv.save()

        session.flash({ notification:'Data Berhasil Di simpan'})
        return response.route('cctv.index')

    }

    async edit({ request, response, view, params}) {
        const id = params.id
        const cctv = await Cctv.find(id)

        return view.render('cctv.edit', {cctv: cctv})
    }

    async update ({ request, response, view, params, session}) {
        const id = params.id
        const cctv = await Cctv.find(id)

        cctv.keterangan = request.input('keterangan')
        cctv.serialnumber = request.input('serialnumber')
        cctv.bagianunit = request.input('bagianunit')
        cctv.quantity = request.input('quantity')
        cctv.harga = request.input('harga')
        cctv.kendala = request.input('kendala')
        await cctv.save()

        session.flash({ notification:'Data Berhasil Di Update'})
        return response.route('cctv.index')
    }

    async delete({ request, response, view, params, session}) {
        const id = params.id
        const cctv = await Cctv.find(id)
        await cctv.delete()

        session.flash({ notification: 'Data Berhasil Di Hapus'})
        return response.route('cctv.index')
    }

}

module.exports = CctvController