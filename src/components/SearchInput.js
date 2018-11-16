import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
}
  from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SearchInput extends Component {
  static defaultProps = {
    // city: true
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.header}>

        <TouchableOpacity style={styles.left} onPress={() => alert('ok')}>
          <Image source={require('../img/flei1.png')} style={{width:40,height:40}}/>
        </TouchableOpacity>


        <TouchableOpacity style={styles.search} onPress={() => navigate('Search')}>
          <Text style={{
            textAlign: 'left',
            lineHeight: 25,
            color: '#8B8B8B'
          }}> <Icon name="search" size={16} color="#8B8B8B"/>  搜索</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.left} onPress={() => alert('ok')}>
              <Image source={require('../img/schu1.png')} style={{width:40,height:40}}/>
          </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor:'#1e88f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    backgroundColor: '#F5F5F5',
    flex: 6,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
      paddingTop:8
  }
});
