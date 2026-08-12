import {
    getItem,
    setItem,
    STORAGE_KEYS
} from "./storage.js";

import {
    getCurrentUser,
    getRoleName,
    hasRole
} from "./auth.js";


const $ = selector =>
    document.querySelector(selector);


/* =========================================
   TOAST
========================================= */

export function showToast(message) {

    const toast =
        $("#toast");

    toast.textContent = message;

    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}


/* =========================================
   DASHBOARD
========================================= */

export function renderDashboard() {

    const user =
        getCurrentUser();

    if (!user) {
        return;
    }


    $("#welcome-title").textContent =
        `Bienvenido, ${user.nombre}`;


    const users =
        getItem(STORAGE_KEYS.USERS, []);

    const grades =
        getItem(STORAGE_KEYS.GRADES, []);

    const attendance =
        getItem(STORAGE_KEYS.ATTENDANCE, []);

    const announcements =
        getItem(STORAGE_KEYS.ANNOUNCEMENTS, []);


    const cards = [

        {
            label: "Usuarios registrados",
            value: users.length
        },

        {
            label: "Calificaciones",
            value: grades.length
        },

        {
            label: "Registros de asistencia",
            value: attendance.length
        },

        {
            label: "Comunicados",
            value: announcements.length
        }

    ];


    $("#dashboard-cards").innerHTML =
        cards.map(card => `

            <article class="stat-card">

                <span>
                    ${card.label}
                </span>

                <strong>
                    ${card.value}
                </strong>

            </article>

        `).join("");


    $("#dashboard-announcements").innerHTML =
        announcements
            .slice(0, 3)
            .map(item => `

                <article class="announcement">

                    <div class="announcement-header">

                        <h2>
                            ${escapeHtml(item.titulo)}
                        </h2>

                        <span class="announcement-date">
                            ${formatDate(item.fecha)}
                        </span>

                    </div>

                    <p>
                        ${escapeHtml(item.contenido)}
                    </p>

                </article>

            `)
            .join("");
}


/* =========================================
   USUARIOS
========================================= */

export function renderUsers() {

    const users =
        getItem(STORAGE_KEYS.USERS, []);

    const tbody =
        $("#users-table-body");


    tbody.innerHTML =
        users.map(user => `

            <tr>

                <td>
                    <strong>
                        ${escapeHtml(user.nombre)}
                    </strong>
                </td>

                <td>
                    ${escapeHtml(user.usuario)}
                </td>

                <td>
                    <span class="badge badge-blue">
                        ${getRoleName(user.rol)}
                    </span>
                </td>

                <td>
                    <span class="badge badge-success">
                        ${user.estado}
                    </span>
                </td>

                <td>

                    <button
                        class="btn btn-outline edit-user"
                        data-id="${user.id}"
                    >
                        Editar
                    </button>

                </td>

            </tr>

        `).join("");


    document
        .querySelectorAll(".edit-user")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(button.dataset.id);

                    openUserModal(id);
                }
            );

        });
}


/* =========================================
   MODAL DE USUARIO
========================================= */

