import * as React from 'react';
import { Text, View, Pressable, FlatList, TextInput } from 'react-native';


const TransferList = () => {
    
    const [query, setQuery] = React.useState('')
    const [fullData, setFullData] = React.useState([])
    var PRESSED = []

    // I'll have to populate this list automatically
    let DATA = []
    for (var i=0; i<50; i++) {
        DATA.push(
            {
                id: i,
            }
        )
    }
    const handleSearch = (text) => {
        
        const formattedQuery = text.toLowerCase()
        // console.log(formattedQuery)
        const filteredData = DATA.filter((item) => String(item.id).includes(formattedQuery)).map((id)=>(id))
        console.log(filteredData)
        setQuery(text)
        setFullData(filteredData)
        
    }

    const ListItem = (props) => {
        const [checked, setChecked] = React.useState(null)
        const background = checked ? "blue" : "pink"
        
        return (
            <Pressable
                style={{
                    backgroundColor: background,
                    borderRadius: 20
                }}
                onPress={() => {
                    // if exists in array
                    if (PRESSED.indexOf(props.id) > -1) {
                        PRESSED.splice(PRESSED.indexOf(props.id), 1)
                        
                    } else {
                        PRESSED.push(props.id)
                    }
                    
                    setChecked(!checked )
                }}
            >
                <Text
                    style={{
                        fontSize: 40,
                        textAlign: 'center'
                    }}
                >
                    Button #{props.id}
                </Text>
            </Pressable>
        )
    
    }

    const renderItem = ({ item }) => {
        return (
            <ListItem
                // item={item}
                id={item.id}
            />   
        )
    }

    const renderHeader = () => (
        <View style={{backgroundColor: 'grey', borderBottomRightRadius: 20, borderBottomLeftRadius: 20, marginBottom: 10}}>
            <View
                style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 20
                }}
            >
                <TextInput 
                    autoCapitalize='none'
                    autoCorrect={false}
                    // clearButtonMode='always'
                    value={query}
                    onChangeText={queryText => handleSearch(queryText)}
                    placeholder='Search :)'
                    style={{
                        backgroundColor: '#fff', paddingHorizontal: 20
                    }}
                    // autoFocus={true}
                />
            </View>
        </View>
    )

    const CustomList = () => {
    
        return (
            <FlatList 
                data={fullData && fullData.length > 0 ? fullData:DATA}
                renderItem={renderItem}
                keyExtractor={(item) => `item-${item.id}`}
                ItemSeparatorComponent={
                    ({ highlighted }) => (
                        <View
                            style={[highlighted], {paddingVertical: 5}}
                        />
                    )
                }
                ListHeaderComponent={renderHeader}
                // StickyHeaderComponent={[0]}
                stickyHeaderIndices={[0]}
                
        />
        )
    }

    return (
        <>
            <CustomList />
            <Pressable><Text>Test</Text></Pressable>
            {/* <Pressable><Text>Test</Text></Pressable> */}
        </>
    )
}
export default TransferList