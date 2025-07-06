import { ImageBackground, View } from "react-native"
import { back } from "../Northernconst/wingsassts"
import Wingsnvgt from "../Northernnavigation/Wingsnvgt"

interface NorthernBackgroundProps {
    route: React.ReactNode;
    nvgt: boolean;
}

const NorthernBackground: React.FC<NorthernBackgroundProps> = ({ route, nvgt }) => {
    
    return (
        <ImageBackground source={back} style={{ flex: 1 }}>
            <View>

                <View style={{ flex: 1 }}>{route}</View>

                {
                    nvgt && (
                        <View>
                            <Wingsnvgt />
                        </View>
                    )
                }
                
            </View>
        </ImageBackground>
    )
};

export default NorthernBackground;