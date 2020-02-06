import React, { Component } from 'react';
import { Text, View,
     Button ,
     ScrollView,
     Image,
     Linking ,
     RefreshControl ,
     TouchableOpacity,
     ActivityIndicator } from 'react-native';
import axios from 'axios';

import LayoutContent from '../../Components/LayoutContent/LayoutContent';


export default class News extends Component {

    constructor(props){
        super(props);
        this.state = {
            newsArticles : undefined,
            loading:false,
            refreshing:false
        }
    }

    componentDidMount(){
        console.log('hey')
        this.setState({
            loading:false
       });
       this.getNews()
    }

    getNews =()=>{
        axios.get('https://cezame-dev.digitalcube.fr/api/articles?visible=true')
        .then((res) => {
        console.log("TCL: News -> componentDidMount -> res", res)

             this.setState({
                 newsArticles : res.data["hydra:member"] ,
                 loading:true
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }


    onRefresh =()=>{ 
        const { refreshing} = this.state
       
        this.setState({
            refreshing:true
        });
        
        this.getNews()
        setTimeout(()=>{ this.setState({
            refreshing:false
        })},1000)

      
    }

    render() {

        const { newsArticles , loading , refreshing} = this.state
        console.log("TCL: News -> render -> newsArticles", !newsArticles)
        const random1 = Math.floor(Math.random() * (100 - 1 +2)) + 1
        return (
            <LayoutContent title="Actualités" navigation={this.props.navigation}>
                { loading ? ( <ScrollView
                   style={{ marginHorizontal: 0,marginBottom:25 }}
                   showsVerticalScrollIndicator = {false}
                   contentInsetAdjustmentBehavior="automatic"
                   refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={()=>this.onRefresh()} />
                  }
                >
                    {  !newsArticles ? newsArticles.map((news) => {
                        const date = new Date(news.updatedAt)
                        const month = date.getUTCMonth()
                        const modifMonth = month <10 ? "0"+(month+1):month
                        const showDate = date.getDate() +"/"+ modifMonth +"/"+date.getFullYear()
                            return(
                                <View  key={news.id}>
                                    <View style={{flex:3}}>
                                        <Image source={{uri:`https://i.picsum.photos/id/${random1}/200/300.jpg`}} style={{ width: "100%", height: 150,borderRadius:8}} />
                                    </View>
                                    <Text style={{fontWeight: 'bold',fontSize:15,marginVertical:15,textAlign:"center"}}>{news.title}</Text>
                                    <Text style={{marginBottom:10,}} >{news.content}</Text>
                                    <TouchableOpacity onPress={()=>Linking.openURL("https://www.google.fr")} >
                                        <Text 
                                        style={{marginBottom:20,fontSize:13,textAlign:"center",textDecorationLine:"underline"}}
                                         
                                        > 
                                            En savoir plus... 
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{marginBottom:25,fontSize:11}}> publié le : { showDate }</Text>
                                </View>
                            )
                    }) :  <Text style={{fontSize:16, fontWeight:'bold'}}> Les actualitèes seront bientôt ajoutés</Text>}
                </ScrollView>) : <ActivityIndicator size="large" color="#0000ff" />}
               
            </LayoutContent>
        )
    }
}
