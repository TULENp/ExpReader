import { LinearProgress } from "@rneui/themed";
import { View, Text, Image } from "react-native";
import { gray, pink } from "../../constants/colors";
import { srcImgHarryPotter3 } from "../../constants/images";
import { TLibBook } from "../../types";
import { stylesReadLater } from "./style";

export function BookLastReadCard({ book }: { book: TLibBook }) {
    const { author, bookPages, cover, id, readPages, title } = book;
    const percent = Math.floor((readPages / bookPages) * 100) || 0;
    return (
        <View style={stylesReadLater.container_read_later}>
            <Image source={srcImgHarryPotter3} style={stylesReadLater.img_cover_read_later} />
            <View style={{ paddingLeft: 16, flex: 1, }}>
                <Text style={stylesReadLater.text_h1_read_later}>Продолжить чтение</Text>
                <Text style={stylesReadLater.text_h2_read_later}>{title}</Text>
                <Text style={stylesReadLater.text_h3_read_later}>{author}</Text>
                <Text style={stylesReadLater.text_progress_bar}>{percent}% прочитано</Text>
                <LinearProgress value={percent / 100} color={pink} style={stylesReadLater.progress_bar} trackColor={gray} variant='determinate' />
            </View>
        </View>
    )
}