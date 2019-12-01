import React, { Component } from "react";

class FileUpload extends Component {
  render() {
    return (
      <div>
        <div className="input-group mt-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              accept="image/*"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              onChange={this.props.onUpload}
            />
            <label className="custom-file-label" for="inputGroupFile04">
              Choose file
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