export function openUserModal(userId = null) {

    const modal =
        $("#modal");

    const title =
        $("#modal-title");

    const body =
        $("#modal-body");


    let user = null;


    if (userId) {

        const users =
            getItem(STORAGE_KEYS.USERS, []);

        user =
            users.find(
                item => item.id === userId
            );
    }


    title.textContent =
        user
            ? "Editar usuario"
            : "Nuevo usuario";


    body.innerHTML = `

        <form id="user-form">

            <div class="form-group">

                <label for="user-name">
                    Nombre completo
                </label>

                <input
                    id="user-name"
                    required
                    value="${user ? escapeAttribute(user.nombre) : ""}"
                >

            </div>


            <div class="form-group">

                <label for="user-username">
                    Usuario
                </label>

                <input
                    id="user-username"
                    required
                    value="${user ? escapeAttribute(user.usuario) : ""}"
                >

            </div>


            <div class="form-group">

                <label for="user-password">
                    Contraseña
                </label>

                <input
                    id="user-password"
                    type="password"
                    ${user ? "" : "required"}
                    placeholder="${user ? "Dejar vacío para mantener" : ""}"
                >

            </div>


            <div class="form-group">

                <label for="user-role">
                    Rol
                </label>

                <select id="user-role" required>

                    <option value="administracion"
                        ${user?.rol === "administracion" ? "selected" : ""}>
                        Administración
                    </option>

                    <option value="docente"
                        ${user?.rol === "docente" ? "selected" : ""}>
                        Docente
                    </option>

                    <option value="estudiante"
                        ${user?.rol === "estudiante" ? "selected" : ""}>
                        Estudiante
                    </option>

                    <option value="familia"
                        ${user?.rol === "familia" ? "selected" : ""}>
                        Familia
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label for="user-status">
                    Estado
                </label>

                <select id="user-status">

                    <option value="Activo"
                        ${user?.estado !== "Inactivo" ? "selected" : ""}>
                        Activo
                    </option>

                    <option value="Inactivo"
                        ${user?.estado === "Inactivo" ? "selected" : ""}>
                        Inactivo
                    </option>

                </select>

            </div>


            <button
                type="submit"
                class="btn btn-primary btn-full"
            >
                Guardar usuario
            </button>

        </form>

    `;


    modal.classList.remove("hidden");


    $("#user-form")
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();

                saveUser(userId);
            }
        );
}


function saveUser(userId) {

    const users =
        getItem(STORAGE_KEYS.USERS, []);


    const name =
        $("#user-name").value.trim();

    const username =
        $("#user-username").value.trim();

    const password =
        $("#user-password").value;

    const role =
        $("#user-role").value;

    const status =
        $("#user-status").value;


    if (!name || !username) {
        showToast(
            "Complete los campos obligatorios."
        );

        return;
    }


    const duplicate =
        users.find(
            user =>
                user.usuario === username &&
                user.id !== userId
        );


    if (duplicate) {

        showToast(
            "El nombre de usuario ya existe."
        );

        return;
    }


    if (userId) {

        const user =
            users.find(
                item => item.id === userId
            );

        if (!user) {
            return;
        }

        user.nombre = name;
        user.usuario = username;
        user.rol = role;
        user.estado = status;

        if (password) {
            user.password = password;
        }


        showToast(
            "Usuario actualizado correctamente."
        );

    } else {

        const newUser = {

            id:
                Date.now(),

            nombre:
                name,

            usuario:
                username,

            password:
                password,

            rol:
                role,

            estado:
                status

        };


        users.push(newUser);


        showToast(
            "Usuario creado correctamente."
        );
    }


    setItem(
        STORAGE_KEYS.USERS,
        users
    );


    closeModal();

    renderUsers();

    renderDashboard();
}


/* =========================================
   CALIFICACIONES
========================================= */

export function renderGrades() {

    const user =
        getCurrentUser();

    const grades =
        getItem(STORAGE_KEYS.GRADES, []);


    let visibleGrades =
        grades;


    if (
        user?.rol === "estudiante"
    ) {

        visibleGrades =
            grades.filter(
                grade =>
                    grade.estudianteId === user.id
            );

    }


    const tbody =
        $("#grades-table-body");


    if (!visibleGrades.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="4">
                    No hay calificaciones disponibles.
                </td>

            </tr>

        `;

        return;
    }


    tbody.innerHTML =
        visibleGrades.map(grade => `

            <tr>

                <td>
                    ${escapeHtml(grade.estudiante)}
                </td>

                <td>
                    ${escapeHtml(grade.asignatura)}
                </td>

                <td>
                    ${escapeHtml(grade.periodo)}
                </td>

                <td>

                    <span class="badge ${
                        grade.nota >= 70
                            ? "badge-success"
                            : "badge-danger"
                    }">

                        ${grade.nota}

                    </span>

                </td>

            </tr>

        `).join("");
}


/* =========================================
   ASISTENCIA
========================================= */

export function renderAttendance() {

    const user =
        getCurrentUser();

    const attendance =
        getItem(
            STORAGE_KEYS.ATTENDANCE,
            []
        );


    let visible =
        attendance;


    if (
        user?.rol === "estudiante"
    ) {

        visible =
            attendance.filter(
                item =>
                    item.estudianteId === user.id
            );
    }


    const tbody =
        $("#attendance-table-body");


    if (!visible.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="4">
                    No hay registros disponibles.
                </td>

            </tr>

        `;

        return;
    }


    tbody.innerHTML =
        visible.map(item => {

            let badge =
                "badge-success";

            if (
                item.estado === "Ausente"
            ) {
                badge = "badge-danger";
            }

            if (
                item.estado === "Tardanza"
            ) {
                badge = "badge-warning";
            }


            return `

                <tr>

                    <td>
                        ${escapeHtml(item.estudiante)}
                    </td>

                    <td>
                        ${formatDate(item.fecha)}
                    </td>

                    <td>

                        <span class="badge ${badge}">
                            ${escapeHtml(item.estado)}
                        </span>

                    </td>

                    <td>
                        ${escapeHtml(item.observacion || "—")}
                    </td>

                </tr>

            `;

        }).join("");
}


