export function contentMakeFileProject(nameApp: string) {
    var con: string;
    con = "release:\n" +
    "\t@echo -e \"=>\\e[94mCreate \\\"\\e[4m"+nameApp+"\\e[24m\\\" executable to release\\e[0m\"\n" +
        "\t@mkdir -p build-release\n" +
        "\t@cd res; make -f resource.mk release\n" +
        "\t@cd src; make -f source.mk release\n\n" +
        "debug:\n" +
        "\t@mkdir -p build-debug\n" +
        "\t@echo -e \"=>\\e[94mCreate \\\"\\e[4m"+nameApp+"\\e[24m\\\" executable to debug\\e[0m\"\n" +
        "\t@cd res; make -f resource.mk debug\n" +
        "\t@cd src; make -f source.mk debug\n\n" +
        "clean:\n" +
        "\t@cd res; make -f resource.mk clean\n" +
        "\t@cd src; make -f source.mk clean\n" +
        "\t@rm -rf build-debug\n" +
        "\t@rm -rf build-release\n";
    return con;
}

export function contentMakeFileSrc(nameApp: string) {
    var name = nameApp.replace(/ /g, '_').toLowerCase();
    var nameFile=nameApp.replace(/ /g,'');
    var con: string;
    con = "CC= gcc\n" +
        "CFLAGS= -Wall -Werror -Wextra -v -std=c99\n" +
        "DBGCFLAGS= -g\n\n" +
        "GTKFLAGS=`pkg-config --cflags --libs gtk+-3.0`\n" +

        "SRC = $(wildcard *.c)\n" +
        "OBJ = $(SRC:.c=.o)\n" +
        "EXEC= " + nameFile + "\n\n" +

        "RELBUILDDIR=../build-release/\n" +
        "DBGBUILDDIR=../build-debug/\n" +

        "RELOBJS=$(addprefix $(RELBUILDDIR)src/, $(OBJ))\n" +
        "DBGOBJS=$(addprefix $(DBGBUILDDIR)src/, $(OBJ))\n" +

        "RELOBJRES=$(wildcard $(RELBUILDDIR)res/*.o)\n" +
        "DBGOBJRES=$(wildcard $(DBGBUILDDIR)res/*.o)\n" +

        "RELEXEC=$(addprefix $(RELBUILDDIR), $(EXEC))\n" +
        "DBGEXEC=$(addprefix $(DBGBUILDDIR), $(EXEC))\n" +

        "release: $(RELEXEC)\n" +

        "debug: $(DBGEXEC)\n" +

        "$(RELEXEC): $(RELOBJS) $(RELOBJRES)\n" +
        "\t@echo -e \"=>\\e[94mCreate \\\"\\e[4m$(@F)\\e[24m\\\" executable to release\\e[0m\"\n" +
        "\t$(CC) $(CFLAGS) -o $@ $^ $(GTKFLAGS)\n" +
        "\t@echo -e \"=>\\e[92mCreating \\\"\\e[4m$(@F)\\e[24m\\\" into \\\"\\e[4m$(@D)\\e[24m\\\" Success\\e[0m\"\n\n" +

        "$(RELBUILDDIR)src/%.o: %.c\n" +
        "\t@echo -e \"=>\\e[94mPreparing \\\"\\e[4m$<\\e[24m\\\" to release\\e[0m\"\n\n" +
        "\t@mkdir -p $(RELBUILDDIR)/src/$(<D)\n" +
        "\t$(CC)  $(CFLAGS) -c $< -o $@ $(GTKFLAGS)\n" +
        "\t@echo -e \"=>\\e[92mBuilding \\\"\\e[4m$(@F)\\e[24m\\\" into \\\"\\e[4m$(@D)\\e[24m\\\" Success\\e[0m\"\n\n" +

        "############################# FOR DEBUG #######################\n\n" +

        "$(DBGEXEC): $(DBGOBJS) $(DBGOBJRES)\n" +
        "\t@echo -e \"=>\\e[94mCreate \\\"\\e[4m$(@F)\\e[24m\\\" executable to debug\\e[0m\"\n" +
        "\t$(CC) $(CFLAGS) $(DBGCFLAGS) -o $@ $^ $(GTKFLAGS)\n" +
        "\t@echo -e \"=>\\e[92mCreating \\\"\\e[4m$(@F)\\e[24m\\\" into \\\"\\e[4m$(@D)\\e[24m\\\" Success\\e[0m\"\n\n" +

        "#create all object file (.o) for debug\n" +
        "$(DBGBUILDDIR)src/%.o: %.c\n" +
        "\t@echo -e \"=>\\e[94mPreparing \\\"\\e[4m$<\\e[24m\\\" to debug\\e[0m\"\n" +
        "\t@mkdir -p $(DBGBUILDDIR)src/$(<D)\n" +
        "\t$(CC) $(CFLAGS) $(DBGCFLAGS) -c $< -o $@ $(GTKFLAGS)\n" +
        "\t@echo -e \"=>\\e[92mBuilding \\\"\\e[4m$(@F)\\e[24m\\\" into \\\"\\e[4m$(@D)\\e[24m\\\" Success\\e[0m\"\n\n" +

        "clean:\n" +
        "\t@echo -e \"=>\\e[94mDeleting all object file\\e[0m\"\n" +
        "\trm -f $(RELOBJS) $(DBGOBJS)\n" +
        "\t@echo -e \"=>\\e[94mDeleting all executable file\\e[0m\"\n" +
        "\trm -f $(RELEXEC) $(DBGEXEC)\n" +
        "\t@echo -e \"=>\\e[94mDeleting all folder container\\e[0m\"\n" +
        "\trm -rf $(RELBUILDDIR)src $(DBGBUILDDIR)src";
    return con;
}

