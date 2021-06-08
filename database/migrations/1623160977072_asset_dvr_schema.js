"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AssetDvrSchema extends Schema {
  up() {
    this.create("asset_dvrs", (table) => {
      table.increments();
      table.date("tanggal");
      table.string("keterangan");
      table.string("serialnumber");
      table.string("bagianunit");
      table.integer("quantity");
      table.bigInteger("harga");
      table.text("kendala").nullable();
      table.string("gambar").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("asset_dvrs");
  }
}

module.exports = AssetDvrSchema;
