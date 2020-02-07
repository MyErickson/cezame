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
import Moment from 'moment';
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
        console.log("TCL: News -> componentDidMount -> res", res.data["hydra:member"].length)

             this.setState({
                 newsArticles : res.data["hydra:member"],
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
        console.log("TCL: render -> newsArticles ", newsArticles )
        
        const random1 = Math.floor(Math.random() * (100 - 1 +2)) + 1
        return (
            <LayoutContent title="Actualités" navigation={this.props.navigation}>
                { loading ? ( <ScrollView
                   style={{ marginHorizontal: 0,marginBottom:25 }}
                   showsVerticalScrollIndicator = {false}
                   contentInsetAdjustmentBehavior="automatic"
                   refreshControl={
                    <RefreshControl 
                    refreshing={refreshing} 
                    onRefresh={()=>this.onRefresh()} 
                    colors={["#0000ff"]}
                    tintColor="#0000ff"
                    titleColor="#0000ff"
                    title="actualise"/>
                  }
                >
                    {  newsArticles.length !== 0 ? newsArticles.map((news) => {
                        const { image , content , title , link , updatedAt } = news
                        const date = new Date(updatedAt)
                       

                            return(
                                <View  key={news.id}>
                                    <View style={{flex:3}}>
                                        <Image source={{uri:image ? image.contentUrl : `https://i.picsum.photos/id/${random1}/200/300.jpg`}} style={{ width: "100%", height: 150,borderRadius:8}} />
                                    </View>
                                    <Text style={{fontWeight: 'bold',fontSize:15,marginVertical:15,textAlign:"center"}}>{title}</Text>
                                    <Text style={{marginBottom:10,}} >{content}</Text>
                                    <TouchableOpacity onPress={()=>Linking.openURL(link)} >
                                        <Text 
                                        style={{marginBottom:20,fontSize:13,textAlign:"center",textDecorationLine:"underline"}}
                                         
                                        > 
                                            En savoir plus... 
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{marginBottom:25,fontSize:11}}> publié le : {  Moment(date).format("DD/MM/YYYY")}</Text>
                                </View>
                            )
                    }) :  <Text style={{fontSize:16, fontWeight:'bold'}}> Les actualitèes seront bientôt ajoutés</Text>}
                </ScrollView>) : <ActivityIndicator size="large" color="#0000ff" />}
               
            </LayoutContent>
        )
    }
}