export function contentMakeFileRes(nameApp: string) {
    var con: string;
    con = "CC= gcc\n" +
        "CFLAGS= -Wall -Werror -Wextra -v -std=c99\n" +
        "DBGCFLAGS= -g\n" +
        "GTK_FLAGS=`pkg-config --cflags --libs gtk+-3.0`\n" +

        "RELBUILDDIR=../build-release/\n" +
        "DBGBUILDDIR=../build-debug/\n" +

        "RES = $(wildcard *.gresource.xml)\n" +
        "CFILE=$(RES:.gresource.xml=.c)\n" +
        "OBJ = $(RES:.gresource.xml=.o)\n" +
        "RELOBJ=$(addprefix $(RELBUILDDIR)res/, $(OBJ))\n" +
        "RELCFILE=$(addprefix $(RELBUILDDIR)res/, $(CFILE))\n" +

        "DBGOBJ=$(addprefix $(DBGBUILDDIR)res/, $(OBJ))\n" +
        "DBGCFILE=$(addprefix $(DBGBUILDDIR)res/, $(CFILE))\n" +

        "release: $(RELOBJ)\n\n" +

        "debug:  $(DBGOBJ)\n\n" +

        "$(RELBUILDDIR)res/%.o: $(RELBUILDDIR)res/%.c\n" +
        "\t@echo -e \"=>\\e[94mPreparing \\\"\\e[4m$<\\e[24m\\\" to release\\e[0m\"\n" +
        "\t$(CC) $(CFLAGS) -c $< -o $@ $(GTK_FLAGS)\n\n" +
        "\t@echo -e \"=>\\e[92mCreating \\\"\\e[4m$(@F)\\e[24m\\\" into \\\"\\e[4m$(@D)\\e[24m\\\" Success\\e[0m\"\n\n" +

        "$(RELBUILDDIR)res/%.c: %.gresource.xml\n" +
        "\t@echo -e \"=>\\e[94mCreate " + nameApp + "'s C resource file\\e[0m\"\n" +
        "\t@mkdir -p $(RELBUILDDIR)res/$(<D)\n" +
        "\tglib-compile-resources --target=$@ --generate-source $<\n" +
        "\t@echo -e \"=>\\e[92mCreating \\\"\\e[4m$(@F)\\e[24m\\\" into \\\"\\e[4m$(@D)\\e[24m\\\" Success\\e[0m\"\n\n" +

        "##################DEBUG#########################\n\n" +

        "$(DBGBUILDDIR)res/%.o: $(DBGBUILDDIR)res/%.c\n" +
        "\t@echo -e \"=>\\e[94mPreparing \\\"\\e[4m$<\\e[24m\\\" to debug\\e[0m\"\n" +
        "\t$(CC) $(DBGCFLAGS) $(CFLAGS) -c $< -o $@ $(GTK_FLAGS)\n\n" +
        "\t@echo -e \"=>\\e[92mCreating \\\"\\e[4m$(@F)\\e[24m\\\" into \\\"\\e[4m$(@D)\\e[24m\\\" Success\\e[0m\"\n\n" +

        "$(DBGBUILDDIR)res/%.c: %.gresource.xml\n" +
        "\t@echo -e \"=>\\e[94mCreate " + nameApp + "'s C resource file\\e[0m\"\n" +
        "\t@mkdir -p $(DBGBUILDDIR)res/$(<D)\n" +
        "\tglib-compile-resources --target=$@ --generate-source $<\n" +
        "\t@echo -e \"=>\\e[92mCreating \\\"\\e[4m$(@F)\\e[24m\\\" into \\\"\\e[4m$(@D)\\e[24m\\\" Success\\e[0m\"\n\n" +

        "clean:\n" +
        "\trm -f $(RELOBJ) $(RELCFILE) $(DBGOBJ) $(DBGCFILE)\n" +
        "\trm -rf $(RELBUILDDIR)res $(DBGBUILDDIR)res/";
    return con;
}