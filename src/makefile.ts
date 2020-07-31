export function contentMakeFileProject(nameApp: string) {
    var con: string;
    con = `release:
	@echo -e "=>\\e[94mCreate \\"\\e[4m${nameApp}\\e[24m\\" executable to release\\e[0m"
	@mkdir -p build-release
	@cd res; make -f resource.mk release
	@cd src; make -f source.mk release

debug:
	@mkdir -p build-debug
	@echo -e "=>\\e[94mCreate \\"\\e[4m${nameApp}\\e[24m\\" executable to debug\\e[0m"
	@cd res; make -f resource.mk debug
	@cd src; make -f source.mk debug

clean:
	@cd res; make -f resource.mk clean
	@cd src; make -f source.mk clean
	@rm -rf build-debug
	@rm -rf build-release
`;
    return con;
}

export function contentMakeFileSrc(nameApp: string) {
    var name = nameApp.replace(/ /g, '_').toLowerCase();
    var nameFile = nameApp.replace(/ /g, '');
    var con: string;
    con = `CC= gcc
CFLAGS= -Wall -Werror -Wextra -v -std=c99
DBGCFLAGS= -g

GTKFLAGS=\`pkg-config --cflags --libs gtk+-3.0\`
SRC = $(wildcard *.c)
OBJ = $(SRC:.c=.o)
EXEC= ${nameFile}

RELBUILDDIR=../build-release/
DBGBUILDDIR=../build-debug/
RELOBJS=$(addprefix $(RELBUILDDIR)src/, $(OBJ))
DBGOBJS=$(addprefix $(DBGBUILDDIR)src/, $(OBJ))
RELOBJRES=$(wildcard $(RELBUILDDIR)res/*.o)
DBGOBJRES=$(wildcard $(DBGBUILDDIR)res/*.o)
RELEXEC=$(addprefix $(RELBUILDDIR), $(EXEC))
DBGEXEC=$(addprefix $(DBGBUILDDIR), $(EXEC))
release: $(RELEXEC)
debug: $(DBGEXEC)
$(RELEXEC): $(RELOBJS) $(RELOBJRES)
	@echo -e "=>\\e[94mCreate \\"\\e[4m$(@F)\\e[24m\\" executable to release\\e[0m"
	$(CC) $(CFLAGS) -o $@ $^ $(GTKFLAGS)
	@echo -e "=>\\e[92mCreating \\"\\e[4m$(@F)\\e[24m\\" into \\"\\e[4m$(@D)\\e[24m\\" Success\\e[0m"

$(RELBUILDDIR)src/%.o: %.c
	@echo -e "=>\\e[94mPreparing \\"\\e[4m$<\\e[24m\\" to release\\e[0m"

	@mkdir -p $(RELBUILDDIR)/src/$(<D)
	$(CC)  $(CFLAGS) -c $< -o $@ $(GTKFLAGS)
	@echo -e "=>\\e[92mBuilding \\"\\e[4m$(@F)\\e[24m\\" into \\"\\e[4m$(@D)\\e[24m\\" Success\\e[0m"

############################# FOR DEBUG #######################

$(DBGEXEC): $(DBGOBJS) $(DBGOBJRES)
	@echo -e "=>\\e[94mCreate \\"\\e[4m$(@F)\\e[24m\\" executable to debug\\e[0m"
	$(CC) $(CFLAGS) $(DBGCFLAGS) -o $@ $^ $(GTKFLAGS)
	@echo -e "=>\\e[92mCreating \\"\\e[4m$(@F)\\e[24m\\" into \\"\\e[4m$(@D)\\e[24m\\" Success\\e[0m"

#create all object file (.o) for debug
$(DBGBUILDDIR)src/%.o: %.c
	@echo -e "=>\\e[94mPreparing \\"\\e[4m$<\\e[24m\\" to debug\\e[0m"
	@mkdir -p $(DBGBUILDDIR)src/$(<D)
	$(CC) $(CFLAGS) $(DBGCFLAGS) -c $< -o $@ $(GTKFLAGS)
	@echo -e "=>\\e[92mBuilding \\"\\e[4m$(@F)\\e[24m\\" into \\"\\e[4m$(@D)\\e[24m\\" Success\\e[0m"

clean:
	@echo -e "=>\\e[94mDeleting all object file\\e[0m"
	rm -f $(RELOBJS) $(DBGOBJS)
	@echo -e "=>\\e[94mDeleting all executable file\\e[0m"
	rm -f $(RELEXEC) $(DBGEXEC)
	@echo -e "=>\\e[94mDeleting all folder container\\e[0m"
	rm -rf $(RELBUILDDIR)src $(DBGBUILDDIR)src`;
    return con;
}

