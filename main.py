from nicegui import ui

from codemirror import CodeMirror


@ui.page("/")
async def home():
    with ui.card().classes("w-1/2"):
        code_editor = (
            CodeMirror()
            .on(
                "change",
                lambda e: ui.notify(f"The value changed to {e.args['value']}."),
            )
            .on("focus", lambda e: ui.notify(f"The editor got focus."))
            .on("blur", lambda e: ui.notify(f"The editor lost focus."))
        )

        ui.textarea().bind_value(code_editor, "value")

        ui.button("Show value").on("click", lambda: ui.notify(code_editor.value))


ui.run()
