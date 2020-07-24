export function mainWithUI(nameApp: string) {

}

export function mainWithoutUI(nameApp: string) {
    var idapp = nameApp.replace(' ', '').toLowerCase;
    var con: string;
    con = "#include <gtk/gtk.h>\n\n" +
        "void print_hello(GtkWidget *widget,gpointer *data);\n" +
        "void main_ui(GtkApplication *app, gpointer *user_data);\n" +
        "int main(int argc, char *argv[])\n" +
        "{\n" +
        "\tGtkApplication *app;\n" +
        "\tint status;\n" +
        "\t//change id & flags of your app" +
        "\tapp = gtk_application_new(\"com.yourgtkapp." + idapp + "\", G_APPLICATION_FLAGS_NONE);\n" +
        "\tg_signal_connect(app, \"activate\", G_CALLBACK(main_ui), \"" + nameApp + "\");\n" +
        "\tstatus = g_application_run(G_APPLICATION(app), argc, argv);\n" +
        "\tg_object_unref(app);\n" +
        "\treturn status;\n" +
        "}\n\n" +
        "void main_ui(GtkApplication *app, gpointer *user_data)\n" +
        "{\n" +
        "\tGtkWidget *window;\n" +
        "\twindow = gtk_application_window_new(app);\n" +
        "\tgtk_window_set_title(GTK_WINDOW(window), (gchar*)user_data);\n" +
        "\n" +
        "\tGtkWidget *button, *button_box;\n" +
        "\tbutton_box = gtk_button_box_new(GTK_ORIENTATION_HORIZONTAL);\n" +
        "\tgtk_container_add(GTK_CONTAINER(window), button_box);\n" +
        "\n" +
        "\tbutton = gtk_button_new_with_label(\"Click me...\");\n" +
        "\tg_signal_connect(button, \"clicked\", G_CALLBACK(print_hello), \"World...\");\n" +
        "\tgtk_container_add(GTK_CONTAINER(button_box), button);\n" +
        "\n" +
        "\tgtk_widget_show_all(window);\n" +
        "}\n\n" +
        "void print_hello(GtkWidget *widget,gpointer *data)\n" +
        "{\n" +
        "\t(void) widget;\n" +
        "\tg_print(\"Hello %s.\n\", (gchar*)data);\n" +
        "}";
    return con;
}