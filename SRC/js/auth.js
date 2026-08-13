import {
    getItem,
    setItem,
    STORAGE_KEYS
} from "./storage.js";


/**
 * Autentica un usuario.
 */
export function login(username, password) {

    const users =
        getItem(STORAGE_KEYS.USERS, []);

    const user =
        users.find(
            item =>
                item.usuario === username &&
                item.password === password &&
                item.estado === "Activo"
        );

    if (!user) {
        return {
            success: false,
            message: "Usuario o contraseña incorrectos."
        };
    }


    const session = {
        usuarioId: user.id,
        usuario: user.usuario,
        rol: user.rol
    };


    setItem(
        STORAGE_KEYS.SESSION,
        session
    );


    return {
        success: true,
        user
    };
}


/**
 * Obtiene el usuario actualmente autenticado.
 */
export function getCurrentUser() {

    const session =
        getItem(STORAGE_KEYS.SESSION, null);

    if (!session) {
        return null;
    }


    const users =
        getItem(STORAGE_KEYS.USERS, []);

    return (
        users.find(
            user =>
                user.id === session.usuarioId
        ) || null
    );
}


/**
 * Cierra la sesión.
 */
export function logout() {

    localStorage.removeItem(
        STORAGE_KEYS.SESSION
    );
}


/**
 * Comprueba si existe una sesión.
 */
export function isAuthenticated() {
    return getCurrentUser() !== null;
}


/**
 * Comprueba si el usuario tiene alguno
 * de los roles permitidos.
 */
export function hasRole(roles) {

    const user =
        getCurrentUser();

    if (!user) {
        return false;
    }

    if (!Array.isArray(roles)) {
        roles = [roles];
    }

    return roles.includes(user.rol);
}


/**
 * Devuelve el nombre legible del rol.
 */
export function getRoleName(role) {

    const roles = {

        administracion: "Administración",

        docente: "Docente",

        estudiante: "Estudiante",

        familia: "Familia"

    };

    return roles[role] || role;
}