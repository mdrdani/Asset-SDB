"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AssetUpsSchema extends Schema {
  up() {
    this.create("asset_ups", (table) => {
      table.increments();
      table.date("tanggal");
      table.string("namabarang");
      table.string("serialnumber");
      table.string("bagianunit");
      table.integer("quantity");
      table.bigInteger("harga");
      table.text("keterangan").nullable();
      table.string("gambar").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("asset_ups");
  }
}

module.exports = AssetUpsSchema;
