export function mainWithUI(nameApp: string) {
    var idapp = nameApp.replace(/ /g, '').toLowerCase();
    var name = nameApp.replace(/ /g, '_').toLowerCase();
    var con: string;
    con = `#include <gtk/gtk.h>

void main_ui(GtkApplication *app, gpointer *user_data);

int main(int argc, char *argv[])
{
	GtkApplication *app;
	int status;
	//change id & flags of your app
	app = gtk_application_new("com.yourgtkapp.${idapp}", G_APPLICATION_FLAGS_NONE);
	g_signal_connect(app, "activate", G_CALLBACK(main_ui), "${nameApp}");
	status = g_application_run(G_APPLICATION(app), argc, argv);
	g_object_unref(app);
	return status;
}

void main_ui(GtkApplication *app, gpointer *user_data)
{
	(void) user_data;
	GtkWidget *window;
	GtkBuilder *builder;
	builder = gtk_builder_new_from_resource("/com/yourgtkapp/${name}/window");
	window=GTK_WIDGET(gtk_builder_get_object(builder,"window"));
	gtk_application_add_window(app,(GtkWindow*) window);

	GMenuModel *app_menu;
	GMenuModel *menubar;
	builder = gtk_builder_new_from_resource("/com/yourgtkapp/${name}/menu");
	menubar = G_MENU_MODEL(gtk_builder_get_object(builder, "menubar"));
	gtk_application_set_menubar(app, menubar);
	app_menu = G_MENU_MODEL(gtk_builder_get_object(builder, "appmenu"));
	gtk_application_set_app_menu(app, app_menu);
	gtk_widget_show_all(window);
}`;
    return con;
}

export function mainWithoutUI(nameApp: string) {
    var idapp = nameApp.replace(/ /g, '').toLowerCase();
    var con: string;
    con = `#include <gtk/gtk.h>

void print_hello(GtkWidget *widget,gpointer *data);
void main_ui(GtkApplication *app, gpointer *user_data);
int main(int argc, char *argv[])
{
	GtkApplication *app;
	int status;
	//change id & flags of your app
	app = gtk_application_new("com.yourgtkapp.${idapp}", G_APPLICATION_FLAGS_NONE);
	g_signal_connect(app, "activate", G_CALLBACK(main_ui), "${nameApp}");
	status = g_application_run(G_APPLICATION(app), argc, argv);
	g_object_unref(app);
	return status;
}

void main_ui(GtkApplication *app, gpointer *user_data)
{
	GtkWidget *window;
	window = gtk_application_window_new(app);
	gtk_window_set_title(GTK_WINDOW(window), (gchar*)user_data);

	GtkWidget *button, *button_box;
	button_box = gtk_button_box_new(GTK_ORIENTATION_HORIZONTAL);
	gtk_container_add(GTK_CONTAINER(window), button_box);

	button = gtk_button_new_with_label("Click me...");
	g_signal_connect(button, "clicked", G_CALLBACK(print_hello), "World...");
	gtk_container_add(GTK_CONTAINER(button_box), button);

	gtk_widget_show_all(window);
}

void print_hello(GtkWidget *widget,gpointer *data)
{
	(void) widget;
	g_print("Hello %s.", (gchar*)data);
}`;
    return con;
}