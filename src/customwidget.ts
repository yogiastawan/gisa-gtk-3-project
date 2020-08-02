export function customWidgetHeader(nameWidget:string) {
    var con:string;
    var widgetName=nameWidget.replace(/ /g,'');
    var arrayName=nameWidget.split(' ');
    var firstName:string;
    var secondName:string;
    firstName='';
    secondName='';
    if(arrayName.length===1){
        firstName='';
        secondName=arrayName[0];
    }else if(arrayName.length>1){
        firstName=`${arrayName[0].toUpperCase()}_`;
        //delete first element array
        arrayName.splice(0,1);
        secondName=arrayName.join('').toUpperCase();
    }
    
    con=`#ifndef __${nameWidget.replace(/ /g,'').toUpperCase()}_H__
    #define __${nameWidget.replace(/ /g,'').toUpperCase()}_H__
    
    #include <gtk/gtk.h>
    
    #include <cairo.h>//for drawing
    
    G_BEGIN_DECLS
    
    /* Standart GObject macros */
    #define ${firstName}TYPE_${secondName} (${firstName.toLowerCase()}${secondName.toLowerCase()}_get_type())
    #define ${firstName}${secondName}(obj) (G_TYPE_CHECK_INSTANCE_CAST((obj),${firstName}TYPE_${secondName}, ${widgetName}))
    #define ${firstName}${secondName}_CLASS(klass)  (G_TYPE_CHECK_CLASS_CAST((klass),${firstName}TYPE_${secondName}, ${widgetName}Class))
    #define ${firstName}IS_${secondName}(obj) (G_TYPE_CHECK_INSTANCE_TYPE((obj),${firstName}TYPE_${secondName}))
    #define ${firstName}IS_${secondName}_CLASS(klass) (G_TYPE_CHECk_CLASS_TYPE((klass),${firstName}TYPE_${secondName}))
    #define ${firstName}${secondName}_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS((obj),${firstName}TYPE_${secondName}, ${widgetName}Class))
    
    /* Type definition */
    typedef struct _${widgetName} ${widgetName};
    typedef struct _${widgetName}Class ${widgetName}Class;
    typedef struct _${widgetName}Private ${widgetName}Private;
    
    struct _${widgetName}
    {
        GtkWidget parent;
        /*< Private >*/
        ${widgetName}Private *priv;
    };
    
    struct _${widgetName}Class
    {
        GtkWidgetClass parent_class;
    };
    
    /* public API */
    GType ${firstName.toLowerCase()}${secondName.toLowerCase()}_get_type(void) G_GNUC_CONST;
    GtkWidget *${firstName.toLowerCase()}${secondName.toLowerCase()}_new(void);
    
    //set value widget
    void ${firstName.toLowerCase()}${secondName.toLowerCase()}_set_value(${widgetName} *widget, gdouble value);
    //get value widget
    gdouble ${firstName.toLowerCase()}${secondName.toLowerCase()}_get_value(${widgetName} *widget);
    
    G_END_DECLS
    
    #endif /*__${nameWidget.replace(/ /g,'').toUpperCase()}_H__*/`;
    return con;
}

