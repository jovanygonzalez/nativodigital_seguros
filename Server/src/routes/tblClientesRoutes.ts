import { Router } from "express";
import { TBLCLIENTES_CONTROLLER } from "../controllers/TblClientesController"

class TblClientesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', TBLCLIENTES_CONTROLLER.obtener);
        this.router.post('/', TBLCLIENTES_CONTROLLER.crear);
        this.router.post('/editar', TBLCLIENTES_CONTROLLER.editar);
        this.router.post('/inactivar', TBLCLIENTES_CONTROLLER.inactivar);
    }
}

export const tblClientesRoutes = new TblClientesRoutes(); 