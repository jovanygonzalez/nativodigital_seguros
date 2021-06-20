import { Router } from "express";
import { TBLASEGURADORAS_CONTROLLER } from "../controllers/TblAseguradorasController"

class TblAseguradorasRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', TBLASEGURADORAS_CONTROLLER.obtener);
        this.router.post('/', TBLASEGURADORAS_CONTROLLER.crear);
        this.router.post('/editar', TBLASEGURADORAS_CONTROLLER.editar);
        this.router.post('/inactivar', TBLASEGURADORAS_CONTROLLER.inactivar);
    }
}

export const tblAseguradorasRoutes = new TblAseguradorasRoutes(); 