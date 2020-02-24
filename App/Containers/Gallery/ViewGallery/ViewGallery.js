import React from 'react'
import { View, Text , Image ,ScrollView ,TouchableHighlight} from 'react-native'
import validator from 'validator';
import {Styles  } from "../styleGallery"




const ViewGallery = ({
 navigate,
 download,
 allPictures
}) => {
    const images=[
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},
        { uri: ""},


    ]
    const { isDivisibleBy } = validator
    console.log('j suis la ')
    return (
     
       <ScrollView style = {{ flexDirection:"column",marginBottom:20}}>
            <View style = {{ flexDirection:"row",flex:1}}>
                <View style={{width:"50%",height:"100%"}}>
                {images.map((value,index)=>{
                    if( isDivisibleBy(index.toString(),2)){

                        const randomHeight = Math.floor(Math.random() * (30 - 10 +1)) + 10
                        const random = Math.floor(Math.random() * (100 - 10 +1)) + 10


                        return <TouchableHighlight underlayColor="none" 
                        onPress={()=>{navigate.navigate("CurrentImage",
                        {
                            image:`https://i.picsum.photos/id/${random}/1024/512.jpg`,
                            download:download
                        })}}>
                            <Image 
                        source={{uri:`https://i.picsum.photos/id/${random}/1024/512.jpg`} } 
                        style={[Styles.containerImage, { height: randomHeight *10}]}
                    
                        />
                        </TouchableHighlight >
                    }
                
                })}
                </View>
                <View style={{width:"50%",height:"100%"}}>
                {images.map((value,index)=>{
                    if( !isDivisibleBy(index.toString(),2)){

                        const i = Math.floor(Math.random() * (30 - 10 +1)) + 10
                        const random = Math.floor(Math.random() * (100 - 10 +1)) + 10


                        return  <TouchableHighlight underlayColor="none" 
                        onPress={()=>{navigate.navigate("CurrentImage",
                        {
                            image:`https://i.picsum.photos/id/${random}/1024/512.jpg`,
                            download:download
                        })}}>
                        <Image 
                        source={{uri:`https://i.picsum.photos/id/${random}/1024/512.jpg`} } 
                        style={[Styles.containerImage, { height: i*10}]}
                        onPress={()=>{console.log(index)}}
                        />
                        </TouchableHighlight>
                    }
                
                })}
                </View>
            </View>
        </ScrollView>
    )
}

export default ViewGallery