export function contentMakeFileRes(nameApp: string) {
    var con: string;
    con = `CC= gcc
CFLAGS= -Wall -Werror -Wextra -v -std=c99
DBGCFLAGS= -g
GTK_FLAGS=\`pkg-config --cflags --libs gtk+-3.0\`
RELBUILDDIR=../build-release/
DBGBUILDDIR=../build-debug/
RES = $(wildcard *.gresource.xml)
CFILE=$(RES:.gresource.xml=.c)
OBJ = $(RES:.gresource.xml=.o)
RELOBJ=$(addprefix $(RELBUILDDIR)res/, $(OBJ))
RELCFILE=$(addprefix $(RELBUILDDIR)res/, $(CFILE))
DBGOBJ=$(addprefix $(DBGBUILDDIR)res/, $(OBJ))
DBGCFILE=$(addprefix $(DBGBUILDDIR)res/, $(CFILE))
release: $(RELOBJ)

debug:  $(DBGOBJ)

$(RELBUILDDIR)res/%.o: $(RELBUILDDIR)res/%.c
	@echo -e "=>\\e[94mPreparing \\"\\e[4m$<\\e[24m\\" to release\\e[0m"
	$(CC) $(CFLAGS) -c $< -o $@ $(GTK_FLAGS)

	@echo -e "=>\\e[92mCreating \\"\\e[4m$(@F)\\e[24m\\" into \\"\\e[4m$(@D)\\e[24m\\" Success\\e[0m"

$(RELBUILDDIR)res/%.c: %.gresource.xml
	@echo -e "=>\\e[94mCreate ${nameApp}'s C resource file\\e[0m"
	@mkdir -p $(RELBUILDDIR)res/$(<D)
	glib-compile-resources --target=$@ --generate-source $<
	@echo -e "=>\\e[92mCreating \\"\\e[4m$(@F)\\e[24m\\" into \\"\\e[4m$(@D)\\e[24m\\" Success\\e[0m"

##################DEBUG#########################

$(DBGBUILDDIR)res/%.o: $(DBGBUILDDIR)res/%.c
	@echo -e "=>\\e[94mPreparing \\"\\e[4m$<\\e[24m\\" to debug\\e[0m"
	$(CC) $(DBGCFLAGS) $(CFLAGS) -c $< -o $@ $(GTK_FLAGS)

	@echo -e "=>\\e[92mCreating \\"\\e[4m$(@F)\\e[24m\\" into \\"\\e[4m$(@D)\\e[24m\\" Success\\e[0m"

$(DBGBUILDDIR)res/%.c: %.gresource.xml
	@echo -e "=>\\e[94mCreate ${nameApp}'s C resource file\\e[0m"
	@mkdir -p $(DBGBUILDDIR)res/$(<D)
	glib-compile-resources --target=$@ --generate-source $<
	@echo -e "=>\\e[92mCreating \\"\\e[4m$(@F)\\e[24m\\" into \\"\\e[4m$(@D)\\e[24m\\" Success\\e[0m"

clean:
	rm -f $(RELOBJ) $(RELCFILE) $(DBGOBJ) $(DBGCFILE)
	rm -rf $(RELBUILDDIR)res $(DBGBUILDDIR)res`;
    return con;
}