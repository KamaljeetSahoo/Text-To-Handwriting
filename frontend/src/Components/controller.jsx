import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default class Controller extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={2} className="center-align">
                    <AiOutlineLeft onClick={()=>this.props.handleControl(0)}/>
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example" value={this.props.selectedIndex} onChange={this.props.handleSelect}>
                        {Array(26).fill(0).map((_, index) => (<option value={index}>{this.props.options[index]}</option>))}
                    </Form.Select>
                </Col>
                <Col xs={2} className="center-align">
                    <AiOutlineRight onClick={()=>this.props.handleControl(1)}/>
                </Col>
            </Row>
        );
    }
}