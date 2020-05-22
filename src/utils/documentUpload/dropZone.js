import Dropzone from "react-dropzone";
import React from "react";

export class DropzoneAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true
    };
  }

  hideAlert() {
    this.setState({
      isActive: false
    });
  }

  /*onDrop = (acceptedFiles, rejectedFiles) => {
          // Do something with files
      };*/

  render() {
    const baseStyle = {
      width: 200,
      height: 200,
      borderWidth: 2,
      borderColor: "#666",
      borderStyle: "dashed",
      borderRadius: 5
    };
    const activeStyle = {
      borderStyle: "solid",
      borderColor: "#6c6",
      backgroundColor: "#eee"
    };
    const rejectStyle = {
      borderStyle: "solid",
      borderColor: "#c66",
      backgroundColor: "#eee"
    };

    return (
      <div>
        <div className="alert alert-warning alert-dismissible" role="alert">
          <Dropzone accept="image/*">
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
              acceptedFiles,
              rejectedFiles
            }) => {
              let styles = { ...baseStyle };
              styles = isDragActive ? { ...styles, ...activeStyle } : styles;
              styles = isDragReject ? { ...styles, ...rejectStyle } : styles;

              return (
                <div {...getRootProps()} style={styles}>
                  <input {...getInputProps()} />
                  <div>{isDragAccept ? "Drop" : "Drag"} files here...</div>
                  {isDragReject && <div>Unsupported file type...</div>}
                </div>
              );
            }}
          </Dropzone>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => this.hideAlert()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

export class DropzoneButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: props.selectedFiles
    };
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    let selectAreaText = this.props.selectAreaText || "Click here to select a file";
    return (
      <div>
        <Dropzone onDrop={this.props.onDrop} onFileDialogCancel={this.onCancel.bind(this)}>
          {({ getRootProps, getInputProps }) => {
            if (this.props.selectedFiles.length) {
              return (
                <React.Fragment>
                  {this.props.selectedFiles} {this.props.confirmButton} |
                  <button className="btn btn-sm btn-default pl-1 pr-1 m-0 p-0" onClick={this.props.onCancelUpload}>
                    Clear
                  </button>
                </React.Fragment>
              );
            }
            return (
              <div {...getRootProps()} className={`btn btn-sm btn-secondary ${this.props.extra_className}`}>
                <input {...getInputProps()} />
                {selectAreaText}
              </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}

export class DropzoneField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: props.selectedFiles
    };
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  confirmState() {
    return (
      <div className="btn-group">
        <div className="btn btn-default pl-1 pr-1 m-0 p-0" style={{ whiteSpace: "unset" }}>
          {this.props.selectedFiles}
        </div>
        <button className="btn btn-default pl-1 pr-1 m-0 p-0" onClick={this.props.onConfirmUpload}>
          {this.props.confirmText}
        </button>
        <button className="btn btn-default pl-1 pr-1 m-0 p-0" onClick={this.props.onCancelUpload}>
          Clear
        </button>
      </div>
    );
  }
  render() {
    let selectAreaText = this.props.selectAreaText || "Click here to select a file";
    return (
      <div id="dropzone">
        <Dropzone onDrop={this.props.onDrop} onFileDialogCancel={this.onCancel.bind(this)}>
          {({ getRootProps, getInputProps }) => {
            if (this.props.selectedFiles.length) {
              return <React.Fragment>{this.confirmState()}</React.Fragment>;
            }
            return (
              <div {...getRootProps()} className={`${this.props.extra_className}`}>
                <input {...getInputProps()} />
                {selectAreaText}
              </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}
