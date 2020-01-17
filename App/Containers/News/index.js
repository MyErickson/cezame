import React, { Component } from 'react';
import { Text, View, Button ,ScrollView } from 'react-native';
import axios from 'axios';

import LayoutContent from '../../Components/LayoutContent/LayoutContent';

export default class News extends Component {

    constructor(props){
        super(props);
        this.state = {
            newsArticles : undefined
        }
    }

    componentDidMount(){
        console.log('hey')
        axios.get('https://cezame-dev.digitalcube.fr/api/articles')
            .then((res) => {
            console.log("TCL: News -> componentDidMount -> res", res)
                 this.setState({newsArticles : res.data["hydra:member"]});
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {

        const { newsArticles} = this.state

        return (
            <LayoutContent navigation={this.props.navigation}>
                <ScrollView
                   style={{ marginHorizontal: 0,marginBottom:25 }}
                   showsVerticalScrollIndicator = {false}
                   contentInsetAdjustmentBehavior="automatic"
                >
                    {  newsArticles && newsArticles.map((news) => {
                        const date = new Date(news.updatedAt)
                        const month = date.getUTCMonth()
                        const modifMonth = month <10 ? "0"+(month+1):month
                        const showDate = modifMonth  +"/"+ date.getDate()+"/"+date.getFullYear()
                            return(
                                <View  key={news.id}>
                                    <Text style={{fontWeight: 'bold',fontSize:15,marginBottom:15}}>{news.title}</Text>
                                    <Text style={{marginBottom:10}} >{news.content}</Text>
                                    <Text style={{marginBottom:25,fontSize:11}}> publier le  :{ showDate }</Text>
                                </View>
                            )
                    })}
                </ScrollView>
            </LayoutContent>
        )
    }
}
