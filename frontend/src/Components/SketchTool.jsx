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
    this.setState({selectedIndex: option===0 ? (index - 1 >= 0 ? index - 1 : index) : (index + 1 < 26 ? index + 1 : index)});
  }

  handleSelect = (event) => {
    this.setState({selectedIndex: event.target.value});
  }

  render() {
    return (
      <div>
        <Modal show={this.props.sketchShow} onHide={this.props.handleSketchClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Write {this.state.options[this.state.selectedIndex]}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='center-align'>
            <Container className='modals' >
              <Controller selectedIndex={this.state.selectedIndex} handleControl={this.handleControl} options={this.state.options} handleSelect={this.handleSelect}/>
              <Row>
                <Col  className='center-align' style={{flexDirection: "column"}}>
                  Upper Case Canvas
                  <CanvasDraw
                    ref={canvasDraw => (this.upperCanvas = canvasDraw)}
                    brushColor={'#ffc600'}
                    brushRadius={1}
                    canvasHeight={300}
                    canvasWidth={300}
                    saveData={this.props.data[this.state.options[this.state.selectedIndex]][0][0]}
                  />
                </Col>
                <Col  className='center-align' style={{flexDirection: "column"}}>
                  Lower Case Canvas
                  <CanvasDraw
                    ref={canvasDraw => (this.lowerCanvas = canvasDraw)}
                    brushColor={'#ffc600'}
                    brushRadius={1}
                    canvasHeight={300}
                    canvasWidth={300}
                    saveData={this.props.data[this.state.options[this.state.selectedIndex]][0][1]}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            {this.state.selectedIndex!==0 && <Button variant="secondary" onClick={()=>{
              this.props.handleHandwritingData(this.state.options[this.state.selectedIndex], this.upperCanvas.getSaveData(), this.lowerCanvas.getSaveData(), this.upperCanvas.getDataURL(), this.lowerCanvas.getDataURL());
              this.upperCanvas.clear();
              this.lowerCanvas.clear();
              this.handleControl(0)
            }}>
              Back
            </Button>}
            <Button variant="primary" onClick={() => {
              this.props.handleHandwritingData(this.state.options[this.state.selectedIndex], this.upperCanvas.getSaveData(), this.lowerCanvas.getSaveData(), this.upperCanvas.getDataURL(), this.lowerCanvas.getDataURL());
              this.upperCanvas.clear();
              this.lowerCanvas.clear();
              this.handleControl(1);
            }}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};