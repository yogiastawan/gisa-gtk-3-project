export function contentRes(nameApp: string) {
    var name=nameApp.replace(/ /g,'_').toLowerCase();
    var cont: string;
    cont = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<gresources>\n" +
        "\t<gresource prefix=\"/com/yourgtkapp/"+name+"\">\n" +
        "\t\t<file compressed=\"true\" alias=\"window\">ui/"+name+".ui</file>\n" +
        "\t\t<file compressed=\"true\" alias=\"menu\">menu/menu.ui</file>\n" +
        "\t</gresource>\n" +
        "</gresources>";
    return cont;
}