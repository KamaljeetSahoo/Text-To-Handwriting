import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import Sketch from './SketchTool';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sketchShow: false,
            data: {
                A : new Array(2).fill(null),
                B : new Array(2).fill(null),
                C : new Array(2).fill(null),
                D : new Array(2).fill(null),
                E : new Array(2).fill(null),
                F : new Array(2).fill(null),
                G : new Array(2).fill(null),
                H : new Array(2).fill(null),
                I : new Array(2).fill(null),
                J : new Array(2).fill(null),
                K : new Array(2).fill(null),
                L : new Array(2).fill(null),
                M : new Array(2).fill(null),
                N : new Array(2).fill(null),
                O : new Array(2).fill(null),
                P : new Array(2).fill(null),
                Q : new Array(2).fill(null),
                R : new Array(2).fill(null),
                S : new Array(2).fill(null),
                T : new Array(2).fill(null),
                U : new Array(2).fill(null),
                V : new Array(2).fill(null),
                W : new Array(2).fill(null),
                X : new Array(2).fill(null),
                Y : new Array(2).fill(null),
                Z : new Array(2).fill(null)
            }
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