<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://gitlab.com/yogiastawan/gisa-gtk-3-project/-/raw/master/icon/icon.png" alt="Project logo"></a>
</p>

<h3 align="center">Gisa GTK+3 Project</h3>

<div align="center">

</div>

---

# Description
Visual Studio Code extension to easily create gtk + 3 projects with **C** language. Run **ctrl+shift+P** and select **Create Gtk+3 Project**.

![Demo](https://gitlab.com/yogiastawan/gisa-gtk-3-project/-/raw/master/gisa-gtk-3-demo.gif)

# Features
features in gisa-gtk3-project extensions includes: 
* auto create project structure
    * *src* : contains c source code of project.
    * *res* : cotains resource of project.
    * *res/menu* : contains xml file (**.ui**) for menu gui.
    * *res/ui* : contains xml file (**.ui**) for gui.
* auto create **Makefile** for building project. Run **make** in project path will building project for release in folder build-release. Run **make debug** will build project for debug in folder build-debug. Run **make clean** to delete all files have been built.
* auto create source code like: *c* file, *menu* file, *window ui* file, and *resource* file.


# Requirements
make sure you install all libraries to compile and run gtk+3 projects, including:
* gtk3-devel
* gstreamer-devel
* clutter-devel
* webkit2gtk3-devel
* libgda-devel
* gobject-introspection-devel


