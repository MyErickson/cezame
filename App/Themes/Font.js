import Colors from "./Colors"

const size = {
    h1: 20,
    h2: 17,
    h3: 15,
    input: 14,
    regular: 14,
    medium: 12,
    small: 10,
}
  
const style = {
    h1: {
        fontSize: size.h1,
        color: Colors.black, 
        fontWeight: 'bold',
    },
    h2: {
        fontSize: size.h2,
        color: Colors.black,
        fontWeight: 'bold',
    },
    h3: {
        fontSize: size.h3,
        color: Colors.black,
        fontWeight: 'bold',
    },
    normal: {
        fontSize: size.regular,
        color: Colors.black
    },
}
  
export default {
    size,
    style,
}