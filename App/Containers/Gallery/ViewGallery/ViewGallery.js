import React from 'react'
import { View, Text , Image ,ScrollView ,TouchableHighlight} from 'react-native'
import validator from 'validator';
import {Styles  } from "../styleGallery"




const ViewGallery = ({
 navigate,
 download,
 allPictures
}) => {


    const { isDivisibleBy } = validator
    console.log('allPictures',allPictures)
    return (
     
       <ScrollView style = {{ flexDirection:"column",marginBottom:20}}>
            <View style = {{ flexDirection:"row",flex:1}}>
                <View style={{width:"50%",height:"100%"}}>
                {allPictures && allPictures.map((value,index)=>{
                    const { contentUrl } = value
                    if( isDivisibleBy(index.toString(),2)){

                        const randomHeight = Math.floor(Math.random() * (30 - 10 +1)) + 10
                      


                        return <TouchableHighlight underlayColor="none" 
                        onPress={()=>{navigate.navigate("CurrentImage",
                        {
                            image:contentUrl ,
                            download:download
                        })}}>
                            <Image 
                            resizeMethod='scale'
                            resizeMode='cover'
                            source={{uri:contentUrl} } 
                            style={[Styles.containerImage, { height: randomHeight *10}]}
                    
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
                        onPress={()=>{navigate.navigate("CurrentImage",
                        {
                            image:contentUrl ,
                            download:download
                        })}}>
                        <Image 
                         resizeMethod='scale'
                         resizeMode='cover'
                        source={{uri:contentUrl} } 
                        style={[Styles.containerImage, { height: i*10 }]}
                        
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
