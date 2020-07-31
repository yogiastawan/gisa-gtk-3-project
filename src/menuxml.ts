export function menuxmlcontent() {
    var cont: string;
    cont = `<?xml version="1.0"?>
<interface>
	<!-- interface-requires gtk+ 3.0 -->
	<menu id="menubar">
	<submenu>
		<attribute name="label" translatable="yes">_File</attribute>
			<section>
				<item>
					<attribute name="label" translatable="yes">_New</attribute>
					<attribute name="action">app.new</attribute>
					<attribute name="accel">&lt;Primary&gt;n</attribute>
				</item>
				<item>
					<attribute name="label" translatable="yes">_Open</attribute>
					<attribute name="action">app.open</attribute>
					<attribute name="accel">&lt;Primary&gt;o</attribute>
				</item>
				<item>
					<attribute name="label" translatable="yes">_Save</attribute>
					<attribute name="action">app.save</attribute>
					<attribute name="accel">&lt;Primary&gt;s</attribute>
				</item>
				<item>
					<attribute name="label" translatable="yes">Save As</attribute>
					<attribute name="action">app.saveas</attribute>
					<attribute name="accel">&lt;Primary&gt;&lt;Shift&gt;s</attribute>
				</item>
			</section>
			<section>
				<item>
					<attribute name="label" translatable="yes">_Quit</attribute>
					<attribute name="action">app.quit</attribute>
					<attribute name="accel">&lt;Primary&gt;q</attribute>
				</item>
			</section>
		</submenu>
		<submenu>
			<attribute name="label" translatable="yes">_Edit</attribute>
			<section>
				<item>
					<attribute name="label" translatable="yes">Menu item 1</attribute>
					<attribute name="action">app.menu</attribute>
				</item>
			</section>
			<section>
				<item>
					<attribute name="label" translatable="yes">_Preferences</attribute>
					<attribute name="action">app.preferences</attribute>
					<attribute name="accel">&lt;Primary&gt;e</attribute>
				</item>
			</section>
		</submenu>
		<submenu>
			<attribute name="label" translatable="yes">_Help</attribute>
			<section>
				<item>
					<attribute name="label" translatable="yes">About</attribute>
					<attribute name="action">app.about</attribute>
				</item>
			</section>
		</submenu>
	</menu>

	<menu id="appmenu">
		<section>
			<item>
				<attribute name="label" translatable="yes">_New</attribute>
				<attribute name="action">app.new</attribute>
			</item>
			<item>
				<attribute name="label" translatable="yes">_Open</attribute>
				<attribute name="action">app.open</attribute>
			</item>
		</section>
	</menu>
</interface>`;
    return cont;
}