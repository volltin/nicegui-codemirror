export default {
  template: `<div class="w-full"></div>`,
  mounted() {
    function loadScript(url, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onload = callback;
      document.body.appendChild(script);
    }

    function loadStyle(url, callback) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = url;
      document.head.appendChild(link);
      link.onload = callback;
    }

    loadStyle(
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.62.0/codemirror.min.css",
      () => {
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.62.0/codemirror.min.js",
          () => {
            loadScript(
              `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.62.0/mode/${this.mode}/${this.mode}.min.js`,
              () => {
                this.init_editor();
              }
            );
          }
        );
      }
    );
  },

  methods: {
    init_editor() {
      // docs: https://codemirror.net/5/doc/manual.html#config
      this.editor = CodeMirror(this.$el, {
        value: this.value,
        mode: this.mode,
        lineNumbers: true,
        autorefresh: true,
        indentUnit: 4,
        smartIndent: true,
        tabSize: 4,
        indentWithTabs: false,
        inputStyle: "contenteditable",
      });

      this.editor.on("change", () => {
        const value = this.editor.getValue();
        this.$emit("change", { value });
      });

      this.editor.on("focus", () => {
        this.$emit("focus");
      });

      this.editor.on("blur", () => {
        this.$emit("blur");
      });
    },

    update() {
      if (this.editor) {
        this.editor.value = this.value;
        if (this.editor.getValue() !== this.value) {
          this.editor.setValue(this.value);
        }
      }
    }
  },
  props: {
    mode: String,
    value: String,
  },
};
