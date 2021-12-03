import * as React from "react";
import {Modal, Button} from 'react-bootstrap';
import CanvasDraw from "react-canvas-draw";

export default class Sketch extends React.Component {

  render() {
    return (
      <div>
        <Modal show={this.props.sketchShow} onHide={this.props.handleSketchClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Write A</Modal.Title>
          </Modal.Header>
          <Modal.Body className='center-align'>
            <CanvasDraw
              ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
              brushColor={'#ffc600'}
              brushRadius={1}
              canvasHeight={300}
              saveData={this.props.data}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleSketchClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              this.props.handleHandwritingData(this.saveableCanvas.getSaveData());
            }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};