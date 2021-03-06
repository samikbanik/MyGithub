import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { getRepositories } from '../actions';
import { Calendar } from './Calendar';
import { StackNavigator } from "react-navigation";

class Repositories extends Component {

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.props.getRepositories(this.props.username, this.props.username, this.props.password);
  }

  onRepositorySelect(repo) {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate('Commits', { username: `${params.username}`, password: `${params.password}`, repo: `${repo}` });
  }

  lastUpdated(updatedAt) {
    var month = updatedAt.substr(5,2);
    return Calendar[month] + ' ' + updatedAt.substr(8,2);
  }

  static navigationOptions = ({navigation}) => ({
        title: 'Repositories',
        headerLeft: null,
        headerStyle: {backgroundColor: '#009688'},
        headerTitleStyle:{ color: '#fff', alignSelf: 'center', fontSize: 20},
        headerRight: <TouchableOpacity onPress={()=>navigation.navigate('Search')}><Image style={{tintColor: '#fff', width:30, height: 30, marginRight: 10}} source={require('./img/search.png')}/></TouchableOpacity>
    });

  render() {
    if (this.props.data.length > 0) {
      return (
          <ScrollView style={{flex: 1}}>
            <List>
              {this.props.data.map((repository) => (
                <ListItem
                  key={repository.name}
                  roundAvatar
                  avatarStyle={{borderRadius: 50, height: 55, width: 55}}
                  avatarContainerStyle={{borderRadius: 50, height: 55, width: 55}}
                  avatarOverlayContainerStyle={{borderRadius: 50, height: 55, width: 55}}
                  avatar={{ uri: repository.owner.avatar_url }}
                  title={repository.name}
                  titleStyle={styles.titleStyle}
                  subtitleNumberOfLines={2}
                  subtitle={
                    <View style={styles.subtitleStyle}>
                      <Text>Owner {repository.owner.login}</Text>
                      <Text>Last Updated on {this.lastUpdated(repository.updated_at)}</Text>
                    </View>
                  }
                  hideChevron
                  onPress={() => this.onRepositorySelect(repository.name)}
                />
              ))}
            </List>
          </ScrollView>
      );
    } else if(this.props.loading) {
      return(
        <ActivityIndicator size='large' />
      );
    } else{
      return (
        <Text style={styles.noDataStyle}>No repositories available</Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleStyle: {
    paddingLeft: 20
  },
  subtitleStyle: {
    paddingLeft: 30
  },
  noDataStyle: {
    fontSize: 18,
    marginTop: 15,
    alignSelf: 'center'
  }
});

const mapStateToProps = ({ auth, repositories }) => {
  const {username, password} = auth;
  const {data, loading} = repositories;
  return {username, password, data, loading};
};

export default connect(mapStateToProps, { getRepositories })(Repositories);