export function customWidgetCFile(nameWidget:string) {
    var con:string;
    var con:string;
    var widgetName=nameWidget.replace(/ /g,'');
    var arrayName=nameWidget.split(' ');
    var firstName:string;
    var secondName:string;
    firstName='';
    secondName='';
    if(arrayName.length===1){
        firstName='';
        secondName=arrayName[0];
    }else if(arrayName.length>1){
        firstName=`${arrayName[0].toUpperCase()}_`;
        //delete first element array
        arrayName.splice(0,1);
        secondName=arrayName.join('').toUpperCase();
    }
    var fname=`${firstName.toLowerCase()}${secondName.toLowerCase()}`;

    con=`#include "${widgetName.toLowerCase()}.h"

    /* Properties enum*/
    enum
    {
        P_0,    // for padding
        P_VALUE // for value
    };
    
    /* Private data structure */
    struct _${widgetName}Private
    {
        gdouble value;
        GdkWindow *window;
    };
    
    /* Internal API */
    static void ${fname}_set_property(GObject *object, guint prop_id, const GValue *value, GParamSpec *pspec);
    static void ${fname}_get_property(GObject *object, guint prop_id, GValue *value, GParamSpec *pspec);
    static void ${fname}_size_allocate(GtkWidget *widget, GtkAllocation *allocation);
    static void ${fname}_realize(GtkWidget *widget);
    static gboolean ${fname}_draw(GtkWidget *widget, cairo_t *cr);
    static void ${fname}_get_preferred_height(GtkWidget *widget, gint *minimum_height, gint *natural_height);
    static void ${fname}_get_preferred_width(GtkWidget *widget, gint *minimum_width, gint *natural_width);    
    
    /* Define type */
    // G_DEFINE_TYPE(${widgetName}, ${fname}, GTK_TYPE_WIDGET);//deprecated
    G_DEFINE_TYPE_WITH_PRIVATE(${widgetName},${fname},GTK_TYPE_WIDGET);
    
    /* Initialization */
    static void ${fname}_class_init(${widgetName}Class *klass)
    {
        GObjectClass *g_class;
        GtkWidgetClass *w_class;
        GParamSpec *pspec;
    
        g_class = G_OBJECT_CLASS(klass);
        /* Override widget class methods */
        g_class->set_property = ${fname}_set_property;
        g_class->get_property = ${fname}_get_property;
    
        w_class = GTK_WIDGET_CLASS(klass);
        /* Override widget class methods */
        w_class->realize = ${fname}_realize;
        w_class->get_preferred_height = ${fname}_get_preferred_height;
        w_class->get_preferred_width = ${fname}_get_preferred_width;
        // w_class->size_request=${fname}_size_request;
        w_class->size_allocate = ${fname}_size_allocate;
        w_class->draw = ${fname}_draw;
    
        /* Install Property */
        pspec=g_param_spec_double("value","Value","Value will show",0,1,0,G_PARAM_READWRITE|G_PARAM_STATIC_STRINGS);
    
        g_object_class_install_property(g_class,P_VALUE,pspec);
    }
    
    static void ${fname}_init(${widgetName} *widget)
    {
        ${widgetName}Private *priv;
        // priv = G_TYPE_INSTANCE_GET_PRIVATE(widget, ${firstName}TYPE_${secondName}, ${widgetName}Private);//deprecated
        priv=${fname}_get_instance_private(widget);
        gtk_widget_set_has_window(GTK_WIDGET(widget), TRUE);
    
        //set default value
        priv->value = 0;
    
        //create cache for faster access
        widget->priv = priv;
    }
    
    /* Override Methods */
    static void ${fname}_set_property(GObject *object, guint prop_id, const GValue *value, GParamSpec *pspec)
    {
        ${widgetName} *widget = ${firstName}${secondName}(object);
        switch (prop_id)
        {
        case P_VALUE:
            ${fname}_set_value(widget, g_value_get_double(value));
            break;
    
        default:
            G_OBJECT_WARN_INVALID_PROPERTY_ID(object, prop_id, pspec);
            break;
        }
    }
    static void ${fname}_get_property(GObject *object, guint prop_id, GValue *value, GParamSpec *pspec)
    {
        ${widgetName} *widget = ${firstName}${secondName}(object);
        switch (prop_id)
        {
        case P_VALUE:
            g_value_set_double(value, widget->priv->value);
            break;
    
        default:
            G_OBJECT_WARN_INVALID_PROPERTY_ID(object, prop_id, pspec);
            break;
        }
    }
    static void ${fname}_size_allocate(GtkWidget *widget, GtkAllocation *allocation)
    {
        ${widgetName}Private *priv = ${firstName}${secondName}(widget)->priv;
        gtk_widget_set_allocation(widget, allocation);
        if (gtk_widget_get_realized(widget))
        {
            gdk_window_move_resize(priv->window, allocation->x, allocation->y, allocation->width, allocation->height);
        }
    }
    static void ${fname}_realize(GtkWidget *widget)
    {
        ${widgetName}Private *priv = ${firstName}${secondName}(widget)->priv;
        GtkAllocation alloc;
        GdkWindowAttr attrs;
        gint attrs_mask;
    
        gtk_widget_set_realized(widget, TRUE);
        gtk_widget_get_allocation(widget, &alloc);
        attrs.x = alloc.x;
        attrs.y = alloc.y;
        attrs.width = alloc.width;
        attrs.height = alloc.height;
        attrs.window_type = GDK_WINDOW_CHILD;
        attrs.wclass = GDK_INPUT_OUTPUT;
        attrs.event_mask = gtk_widget_get_events(widget) | GDK_EXPOSURE_MASK;
    
        attrs_mask = GDK_WA_X | GDK_WA_Y;
    
        priv->window = gdk_window_new(gtk_widget_get_parent_window(widget), &attrs, attrs_mask);
        gdk_window_set_user_data(priv->window, widget);
        gtk_widget_set_window(widget, priv->window);
        //style
    }
    static gboolean ${fname}_draw(GtkWidget *widget, cairo_t *cr)
    {
        ${widgetName}Private *priv = ${firstName}${secondName}(widget)->priv;
        GtkAllocation alloc;
        gtk_widget_get_allocation(widget,&alloc);
        cairo_set_source_rgb(cr,0,0,1);
        cairo_rectangle(cr,priv->value,priv->value,((double)alloc.width)-(2*priv->value),((double)alloc.height)-(2*priv->value));
        cairo_fill(cr);
        // cairo_destroy(cr);
        return FALSE;
    }
    static void ${fname}_get_preferred_height(GtkWidget *widget, gint *minimum_height, gint *natural_height)
    {
        (void)widget;
        *minimum_height = 90;
        *natural_height = 300;
    }
    static void ${fname}_get_preferred_width(GtkWidget *widget, gint *minimum_width, gint *natural_width)
    {
        (void)widget;
        *minimum_width = 90;
        *natural_width = 300;
    }
    
    /* Public API */
    GtkWidget *${fname}_new(void){
        return (g_object_new(${firstName}TYPE_${secondName},NULL));
    }
    
    gdouble ${fname}_get_value(${widgetName} *widget){
        g_return_val_if_fail(${firstName}IS_${secondName}(widget),0);
        return (widget->priv->value);
    }
    
    void ${fname}_set_value(${widgetName} *widget, gdouble value){
        g_return_if_fail(${firstName}_IS_${secondName}(widget));
        widget->priv->value=value;
        gtk_widget_queue_draw(GTK_WIDGET(widget));
    }`;
    return con;
}