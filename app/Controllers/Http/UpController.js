"use strict";

const UPS = use("App/Models/AssetUp");
const Helpers = use("Helpers");
const { validate } = use("Validator");

class UpController {
  async index({ request, response, view }) {
    const upss = await UPS.all();

    return view.render("ups.index", { upss: upss.rows });
  }

  async show({ request, response, view, params }) {
    const id = params.id;
    const ups = await UPS.find(id);

    return view.render("ups.show", { ups: ups });
  }

  create({ request, response, view }) {
    return view.render("ups.create");
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

    const ups = new UPS();

    ups.tanggal = request.input("tanggal");
    ups.namabarang = request.input("namabarang");
    ups.serialnumber = request.input("serialnumber");
    ups.bagianunit = request.input("bagianunit");
    ups.quantity = request.input("quantity");
    ups.harga = request.input("harga");
    ups.keterangan = request.input("keterangan");

    if(request.file("gambar")){
      const upload_image = request.file("gambar", {
        types: ["image"],
        size: "2mb",
        extnames: ["jpg", "jpeg", "png"],
      });
  
      ups.gambar = new Date().getTime() + "." + upload_image.subtype;
  
      await upload_image.move(Helpers.publicPath("uploads/image/ups"), {
        name: ups.gambar,
      });
  
      if (!upload_image.moved()) {
        session.withErrors([
          { field: "gambar", message: upload_image.error().message },
        ]);
        return response.redirect("back");
      }
    }

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

    ups.namabarang = request.input("namabarang");
    ups.serialnumber = request.input("serialnumber");
    ups.bagianunit = request.input("bagianunit");
    ups.quantity = request.input("quantity");
    ups.harga = request.input("harga");
    ups.keterangan = request.input("keterangan");
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
