import { Router } from "express";
import { TBLASEGURADOS_CONTROLLER } from "../controllers/TblAseguradosController"

class TblAseguradosRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', TBLASEGURADOS_CONTROLLER.obtener);
        this.router.post('/', TBLASEGURADOS_CONTROLLER.crear);
        this.router.post('/editar', TBLASEGURADOS_CONTROLLER.editar);
        this.router.post('/inactivar', TBLASEGURADOS_CONTROLLER.inactivar);
    }
}

export const tblAseguradosRoutes = new TblAseguradosRoutes(); 