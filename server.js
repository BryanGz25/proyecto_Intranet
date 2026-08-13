import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = process.env.PORT || 3000;
const root = process.cwd();

const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".md": "text/markdown; charset=utf-8"
};

createServer(async (request, response) => {
    const url = new URL(request.url, `http://localhost:${port}`);
    const requestedPath =
        decodeURIComponent(url.pathname).replace(/^[/\\]+/, "");

    const cleanPath =
        normalize(requestedPath || "index.html").replace(/^(\.\.[/\\])+/, "");

    const filePath = join(root, cleanPath);

    try {
        const content = await readFile(filePath);
        response.writeHead(200, {
            "Content-Type": contentTypes[extname(filePath)] || "text/plain; charset=utf-8"
        });
        response.end(content);
    } catch {
        response.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8"
        });
        response.end("Archivo no encontrado");
    }
}).listen(port, () => {
    console.log(`Intranet escolar disponible en http://localhost:${port}`);
});
