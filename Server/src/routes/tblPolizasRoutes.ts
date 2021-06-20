import { Router } from "express";
import { TBLPOLIZAS_CONTROLLER } from "../controllers/TblPolizasController"

class TblPolizasRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', TBLPOLIZAS_CONTROLLER.obtener);
        this.router.post('/', TBLPOLIZAS_CONTROLLER.crear);
        this.router.post('/editar', TBLPOLIZAS_CONTROLLER.editar);
        this.router.post('/inactivar', TBLPOLIZAS_CONTROLLER.inactivar);
    }
}

export const tblPolizasRoutes = new TblPolizasRoutes(); 