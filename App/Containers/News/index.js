import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import LayoutContent from '../../Components/LayoutContent/LayoutContent';

export default class News extends Component {

    constructor(props){
        super(props);
        this.state = {
            newsArticles : []
        }
    }

    componentDidMount(){
        console.log('hey')
        axios.get('https://cezame-dev.digitalcube.fr/api/articles')
            .then((res) => {
            console.log("TCL: News -> componentDidMount -> res", res)
                // this.setState({newsArticles : res.data.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        // const news = 
        //         this.state.newsArticles.map((news) => {
        //                 return(
        //                     <View key={news.id}>
        //                         <Text>{news.title}</Text>
        //                         <Text>{news.description}</Text>
        //                         <Text>De : {news.author} publier le  :{news.datePublished}</Text>
        //                     </View>
        //                 )
        //         });
        return (
            <LayoutContent navigation={this.props.navigation}>
                {/* {news} */}
            </LayoutContent>
        )
    }
}
