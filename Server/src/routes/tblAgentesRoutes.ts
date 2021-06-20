import { Router } from "express";
import { TBLAGENTES_CONTROLLER } from "../controllers/TblAgentesController"

class TblAgentesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', TBLAGENTES_CONTROLLER.obtener);
        this.router.post('/', TBLAGENTES_CONTROLLER.crear);
        this.router.post('/editar', TBLAGENTES_CONTROLLER.editar);
        this.router.post('/inactivar', TBLAGENTES_CONTROLLER.inactivar);
    }
}

export const tblAgentesRoutes = new TblAgentesRoutes(); 