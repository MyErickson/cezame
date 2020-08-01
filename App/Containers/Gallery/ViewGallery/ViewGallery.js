import React, {Component} from 'react'
import { View, Text , Image ,ScrollView ,TouchableHighlight , RefreshControl } from 'react-native'
import validator from 'validator';
import {Styles  } from "../styleGallery"




 class ViewGallery extends Component{


    state={
        refreshing:false
    }

    onRefresh =()=>{ 
        const { callGallery} = this.props
       
        this.setState({
            refreshing:true
        });
        
        callGallery()
        setTimeout(()=>{ this.setState({
            refreshing:false
        })},1000)

      
    }



    render(){

        const {
            navigate,
            download,
            allPictures
           } =this.props

        const {refreshing} = this.state

        const { isDivisibleBy } = validator


        return (
     
            <ScrollView 
             style = {{ flexDirection:"column",marginBottom:20}}
             refreshControl={
                 <RefreshControl 
                 showsVerticalScrollIndicator = {false}
                 refreshing={refreshing} 
                 onRefresh={()=>this.onRefresh()} 
                 colors={["#0000ff"]}
                 tintColor="white"
                 titleColor="white"
                 title="actualise"/>
               }
            
            >
                 <View style = {{ flexDirection:"row",flex:1}}>
                     <View style={{width:"50%",height:"100%",borderRadius:10,}}>
                     {allPictures && allPictures.map((value,index)=>{
            
                         const { contentUrl } = value
                         if( isDivisibleBy(index.toString(),2)){
                           
       
                             return <TouchableHighlight underlayColor="none" 
                             style={{borderRadius:10,backgroundColor:"#222222", margin:5,}}
                             key={value["@id"]}
                             onPress={()=>{navigate.navigate("CurrentImage",
                             {
                                 image:contentUrl ,
                                 download:download
                             })}}>
                                 <Image 
                                 resizeMethod='scale'
                                 resizeMode='center'
                                 source={{uri:contentUrl} } 
                                 style={[Styles.containerImage, { height: 220}]}
                         
                             />
                             </TouchableHighlight >
                         }
                     
                     })}
                     </View>
                     <View style={{width:"50%",height:"100%"}}>
                     {allPictures && allPictures.map((value,index)=>{
                         const { contentUrl } = value
                         if( !isDivisibleBy(index.toString(),2)){
     
                             const i = Math.floor(Math.random() * (30 - 10 +1)) + 10
                            
     
     
                             return  <TouchableHighlight underlayColor="none" 
                             style={{borderRadius:10,backgroundColor:"#222222",  margin:5,}}
                             key={value["@id"]}
                             onPress={()=>{navigate.navigate("CurrentImage",
                             {
                                 image:contentUrl ,
                                 download:download
                             })}}>
                            
                             <Image 
                              resizeMethod='scale'
                              resizeMode='center'
                             source={{uri:contentUrl} } 
                             style={[Styles.containerImage, { height: 220 }]}
                             
                             />
                             </TouchableHighlight>
                         }
                     
                     })}
                     </View>
                 </View>
             </ScrollView>
         )
    }

} 


export default ViewGallery
