from typing import Callable, Optional

from nicegui.element import Element
from nicegui.elements.mixins.value_element import ValueElement


class CodeMirror(ValueElement, component="codemirror.js"):

    def __init__(
        self,
        value: str = "",
        on_change: Optional[Callable] = None,
        mode: str = "python",
    ) -> None:
        super().__init__(value=value, on_value_change=on_change)
        self._props["value"] = value
        self._props["mode"] = mode

        def change_handler(e):
            self.value = e.args["value"]

        self.on("change", change_handler)

    def update(self) -> None:
        super().update()
        self._props["value"] = self.value
        self.run_method("update")
