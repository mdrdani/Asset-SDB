"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

// CRUD CCTV
Route.get("/cctv", "CctvController.index").as("cctv.index");
Route.get("/cctv/show/:id", "CctvController.show").as("cctv.show");
Route.get("/cctv/create", "CctvController.create").as("cctv.create");
Route.post("/cctv/store", "CctvController.store").as("cctv.store");
Route.get("/cctv/edit/:id", "CctvController.edit").as("cctv.edit");
Route.post("/cctv/update/:id", "CctvController.update").as("cctv.update");
Route.get("/cctv/delete/:id", "CctvController.delete").as("cctv.delete");

// CRUD UPS
Route.get("/ups", "UpController.index").as("ups.index");
Route.get("/ups/create", "UpController.create").as("ups.create");
Route.post("/ups/store", "UpController.store").as("ups.store");
Route.get("/ups/edit/:id", "UpController.edit").as("ups.edit");
Route.post("/ups/update/:id", "UpController.update").as("ups.update");
Route.get("/ups/delete/:id", "UpController.delete").as("ups.delete");

// CRUD DVR
Route.get("/dvr", "DvrController.index").as("dvr.index");
Route.get("/dvr/create", "DvrController.create").as("dvr.create");
Route.post("/dvr/store", "DvrController.store").as("dvr.store");
Route.get("/dvr/edit/:id", "DvrController.edit").as("dvr.edit");
Route.post("/dvr/update/:id", "DvrController.update").as("dvr.update");
Route.get("/dvr/delete/:id", "DvrController.delete").as("dvr.delete");
