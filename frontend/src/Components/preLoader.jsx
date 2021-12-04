import {Audio} from '@agney/react-loading';
import React from 'react';

export default class Loader extends React.Component{
    render(){
        return(<>
            {this.props.isLoading && <div className="preloader-container">
                <Audio width="50" className="preloader" />
            </div>}
        </>)
    }
}