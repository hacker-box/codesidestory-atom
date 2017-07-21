import { Disposable, CompositeDisposable, TextEditor } from "atom";
import etch from "etch";
import SelectList from "atom-select-list";
import { fbKeyEncode } from "./helpers";

const $ = etch.dom;

export default class RepoSettingsView {
  constructor(props) {
    this.props = props;

    this.disposables = new CompositeDisposable();

    this.showRepoList = this.props.repos.map(repo => !repo.url);
    this.rootPaths = atom.project.getPaths();

    etch.initialize(this);
    this.disposables.add(new Disposable(() => etch.destroy(this)));

    this.writeAfterUpdate();
    this.getModalPanel().show();
  }

  attachEvents = () => {
    this.refs.close.addEventListener("click", this.destroy);
    this.refs.cancel.addEventListener("click", this.destroy);
    this.refs.save.addEventListener("click", this.onSave);
    this.uidisposables.add(
      new Disposable(() => {
        this.refs.close.removeEventListener("click", this.destroy);
        this.refs.cancel.removeEventListener("click", this.destroy);
        this.refs.save.removeEventListener("click", this.onSave);
      })
    );
  };

  onClose = () => {
    this.getModalPanel().hide();
  };

  onSave = () => {
    if (this.refs.save.classList.contains("disabled")) {
      return;
    }
    if (this.props.onSave) {
      const { repos, channels } = this.props;
      this.props.onSave({ repos, channels });
    }
    this.destroy();
  };

  update = () => {
    this.uidisposables.dispose();
    return etch.update(this);
  };

  render = () => {
    return $.div(
      {},
      this.renderModalHeader(),
      this.renderRepos(),
      this.renderAction()
    );
  };

  renderChannelList = idx => {
    return $(SelectList, {
      emptyMessage: "No channels setup",
      ref: `list${idx}`,
      items: this.props.channels,
      filterKeyForItem: channel =>
        [channel.name, channel.purpose.value].join(" "),
      elementForItem: channel =>
        etch.render(
          $.li(
            { className: "two-lines" },
            $.div({ className: "text-highlight" }, channel.name),
            $.div({ className: "text-subtle" }, channel.purpose.value)
          )
        ),
      didConfirmSelection: channel => {
        this.props.repos = this.props.repos.map(
          (repo, i) => (i === idx ? { ...repo, channel } : repo)
        );
        this.showList = false;
        this.update();
      }
    });
  };

  renderModalHeader = () => {
    return $.div(
      { className: "css-header" },
      $.h1({}, "Repo Settings"),
      $.div({ className: "icon icon-x css-close", ref: "close" })
    );
  };

  renderChannel = (channel, idx) => {
    if (!channel) {
      return $.span({ className: "text-warning" }, "None selected");
    }
    return $.span({ className: "text-success" }, `#${channel.name}`);
  };

  writeAfterUpdate = () => {
    const { repos } = this.props;
    this.uidisposables = new CompositeDisposable();
    this.disposables.add(this.uidisposables);

    this.attachEvents();

    repos.forEach((repo, idx) => {
      const repoInput = this.refs[`repo${idx}`];
      const list = this.refs[`list${idx}`];
      if (repoInput) {
        if (repo.url) {
          repoInput.setText(repo.url);
        }
        this.uidisposables.add(
          repoInput.onDidStopChanging(e => {
            repo.url = repoInput.getText();
            repo.id = fbKeyEncode(repoInput.getText());
            this.update();
          })
        );
      }
      if (!repo.channel || !this.refs[`list${idx}`]) {
        return;
      }
      const chIdx = this.props.channels.findIndex(
        ch => ch.id === repo.channel.id
      );
      if (chIdx === -1) {
        return;
      }
      this.refs[`list${idx}`] && this.refs[`list${idx}`].selectIndex(chIdx);
    });
  };

  renderRepoList = idx => {
    return $(SelectList, {
      ref: `repoList${idx}`,
      items: this.props.repoIds,
      filterKeyForItem: repo => repo.url,
      elementForItem: repo =>
        etch.render(
          $.li(
            { className: "two-lines" },
            $.div({ className: "text-highlight" }, repo.url),
            $.div(
              { className: "text-subtle" },
              repo.channel ? `Channel: #${repo.channel.name}` : ""
            )
          )
        ),
      didConfirmSelection: repo => {
        const inp = this.refs[`repo${idx}`];
        this.props.repos[idx] = repo;
        if (inp) {
          inp.setText(repo.url);
        }
        this.showRepoList[idx] = false;
        this.update();
      }
    });
  };

  renderRepo = (repo, idx) => {
    const showList = !repo.channel || this.showList;
    const showRepoList =
      this.showRepoList[idx] && this.props.repoIds.length > 0;

    return $.li(
      { className: "list-item padded css-item" },
      $.div(
        { className: "css-block" },
        $.h4({}, `Project: ${this.rootPaths[idx]}`),
        this.showRepoList[idx]
          ? $(TextEditor, {
              mini: true,
              ref: `repo${idx}`,
              placeholderText: "Enter new repo url or select from list below"
            })
          : $.div(
              { className: "css-line-item" },
              $.span({}, "Repo : "),
              $.span({ className: "text-success" }, repo.url),
              !showRepoList
                ? $.a(
                    {
                      className: "css-link",
                      onClick: e => {
                        e.preventDefault();
                        this.showRepoList[idx] = true;
                        this.update();
                      }
                    },
                    "Change"
                  )
                : null
            ),
        showRepoList ? this.renderRepoList(idx) : null
      ),
      $.div(
        { className: "css-block" },
        $.div(
          { className: "css-line-item" },
          "Slack channel for repo: ",
          this.renderChannel(repo.channel, idx),
          repo.channel && !showList
            ? $.a(
                {
                  className: "css-link",
                  onClick: e => {
                    e.preventDefault();
                    this.showList = true;
                    this.update();
                  }
                },
                "Change"
              )
            : null
        ),
        showList ? this.renderChannelList(idx) : null
      )
    );
  };

  renderRepos = () => {
    return $.ul(
      { className: "list-group css-repo-list" },
      ...this.props.repos.map(this.renderRepo)
    );
  };

  renderAction = () => {
    const disabled = !!this.props.repos.find(
      (repo, idx) => !repo.channel || !repo.url
    );
    return $.div(
      { className: "css-action" },
      $.button(
        {
          className: "btn css-margin-right",
          ref: "cancel"
        },
        "Cancel"
      ),
      $.button(
        {
          className: `btn btn-primary ${disabled ? "disabled" : ""}`,
          ref: "save"
        },
        "Save"
      )
    );
  };

  getModalPanel = () => {
    if (!this.modalPanel) {
      this.modalPanel = atom.workspace.addModalPanel({ item: this.element });
      this.disposables.add(new Disposable(() => this.modalPanel.destroy()));
    }
    return this.modalPanel;
  };

  destroy = () => this.disposables.dispose();
}
