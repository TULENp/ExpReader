import { TouchableOpacity, Image, View } from "react-native"
import { srcIcnStarBlueRarirty, srcIcnStarGreenRarirty } from '../../constants/images';

export function CustomIcon({source}){
    return(
        <View style={{justifyContent:'center', alignItems:'center',}}>
        <Image
          style={{width: 35, height: 35}}
          source={source}
         />
       </View>
    )
}