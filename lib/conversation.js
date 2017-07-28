import { CompositeDisposable, Disposable, TextEditor } from "atom";
import etch from "etch";
import { postConversation, formatSlackMessages, formatAgo } from "./helpers";
import leftPad from "left-pad";

const $ = etch.dom;
const CONVERSATION_ID = "codesidestory.conversation";
const KEY_ENTER = 13;

class Convo {
  constructor({ lines, onSend, onHide }) {
    this.lines = lines;
    this.onSend = onSend;
    this.onHide = onHide;

    this.disposables = new CompositeDisposable();
    this.inputdisp = new CompositeDisposable();
    this.disposables.add(this.inputdisp);

    etch.initialize(this);
    this.disposables.add(new Disposable(() => etch.destroy(this)));

    const inputView = atom.views.getView(this.refs.input);

    this.disposables.add(
      atom.commands.add(inputView, {
        "codesidestory:post-comment": this.postConvo.bind(this)
      })
    );
    this.disposables.add(
      atom.commands.add(inputView, {
        "codesidestory:hide-comment": onHide
      })
    );
    setTimeout(() => this.update.call(this, lines), 300);
  }

  focus = () => this.refs.input.element.focus();

  scrollToBottom = () =>
    (this.refs.container.scrollTop = this.refs.container.scrollHeight);

  writeAfterUpdate = () => {
    atom.views.getView(this.refs.input).classList.add("css-input");
    this.scrollToBottom();
    this.focus();
  };

  readAfterUpdate = () => {
    const editor = this.refs.input;
    this.inputdisp.dispose();
    this.inputdisp.add(
      atom.textEditors.add(editor),
      atom.textEditors.maintainGrammar(editor),
      atom.textEditors.maintainConfig(editor)
    );
  };

  update = lines => {
    this.lines = lines;
    this.scrollToBottom();
    return etch.update(this);
  };

  renderLine = line => {
    return $.div(
      {
        className: "css-convo-line"
      },
      $.div(
        { className: "text-subtle pull-right css-ago" },
        formatAgo(line.event_ts)
      ),
      $.div({
        innerHTML: formatSlackMessages(line.text)
      })
    );
  };

  postConvo = event => {
    this.onSend(this.refs.input.getText());
    this.refs.input.setText("");
  };

  render = () => {
    return $.div(
      { className: "css-convo inline-block" },
      $.div(
        { className: "css-close-chat", onClick: () => this.onHide() },
        $.i({ className: "icon icon-x" })
      ),
      $.div(
        { className: "css-lines-wrapper", ref: "container" },
        ...this.lines.map(this.renderLine)
      ),
      $.div(
        { className: "css-input-wrapper" },
        $(TextEditor, {
          ref: "input",
          mini: true
        })
      )
    );
  };

  destroy = () => this.disposables.dispose();
}

export default class Conversation {
  constructor({ editor, codeLineNo, codeLineRef, channelId, visible }) {
    this.editor = editor;
    this.codeLineRef = codeLineRef;
    this.codeLineNo = codeLineNo;
    this.channelId = channelId;

    this.lines = [];

    this.disposables = new CompositeDisposable();

    etch.initialize(this);
    this.disposables.add(new Disposable(() => etch.destroy(this)));

    this.toggleConvo = this.toggleConvo.bind(this);
    this.refs.convo.addEventListener("click", this.toggleConvo);
    this.disposables.add(
      new Disposable(() =>
        this.refs.convo.removeEventListener("click", this.toggleConvo)
      )
    );

    const convosRef = this.codeLineRef.child("convos");
    convosRef.on("child_added", this.onLineAdded.bind(this));
    this.disposables.add(new Disposable(() => convosRef.off()));

    if (visible) {
      this.visible = false;
      this.toggleConvo();
    }
  }

  update = () => etch.update(this);

  onLineAdded = lineSnap => {
    const lineObj = lineSnap.val();
    if (!lineObj) {
      return;
    }
    this.lines.push(lineObj);
    this.thread_ts = lineObj.thread_ts;

    if (this.visible) {
      this.update();
      if (this.convo) {
        this.convo.update(this.lines);
      }
    }
  };

  toggleConvo = () => {
    const { editor, codeLineNo, lines } = this;
    const markers = this.editor.findMarkers({ CONVERSATION_ID, codeLineNo });
    if (markers.length > 0) {
      this.visible = false;
      markers.map(marker => marker.destroy()); // this.convo should be destroyed here.
      this.convo = null;
    } else {
      this.visible = true;
      const item = new Convo({
        lines,
        onSend: this.onSend.bind(this),
        onHide: this.toggleConvo.bind(this)
      });
      this.convo = item;
      const marker = editor.markScreenPosition([codeLineNo, 0]);
      marker.setProperties({ CONVERSATION_ID, codeLineNo });

      editor
        .decorateMarker(marker, { type: "overlay", position: "after", item })
        .onDidDestroy(() => item.destroy());

      this.disposables.add(new Disposable(() => marker.destroy()));
    }
  };

  getChatData = () => {
    const { codeLineNo, data } = this;
    if (data) {
      return Promise.resolve(data);
    }
    return this.codeLineRef.once("value").then(snap => {
      this.data = snap.val() ? snap.val() : { codeLineNo };
      return this.data;
    });
  };

  getTextWithCode = () => {
    const { start, end } = this.editor.getCurrentParagraphBufferRange();
    const padLen = String(end.row).length + 2; // +2 for ">>"
    const [, filePath] = atom.project.relativizePath(this.editor.getPath());
    const lines = [];
    for (var i = start.row; i <= end.row; i++) {
      const line = this.editor.lineTextForBufferRow(i);
      let lineNo = leftPad(i, padLen);
      if (this.codeLineNo === i) {
        lineNo = ">>" + lineNo.substring(2);
      }
      lines.push(`${lineNo} ${line}`);
    }
    return `>${filePath}\n` + "```" + lines.join("\n") + "```\n";
  };

  onSend = text => {
    let code;
    if (!this.thread_ts) {
      // start of thread. post code.
      code = this.getTextWithCode();
    }
    postConversation({
      ref: this.codeLineRef.toString(),
      event: {
        text,
        code,
        channel: this.channelId,
        thread_ts: this.thread_ts
      }
    });
  };

  render() {
    return $.div({
      className: "icon icon-comment-discussion css-convo-icon",
      ref: "convo"
    });
  }

  destroy = () => this.disposables.dispose();
}
