import * as React from "react";
import {Modal, Button, Row, Col, Container} from 'react-bootstrap';
import CanvasDraw from "react-canvas-draw";
import Controller from "./controller";

export default class Sketch extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          selectedIndex: 0,
          options: Object.keys(props.data)
      }
  }

  handleControl = (option) => {
    let index = this.state.selectedIndex;
    this.setState({selectedIndex: option===0 ? (index - 1 > 0 ? index - 1 : index) : (index + 1 < 26 ? index + 1 : index)});
  }

  handleSelect = (event) => {
    this.setState({selectedIndex: event.target.value});
  }

  render() {
    return (
      <div>
        <Modal show={this.props.sketchShow} onHide={this.props.handleSketchClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Write A</Modal.Title>
          </Modal.Header>
          <Modal.Body className='center-align'>
            <Container>
              <Controller selectedIndex={this.state.selectedIndex} handleControl={this.handleControl} options={this.state.options} handleSelect={this.handleSelect}/>
              {/* <Row>
                <Col>
                  <CanvasDraw
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={'#ffc600'}
                    brushRadius={1}
                    canvasHeight={300}
                    saveData={this.props.data}
                  />
                </Col>
              </Row> */}
            </Container>
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