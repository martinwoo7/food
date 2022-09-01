import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
} from "react-native";

const Item = ({ name, details, save, saved}) => {
    const [pressed, setPressed] = useState(saved)

    return (
        <Pressable 
            style={
                !pressed ? styles.item : styles.item_pressed
            }
            onPress={() => {
                // console.log(name)
                setPressed(!pressed)
                save(name)
            }}
        >
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.details}>{details}</Text>
        </Pressable>
    )
}

const List = (props) => {
    const renderItem = ({ item }) => {
        if (props.saved.indexOf(item.name) > -1) {
            var alreadyClicked = true
        } else {
            var alreadyClicked = false
        }

        if (props.searchPhrase === "") {
            return <Item name={item.name} details={item.details} save={props.save} saved={alreadyClicked}/>
        }
        if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item name={item.name} details={item.details} save={props.save} saved={alreadyClicked}/>
        }
        if (item.details.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item name={item.name} details={item.details} save={props.save} saved={alreadyClicked}/>
        }
    }

    return (
        <View style={styles.list_container}>
            <View 
                onStartShouldSetResponder={() => {
                    props.setClicked(false);
                }}
            >
                <FlatList
                    data={props.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    )
}
export default List;

const styles = StyleSheet.create({
    list_container: {
        margin: 10,
        height: "70%",
        width: "100%",
    },
    item: {
        marginVertical: 10,
        marginHorizontal: 30,
        borderWidth: 2,
        borderColor: "lightgrey",
        borderRadius: 15
    },
    item_pressed: {
        marginVertical: 10,
        marginHorizontal: 30,
        borderWidth: 2,
        borderColor: "pink",
        borderRadius: 15
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
    },
    details: {
        marginLeft: 10,

    }
})