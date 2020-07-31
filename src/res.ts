export function contentRes(nameApp: string) {
    var name = nameApp.replace(/ /g, '_').toLowerCase();
    var cont: string;
    cont = `<?xml version="1.0" encoding="UTF-8"?>
        <gresources>
            <gresource prefix="/com/yourgtkapp/${name}">
                <file compressed="true" alias="window">ui/${name}.ui</file>
                <file compressed="true" alias="menu">menu/menu.ui</file>
            </gresource>
        </gresources>`;
    return cont;
}