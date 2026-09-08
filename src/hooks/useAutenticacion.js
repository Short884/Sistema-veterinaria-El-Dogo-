import { useContext } from "react";
import { VeterinariaContext } from "../context/VeterinariaContext";

export const useAutenticacion = () => {
    const contexto = useContext(VeterinariaContext);

    if(!contexto) {
        throw new Error('useAutenticacion debe usarse dentro de un ProveedorAutenticacion');
    }

    return contexto;
}