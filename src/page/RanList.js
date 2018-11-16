import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';

import RanItem from './RanItem';

export default class SkuList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: true,
            refreshing: false,
            movies: []
        };
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData();
    }
    fetchData = () => {
        fetch('https://api.douban.com/v2/movie/in_theaters')
            .then((response) => {
                this.setState({ refreshing: false });
                return response.json();
            }).then((responseText) => {
            let arrData = responseText.subjects;
            let arrList = [];
            arrData.map((item, index) => {
                arrList.push({ key: index.toString(), value: item });
            })
            this.setState({ movies: arrList, ready: false, refreshing: false });
        }).catch((error) => {
            console.error(error);
        });
    }
    refreshData = () => {
        this.setState({ refreshing: true });
        this.fetchData();
    }

    render() {
        const { navigate } = this.props.navigation;
        const { movies } = this.state;
        return (
            <View style={{paddingBottom: 50}}>
                {this.state.ready
                    ? <ActivityIndicator size="large" style={styles.loadding} />
                    : <FlatList
                        data={movies}
                        scrollToEnd={this.refreshData}
                        refreshing={this.state.refreshing}
                        key={movies.key}
                        renderItem={({ item }) => {
                            return (
                                <RanItem item={item} data={movies} navigate={navigate} />
                            )
                        }} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    smallFont: {
        lineHeight: 18,
        color: '#A6A6A6',
        fontSize: 12
    },
    loadding: {
        marginTop: 100
    },
    SkuList: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF'
    },
    lastList: {
        borderBottomWidth: 0
    },
    title: {
        fontSize: 16,
        color:'#4A4A4A'
    },
    right:{
        flex:1,paddingLeft:20,flexDirection:'row',color:'#555'
    },
    left:{
        width:100,
        color:'#555'
    },
    itemWrap: {
        display:'flex',
        flexDirection: 'row',
        marginTop: 4,
    },
    itemWrap1: {
        marginTop:10
    },
    pay: {
        width: 52,
        height: 25,
        marginTop: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FF4E65',
        borderRadius: 5,
    }
})
