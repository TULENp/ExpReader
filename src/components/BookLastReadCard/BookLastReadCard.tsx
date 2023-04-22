import { LinearProgress } from "@rneui/themed";
import { View, Text, Image, Pressable } from "react-native";
import { gray, pink } from "../../constants/colors";
import { LibStackParams, TLibBook } from "../../types";
import { stylesReadLater } from "./style";
import { coversDir } from "../../constants";
import { useState, useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { checkBookIsDownloaded, downloadBook } from "../../service/book";

export function BookLastReadCard({ book }: { book: TLibBook }) {
    const { navigate } = useNavigation<NavigationProp<LibStackParams>>();
    const { authors, bookPages, cover, id, readPages, title, fileName } = book;
    const percent = Math.floor((readPages / bookPages) * 100) || 0;
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isCoverExists, setIsCoverExists] = useState(true);

    useEffect(() => {
        checkDownload();
    }, [isDownloaded, id])

    async function checkDownload() {
        const res = await checkBookIsDownloaded(fileName);
        setIsDownloaded(res);
    }

    async function readOrDownloadBook() {
        if (isDownloaded) {
            navigate('Reader', { book })
        }
        else {
            const res = await downloadBook(book);
            setIsDownloaded(res);
        }
    }

    return (
        <Pressable onPress={readOrDownloadBook}>
            <View style={stylesReadLater.container_read_later}>
                {isCoverExists
                    ?
                    <Image source={{ uri: coversDir + cover }} style={stylesReadLater.img_cover_read_later}
                        onError={() => setIsCoverExists(false)} />
                    :
                    <View style={stylesReadLater.empty_cover_book}>
                        <Text style={stylesReadLater.text_empty_cover_book}>{title}</Text>
                    </View>
                }
                <View style={{ paddingLeft: 16, flex: 1, }}>
                    <Text style={stylesReadLater.text_h1_read_later}>Продолжить чтение</Text>
                    <Text style={stylesReadLater.text_h2_read_later}>{title}</Text>
                    <Text style={stylesReadLater.text_h3_read_later}>{authors}</Text>
                    <Text style={stylesReadLater.text_progress_bar}>{percent}% прочитано</Text>
                    <LinearProgress value={percent / 100} color={pink} style={stylesReadLater.progress_bar}
                        trackColor={gray} variant='determinate' />
                </View>
            </View>
        </Pressable>
    )
}