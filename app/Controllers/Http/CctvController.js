"use strict";

const Cctv = use("App/Models/AssetCctv");
const Helpers = use("Helpers");
const { validate } = use("Validator");

class CctvController {
  async index({ request, response, view }) {
    const cctvs = await Cctv.all();

    return view.render("cctv.index", { cctvs: cctvs.rows });
  }

  async show({ request, response, view, params }) {
    const id = params.id;
    const cctv = await Cctv.find(id);

    return view.render("cctv.show", { cctv: cctv });
  }

  create({ request, response, view }) {
    return view.render("cctv.create");
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

    const cctv = new Cctv();

    cctv.tanggal = request.input("tanggal");
    cctv.namabarang = request.input("namabarang");
    cctv.serialnumber = request.input("serialnumber");
    cctv.bagianunit = request.input("bagianunit");
    cctv.quantity = request.input("quantity");
    cctv.harga = request.input("harga");
    cctv.keterangan = request.input("keterangan");

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

    await cctv.save();

    session.flash({ notification: "Data Berhasil Di simpan" });
    return response.route("cctv.index");
  }

  async edit({ request, response, view, params }) {
    const id = params.id;
    const cctv = await Cctv.find(id);

    return view.render("cctv.edit", { cctv: cctv });
  }

  async update({ request, response, view, params, session }) {
    const id = params.id;
    const cctv = await Cctv.find(id);

    cctv.namabarang = request.input("namabarang");
    cctv.serialnumber = request.input("serialnumber");
    cctv.bagianunit = request.input("bagianunit");
    cctv.quantity = request.input("quantity");
    cctv.harga = request.input("harga");
    cctv.keterangan = request.input("keterangan");
    await cctv.save();

    session.flash({ notification: "Data Berhasil Di Update" });
    return response.route("cctv.index");
  }

  async delete({ request, response, view, params, session }) {
    const id = params.id;
    const cctv = await Cctv.find(id);
    await cctv.delete();

    session.flash({ notification: "Data Berhasil Di Hapus" });
    return response.route("cctv.index");
  }
}

module.exports = CctvController;
