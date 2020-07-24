export function menuxml() {
    var cont: string;
    cont = "<?xml version=\"1.0\"?>\n" +
        "<interface>\n" +
        "\t<!-- interface-requires gtk+ 3.0 -->\n" +
        "\t<menu id=\"menubar\">\n" +
        "\t<submenu>\n" +
        "\t\t<attribute name=\"label\" translatable=\"yes\">_File</attribute>\n" +
        "\t\t\t<section>\n" +
        "\t\t\t\t<item>\n" +
        "\t\t\t\t\t<attribute name=\"label\" translatable=\"yes\">_New</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"action\">app.new</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"accel\">&lt;Primary&gt;n</attribute>\n" +
        "\t\t\t\t</item>\n" +
        "\t\t\t\t<item>\n" +
        "\t\t\t\t\t<attribute name=\"label\" translatable=\"yes\">_Open</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"action\">app.open</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"accel\">&lt;Primary&gt;o</attribute>\n" +
        "\t\t\t\t</item>\n" +
        "\t\t\t\t<item>\n" +
        "\t\t\t\t\t<attribute name=\"label\" translatable=\"yes\">_Save</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"action\">app.save</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"accel\">&lt;Primary&gt;s</attribute>\n" +
        "\t\t\t\t</item>\n" +
        "\t\t\t\t<item>\n" +
        "\t\t\t\t\t<attribute name=\"label\" translatable=\"yes\">Save As</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"action\">app.saveas</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"accel\">&lt;Primary&gt;&lt;Shift&gt;s</attribute>\n" +
        "\t\t\t\t</item>\n" +
        "\t\t\t</section>\n" +
        "\t\t\t<section>\n" +
        "\t\t\t\t<item>\n" +
        "\t\t\t\t\t<attribute name=\"label\" translatable=\"yes\">_Quit</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"action\">app.quit</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"accel\">&lt;Primary&gt;q</attribute>\n" +
        "\t\t\t\t</item>\n" +
        "\t\t\t</section>\n" +
        "\t\t</submenu>\n" +
        "\t\t<submenu>\n" +
        "\t\t\t<attribute name=\"label\" translatable=\"yes\">_Edit</attribute>\n" +
        "\t\t\t<section>\n" +
        "\t\t\t\t<item>\n" +
        "\t\t\t\t\t<attribute name=\"label\" translatable=\"yes\">Menu item 1</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"action\">app.menu</attribute>\n" +
        "\t\t\t\t</item>\n" +
        "\t\t\t</section>\n" +
        "\t\t\t<section>\n" +
        "\t\t\t\t<item>\n" +
        "\t\t\t\t\t<attribute name=\"label\" translatable=\"yes\">_Preferences</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"action\">app.preferences</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"accel\">&lt;Primary&gt;e</attribute>\n" +
        "\t\t\t\t</item>\n" +
        "\t\t\t</section>\n" +
        "\t\t</submenu>\n" +
        "\t\t<submenu>\n" +
        "\t\t\t<attribute name=\"label\" translatable=\"yes\">_Help</attribute>\n" +
        "\t\t\t<section>\n" +
        "\t\t\t\t<item>\n" +
        "\t\t\t\t\t<attribute name=\"label\" translatable=\"yes\">About</attribute>\n" +
        "\t\t\t\t\t<attribute name=\"action\">app.about</attribute>\n" +
        "\t\t\t\t</item>\n" +
        "\t\t\t</section>\n" +
        "\t\t</submenu>\n" +
        "\t</menu>\n\n" +

        "\t<menu id=\"appmenu\">\n" +
        "\t\t<section>\n" +
        "\t\t\t<item>\n" +
        "\t\t\t\t<attribute name=\"label\" translatable=\"yes\">_New</attribute>\n" +
        "\t\t\t\t<attribute name=\"action\">app.new</attribute>\n" +
        "\t\t\t</item>\n" +
        "\t\t\t<item>\n" +
        "\t\t\t\t<attribute name=\"label\" translatable=\"yes\">_Open</attribute>\n" +
        "\t\t\t\t<attribute name=\"action\">app.open</attribute>\n" +
        "\t\t\t</item>\n" +
        "\t\t</section>\n" +
        "\t</menu>\n" +
        "</interface>";
    return cont;
}