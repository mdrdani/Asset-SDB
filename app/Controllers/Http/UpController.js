"use strict";

const UPS = use("App/Models/AssetUp");

class UpController {
  async index({ request, response, view }) {
    const upss = await UPS.all();

    return view.render("ups.index", { upss: upss.rows });
  }

  create({ request, response, view }) {
    return view.render("ups.create");
  }

  async store({ request, response, view, session }) {
    const ups = new UPS();

    ups.tanggal = request.input("tanggal");
    ups.keterangan = request.input("keterangan");
    ups.serialnumber = request.input("serialnumber");
    ups.bagianunit = request.input("bagianunit");
    ups.quantity = request.input("quantity");
    ups.harga = request.input("harga");
    ups.kendala = request.input("kendala");
    await ups.save();

    session.flash({ notification: "Data Berhasil Di simpan" });
    return response.route("ups.index");
  }

  async edit({ request, response, view, params }) {
    const id = params.id;
    const ups = await UPS.find(id);

    return view.render("ups.edit", { ups: ups });
  }

  async update({ request, response, view, params, session }) {
    const id = params.id;
    const ups = await UPS.find(id);

    ups.keterangan = request.input("keterangan");
    ups.serialnumber = request.input("serialnumber");
    ups.bagianunit = request.input("bagianunit");
    ups.quantity = request.input("quantity");
    ups.harga = request.input("harga");
    ups.kendala = request.input("kendala");
    await ups.save();

    session.flash({ notification: "Data Berhasil Di Update" });
    return response.route("ups.index");
  }

  async delete({ request, response, view, params, session }) {
    const id = params.id;
    const ups = await UPS.find(id);
    await ups.delete();

    session.flash({ notification: "Data Berhasil Di Hapus" });
    return response.route("ups.index");
  }
}

module.exports = UpController;
