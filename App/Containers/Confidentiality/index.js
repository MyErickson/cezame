import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import ContainerLayoutContent from '../../Components/LayoutContent/ContainerLayoutContent';
import { WebView } from 'react-native-webview'
import HTML from 'react-native-render-html';


export default class Confidentiality extends Component {

    constructor(props){
        super(props);
        this.state = {
            about:null
        }
    }
    componentDidMount(){

        axios.get('https://cezame-dev.digitalcube.fr/api/cms?pageTag=confidentiality').then(res=>{

        this;this.setState({
            about:res.data["hydra:member"][0].content
        })

        }).catch(err=>{
            
        })
    }

    render() {

        const { about } = this.state

        return (
            <ContainerLayoutContent title="A propos" navigation={this.props.navigation}>
                 <ScrollView    
                    style={{ marginHorizontal: 0 ,marginBottom:0,}}
                    showsVerticalScrollIndicator = {false}
                >
                    <HTML  html={about && about}/>
                </ScrollView>
                
            </ContainerLayoutContent>
        )
    }
}
