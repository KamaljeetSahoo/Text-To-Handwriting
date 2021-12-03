import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import Sketch from './SketchTool';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sketchShow: false,
            data: null
        }
    }

    handleHandwritingData = (data) => {
        this.setState({
            data: data,
            sketchShow: false,
        })
    }

    handleSketchClose = () => {
        this.setState({
            sketchShow: false,
        })
    }

    handleSketchShow = () => {
        this.setState({
            sketchShow: true,
        })
    }

    handleTextSubmit = (event) => {
        event.preventDefault();
        this.setState({
            sketchShow: true,
        })
    }

    render() {
        return (
            <Container>
                <Sketch 
                    sketchShow={this.state.sketchShow} 
                    handleHandwritingData={this.handleHandwritingData} 
                    handleSketchClose={this.handleSketchClose}
                    handlePathData={this.handlePathData}
                    data = {this.state.data}
                />
                <Row>
                    <Col>
                        <h1>Text to Handwriting</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Enter your text here</Form.Label>
                                <Form.Control as="textarea" rows={10} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick = {this.handleTextSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}