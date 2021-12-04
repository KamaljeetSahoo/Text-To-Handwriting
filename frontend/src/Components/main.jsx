import React from 'react';
import {Container, Row, Col, Form, Button, Carousel} from 'react-bootstrap';
import Sketch from './SketchTool';
import axios from 'axios';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sketchShow: false,
            textData: '',
            data: {
                A : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                B : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                C : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                D : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                E : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                F : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                G : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                H : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                I : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                J : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                K : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                L : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                M : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                N : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                O : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                P : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                Q : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                R : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                S : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                T : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                U : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                V : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                W : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                X : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                Y : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)],
                Z : [new Array(2).fill("{\"lines\":[],\"width\":300,\"height\":300}"), new Array(2).fill(null)]
            },
            convertedData: []
        }
    }

    checkDataUrl = () => {
        let nullList = []
        Object.keys(this.state.data).forEach((item, index)=> {
            if(this.state.data[item][1][0] === null || this.state.data[item][1][1]===null){
                nullList.push(index);
            }
        })
        console.log(nullList);
    }

    handleHandwritingData = (character, dataU, dataL, dataUrlU, dataUrlL) => {
        let newData = this.state.data;
        newData[character][0][0] = dataU;
        newData[character][0][1] = dataL;
        newData[character][1][0] = dataUrlU;
        newData[character][1][1] = dataUrlL;
        this.setState({data: newData});
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

    handleConvert = (e) => {
        e.preventDefault();
        axios.post('/convert', {data: this.state.data, textData: this.state.textData }).then(res => {
            if(res.data.success) {
                console.log(res.data);
                this.setState({
                    convertedData: res.data.image
                });
            }
        }).catch(err => {
            console.log(err);
        });
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
                                <Form.Control as="textarea" rows={10} value={this.state.textData} onChange={(e)=>this.setState({textData: e.target.value})} />
                            </Form.Group>
                            {this.state.textData !== '' && <>
                            <Button variant="primary" type="submit" onClick = {this.handleTextSubmit}>
                                Upload Handwriting
                            </Button>
                            <Button variant="primary" type="submit" onClick = {this.handleConvert}>
                                Convert
                            </Button>
                            </>}
                        </Form>
                    </Col>
                </Row>
                {this.state.convertedData.length>0 && <Row>
                    <Col xs={4} className="center-align">
                        <h3>PDF Preview</h3>
                        <div className="carousel-border">
                        <Carousel variant="dark">
                            {this.state.convertedData.map((item, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={item}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                        </div>
                    </Col>
                </Row>}       
            </Container>
        );
    }
}