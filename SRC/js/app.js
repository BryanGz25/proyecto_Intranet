import {
    initializeData
} from "./storage.js";

import {
    login,
    logout,
    getCurrentUser,
    getRoleName
} from "./auth.js";

import {
    renderDashboard,
    renderUsers,
    openUserModal,
    renderGrades,
    renderAttendance,
    renderAnnouncements,
    openAnnouncementModal,
    renderProfile,
    closeModal,
    showToast
} from "./ui.js";


/* =========================================
   INICIALIZACIÓN
========================================= */

initializeData();

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);


function initializeApplication() {

    setupLogin();

    setupNavigation();

    setupModal();

    setupButtons();


    const user =
        getCurrentUser();


    if (user) {
        showApplication();
    } else {
        showLogin();
    }
}


/* =========================================
   LOGIN
========================================= */

function setupLogin() {

    const form =
        document.querySelector(
            "#login-form"
        );


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const username =
                document.querySelector(
                    "#username"
                ).value.trim();


            const password =
                document.querySelector(
                    "#password"
                ).value;


            const result =
                login(
                    username,
                    password
                );


            const error =
                document.querySelector(
                    "#login-error"
                );


            if (!result.success) {

                error.textContent =
                    result.message;

                error.classList.remove(
                    "hidden"
                );

                return;
            }


            error.classList.add(
                "hidden"
            );


            form.reset();


            showApplication();


            showToast(
                `Bienvenido, ${result.user.nombre}`
            );
        }
    );
}


/* =========================================
   MOSTRAR LOGIN
========================================= */

function showLogin() {

    document
        .querySelector("#login-view")
        .classList
        .remove("hidden");


    document
        .querySelector("#app-view")
        .classList
        .add("hidden");
}


/* =========================================
   MOSTRAR APLICACIÓN
========================================= */

function showApplication() {

    const user =
        getCurrentUser();


    if (!user) {
        showLogin();
        return;
    }


    document
        .querySelector("#login-view")
        .classList
        .add("hidden");


    document
        .querySelector("#app-view")
        .classList
        .remove("hidden");


    updateUserInterface(user);

    renderAll();
}


/* =========================================
   INTERFAZ SEGÚN USUARIO
========================================= */

function updateUserInterface(user) {

    document
        .querySelector("#header-user-name")
        .textContent =
            user.nombre;


    document
        .querySelector("#header-user-role")
        .textContent =
            getRoleName(user.rol);


    document
        .querySelector("#profile-name")
        .textContent =
            user.nombre;


    document
        .querySelector("#profile-username")
        .textContent =
            user.usuario;


    document
        .querySelector("#profile-role")
        .textContent =
            getRoleName(user.rol);


    const usersNav =
        document.querySelector(
            "#nav-users"
        );


    const addAnnouncement =
        document.querySelector(
            "#add-announcement-button"
        );


    if (
        user.rol === "administracion"
    ) {

        usersNav.classList.remove(
            "hidden"
        );

    } else {

        usersNav.classList.add(
            "hidden"
        );
    }


    if (
        user.rol === "administracion" ||
        user.rol === "docente"
    ) {

        addAnnouncement.classList.remove(
            "hidden"
        );

    } else {

        addAnnouncement.classList.add(
            "hidden"
        );
    }
}


/* =========================================
   NAVEGACIÓN
========================================= */

function setupNavigation() {

    const buttons =
        document.querySelectorAll(
            ".nav-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;

                navigateTo(section);

                closeMobileMenu();
            }
        );

    });
}


function navigateTo(section) {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const allowedSections =
        getAllowedSections(
            user.rol
        );


    if (
        !allowedSections.includes(section)
    ) {

        showToast(
            "No tiene permiso para acceder a esta sección."
        );

        return;
    }


    document
        .querySelectorAll(
            ".content-section"
        )
        .forEach(element => {

            element.classList.add(
                "hidden"
            );

        });


    const target =
        document.querySelector(
            `#section-${section}`
        );


    if (target) {

        target.classList.remove(
            "hidden"
        );
    }


    document
        .querySelectorAll(
            ".nav-button"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.section === section
            );

        });


    if (section === "dashboard") {
        renderDashboard();
    }

    if (section === "users") {
        renderUsers();
    }

    if (section === "grades") {
        renderGrades();
    }

    if (section === "attendance") {
        renderAttendance();
    }

    if (section === "announcements") {
        renderAnnouncements();
    }

    if (section === "profile") {
        renderProfile();
    }
}


function getAllowedSections(role) {

    const common = [
        "dashboard",
        "grades",
        "attendance",
        "announcements",
        "profile"
    ];


    if (role === "administracion") {
        return [
            ...common,
            "users"
        ];
    }


    return common;
}


/* =========================================
   BOTONES
========================================= */

function setupButtons() {

    document
        .querySelector(
            "#logout-button"
        )
        .addEventListener(
            "click",
            () => {

                logout();

                showLogin();

                showToast(
                    "Sesión cerrada correctamente."
                );
            }
        );


    document
        .querySelector(
            "#add-user-button"
        )
        .addEventListener(
            "click",
            () => {

                openUserModal();
            }
        );


    document
        .querySelector(
            "#add-announcement-button"
        )
        .addEventListener(
            "click",
            () => {

                openAnnouncementModal();
            }
        );


    document
        .querySelector(
            "#menu-toggle"
        )
        .addEventListener(
            "click",
            () => {

                document
                    .querySelector(
                        "#sidebar"
                    )
                    .classList
                    .toggle("open");
            }
        );
}


/* =========================================
   MODAL
========================================= */

function setupModal() {

    document
        .querySelector(
            "#modal-close"
        )
        .addEventListener(
            "click",
            closeModal
        );


    document
        .querySelector(
            "#modal"
        )
        .addEventListener(
            "click",
            event => {

                if (
                    event.target.id === "modal"
                ) {
                    closeModal();
                }
            }
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {
                closeModal();
            }
        }
    );
}


/* =========================================
   MENÚ MÓVIL
========================================= */

function closeMobileMenu() {

    document
        .querySelector(
            "#sidebar"
        )
        .classList
        .remove("open");
}


/* =========================================
   RENDER GENERAL
========================================= */

function renderAll() {

    renderDashboard();

    renderUsers();

    renderGrades();

    renderAttendance();

    renderAnnouncements();

    renderProfile();
}
