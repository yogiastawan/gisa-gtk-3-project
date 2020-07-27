export function createWindowContent(nameApp: string) {
    var cont: string;
    cont = "<?xml version=\"1.0\"?>\n" +
        "<interface>\n" +
        "\t<object id=\"window\" class=\"GtkWindow\">\n" +
        "\t\t<property name=\"visible\">True</property>\n" +
        "\t\t<property name=\"title\">" + nameApp + "</property>\n" +
        "\t\t<property name=\"border-width\">0</property>\n" +
        "\t\t<child>\n" +
        "\t\t\t<object id=\"hellolabel\" class=\"GtkLabel\">\n" +
        "\t\t\t\t<property name=\"visible\">True</property>\n" +
        "\t\t\t\t<property name=\"label\">Hello World</property>\n" +
        "\t\t\t</object>\n" +
        "\t\t</child>\n" +
        "\t</object>\n" +
        "</interface>";
    return cont;
}