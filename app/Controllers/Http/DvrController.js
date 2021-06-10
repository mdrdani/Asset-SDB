"use strict";

const DVR = use("App/Models/AssetDvr");
const Helpers = use("Helpers");
const { validate } = use("Validator");

class DvrController {
  async index({ request, response, view }) {
    const dvrs = await DVR.all();

    return view.render("dvr.index", { dvrs: dvrs.rows });
  }

  async show({ request, response, view, params }) {
    const id = params.id;
    const dvr = await DVR.find(id);

    return view.render("dvr.show", { dvr: dvr });
  }

  create({ request, response, view }) {
    return view.render("dvr.create");
  }

  async store({ request, response, view, session }) {
    const validation = await validate(request.all(), {
      tanggal: "required",
      namabarang: "required|min:2",
      serialnumber: "string",
      quantity: "required|integer",
      harga: "required|integer",
      keterangan: "required|min:5",
    });

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }

    const dvr = new DVR();

    dvr.tanggal = request.input("tanggal");
    dvr.namabarang = request.input("namabarang");
    dvr.serialnumber = request.input("serialnumber");
    dvr.bagianunit = request.input("bagianunit");
    dvr.quantity = request.input("quantity");
    dvr.harga = request.input("harga");
    dvr.keterangan = request.input("keterangan");

    if(request.file("gambar")){
      const upload_image = request.file("gambar", {
        types: ["image"],
        size: "2mb",
        extnames: ["jpg", "jpeg", "png"],
      });
  
      cctv.gambar = new Date().getTime() + "." + upload_image.subtype;
  
      await upload_image.move(Helpers.publicPath("uploads/image/cctv"), {
        name: cctv.gambar,
      });
  
      if (!upload_image.moved()) {
        session.withErrors([
          { field: "gambar", message: upload_image.error().message },
        ]);
        return response.redirect("back");
      }
    }

    await dvr.save();

    session.flash({ notification: "Data Berhasil Di simpan" });
    return response.route("dvr.index");
  }

  async edit({ request, response, view, params }) {
    const id = params.id;
    const dvr = await DVR.find(id);

    return view.render("dvr.edit", { dvr: dvr });
  }

  async update({ request, response, view, params, session }) {
    const id = params.id;
    const dvr = await DVR.find(id);

    dvr.namabarang = request.input("namabarang");
    dvr.serialnumber = request.input("serialnumber");
    dvr.bagianunit = request.input("bagianunit");
    dvr.quantity = request.input("quantity");
    dvr.harga = request.input("harga");
    dvr.keterangan = request.input("keterangan");
    await dvr.save();

    session.flash({ notification: "Data Berhasil Di Update" });
    return response.route("dvr.index");
  }

  async delete({ request, response, view, params, session }) {
    const id = params.id;
    const dvr = await DVR.find(id);
    await dvr.delete();

    session.flash({ notification: "Data Berhasil Di Hapus" });
    return response.route("dvr.index");
  }
}

module.exports = DvrController;
