const STORAGE_KEYS = {
    USERS: "intranet_usuarios",
    GRADES: "intranet_calificaciones",
    ATTENDANCE: "intranet_asistencia",
    ANNOUNCEMENTS: "intranet_comunicados",
    SESSION: "intranet_sesion",
    INITIALIZED: "intranet_inicializado"
};


/**
 * Obtiene un objeto o array desde LocalStorage.
 */
export function getItem(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            return defaultValue;
        }

        return JSON.parse(value);

    } catch (error) {
        console.error("Error leyendo LocalStorage:", error);

        return defaultValue;
    }
}


/**
 * Guarda información en LocalStorage.
 */
export function setItem(key, value) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {
        console.error("Error guardando en LocalStorage:", error);

        return false;
    }
}


/**
 * Elimina un elemento.
 */
export function removeItem(key) {
    localStorage.removeItem(key);
}


/**
 * Inicializa los datos de demostración.
 */
export function initializeData() {

    const initialized =
        localStorage.getItem(
            STORAGE_KEYS.INITIALIZED
        );

    if (initialized) {
        return;
    }


    const users = [

        {
            id: 1,
            nombre: "María González",
            usuario: "admin",
            password: "admin123",
            rol: "administracion",
            estado: "Activo"
        },

        {
            id: 2,
            nombre: "Carlos Rodríguez",
            usuario: "docente",
            password: "docente123",
            rol: "docente",
            estado: "Activo"
        },

        {
            id: 3,
            nombre: "Laura Martínez",
            usuario: "estudiante",
            password: "estudiante123",
            rol: "estudiante",
            estado: "Activo"
        },

        {
            id: 4,
            nombre: "Ana Martínez",
            usuario: "familia",
            password: "familia123",
            rol: "familia",
            estado: "Activo"
        },

        {
            id: 5,
            nombre: "Daniel Vargas",
            usuario: "daniel",
            password: "daniel123",
            rol: "estudiante",
            estado: "Activo"
        },

        {
            id: 6,
            nombre: "Sofía Ramírez",
            usuario: "sofia",
            password: "sofia123",
            rol: "estudiante",
            estado: "Activo"
        }

    ];


    const grades = [

        {
            id: 1,
            estudianteId: 3,
            estudiante: "Laura Martínez",
            asignatura: "Matemáticas",
            periodo: "I Periodo",
            nota: 92
        },

        {
            id: 2,
            estudianteId: 3,
            estudiante: "Laura Martínez",
            asignatura: "Español",
            periodo: "I Periodo",
            nota: 88
        },

        {
            id: 3,
            estudianteId: 3,
            estudiante: "Laura Martínez",
            asignatura: "Ciencias",
            periodo: "I Periodo",
            nota: 95
        },

        {
            id: 4,
            estudianteId: 5,
            estudiante: "Daniel Vargas",
            asignatura: "Matemáticas",
            periodo: "I Periodo",
            nota: 78
        },

        {
            id: 5,
            estudianteId: 6,
            estudiante: "Sofía Ramírez",
            asignatura: "Matemáticas",
            periodo: "I Periodo",
            nota: 90
        }

    ];


    const attendance = [

        {
            id: 1,
            estudianteId: 3,
            estudiante: "Laura Martínez",
            fecha: "2026-08-10",
            estado: "Presente",
            observacion: ""
        },

        {
            id: 2,
            estudianteId: 3,
            estudiante: "Laura Martínez",
            fecha: "2026-08-11",
            estado: "Presente",
            observacion: ""
        },

        {
            id: 3,
            estudianteId: 5,
            estudiante: "Daniel Vargas",
            fecha: "2026-08-10",
            estado: "Ausente",
            observacion: "Ausencia justificada"
        },

        {
            id: 4,
            estudianteId: 6,
            estudiante: "Sofía Ramírez",
            fecha: "2026-08-11",
            estado: "Tardanza",
            observacion: "Ingreso 10 minutos tarde"
        }

    ];


    const announcements = [

        {
            id: 1,
            titulo: "Reunión general de familias",
            contenido:
                "La institución informa que la próxima reunión general de familias se realizará el viernes a las 6:00 p. m. en el salón de actos.",
            fecha: "2026-08-08",
            autor: "Administración"
        },

        {
            id: 2,
            titulo: "Semana de evaluaciones",
            contenido:
                "Durante la próxima semana se realizarán evaluaciones correspondientes al primer periodo académico. Consulte el calendario institucional.",
            fecha: "2026-08-07",
            autor: "Coordinación Académica"
        },

        {
            id: 3,
            titulo: "Actividad institucional",
            contenido:
                "El próximo miércoles se llevará a cabo una actividad institucional. Se solicita puntualidad y participación de toda la comunidad educativa.",
            fecha: "2026-08-05",
            autor: "Dirección"
        }

    ];


    setItem(STORAGE_KEYS.USERS, users);
    setItem(STORAGE_KEYS.GRADES, grades);
    setItem(STORAGE_KEYS.ATTENDANCE, attendance);
    setItem(STORAGE_KEYS.ANNOUNCEMENTS, announcements);

    localStorage.setItem(
        STORAGE_KEYS.INITIALIZED,
        "true"
    );
}


export {
    STORAGE_KEYS
};