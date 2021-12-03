import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {Modal, Button} from 'react-bootstrap';

export default class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  render() {
    if(this.props.path!==null) this.canvas.loadPaths(this.props.path);
    return (
      <div>
        <Modal show={this.props.sketchShow} onHide={this.props.handleSketchClose}>
          <Modal.Header closeButton>
            <Modal.Title>Write A</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactSketchCanvas
              ref={this.canvas}
              strokeWidth={5}
              loadPaths={this.props.path}
              strokeColor="black"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleSketchClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              this.canvas.current.exportImage("png")
                .then(data => {
                  this.props.handleHandwritingData(data);
                })
                .catch(e => {
                  console.log(e);
                });
              this.canvas.current.exportPaths().then(data => {
                this.props.handlePathData(data[0].paths);
              }).catch(e => {
                console.log(e);
              });
            }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};