/* =========================================
   COMUNICADOS
========================================= */

export function renderAnnouncements() {

    const announcements =
        getItem(
            STORAGE_KEYS.ANNOUNCEMENTS,
            []
        );


    const container =
        $("#announcements-container");


    container.innerHTML =
        announcements.map(item => `

            <article class="announcement">

                <div class="announcement-header">

                    <div>

                        <span class="badge badge-blue">
                            Comunicado oficial
                        </span>

                        <h2>
                            ${escapeHtml(item.titulo)}
                        </h2>

                    </div>

                    <span class="announcement-date">
                        ${formatDate(item.fecha)}
                    </span>

                </div>

                <p>
                    ${escapeHtml(item.contenido)}
                </p>

                <br>

                <small>
                    Publicado por:
                    <strong>
                        ${escapeHtml(item.autor)}
                    </strong>
                </small>

            </article>

        `).join("");
}


/* =========================================
   NUEVO COMUNICADO
========================================= */

export function openAnnouncementModal() {

    $("#modal-title").textContent =
        "Nuevo comunicado";


    $("#modal-body").innerHTML = `

        <form id="announcement-form">

            <div class="form-group">

                <label for="announcement-title">
                    Título
                </label>

                <input
                    id="announcement-title"
                    required
                >

            </div>


            <div class="form-group">

                <label for="announcement-content">
                    Contenido
                </label>

                <textarea
                    id="announcement-content"
                    required
                ></textarea>

            </div>


            <button
                type="submit"
                class="btn btn-primary btn-full"
            >
                Publicar comunicado
            </button>

        </form>

    `;


    $("#modal")
        .classList
        .remove("hidden");


    $("#announcement-form")
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();

                saveAnnouncement();
            }
        );
}


function saveAnnouncement() {

    const user =
        getCurrentUser();


    const announcements =
        getItem(
            STORAGE_KEYS.ANNOUNCEMENTS,
            []
        );


    announcements.unshift({

        id:
            Date.now(),

        titulo:
            $("#announcement-title")
                .value
                .trim(),

        contenido:
            $("#announcement-content")
                .value
                .trim(),

        fecha:
            new Date()
                .toISOString()
                .slice(0, 10),

        autor:
            user.nombre

    });


    setItem(
        STORAGE_KEYS.ANNOUNCEMENTS,
        announcements
    );


    closeModal();

    renderAnnouncements();

    renderDashboard();


    showToast(
        "Comunicado publicado correctamente."
    );
}


/* =========================================
   PERFIL
========================================= */

export function renderProfile() {

    const user =
        getCurrentUser();

    if (!user) {
        return;
    }


    $("#profile-name").textContent =
        user.nombre;

    $("#profile-username").textContent =
        user.usuario;

    $("#profile-role").textContent =
        getRoleName(user.rol);
}


/* =========================================
   MODAL
========================================= */

export function closeModal() {

    $("#modal")
        .classList
        .add("hidden");
}


/* =========================================
   UTILIDADES
========================================= */

function formatDate(date) {

    if (!date) {
        return "—";
    }


    const parsed =
        new Date(`${date}T00:00:00`);


    return parsed.toLocaleDateString(
        "es-CR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}


function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {
    return escapeHtml(value);
}