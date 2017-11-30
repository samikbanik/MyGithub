import React, {Component} from 'react';
import {Text, View, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { List, ListItem, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { searchChanged, getRepositories } from '../actions';
import { Calendar } from './Calendar';

class Search extends Component {

  static navigationOptions = ({navigation}) => ({
        title: 'Search',
        headerStyle: {backgroundColor: '#009688'},
        headerTitleStyle:{ color: '#fff', alignSelf: 'center', fontSize: 20}
    });

  lastUpdated(updatedAt) {
    var month = updatedAt.substr(5,2);
    return Calendar[month] + ' ' + updatedAt.substr(8,2);
  }

  getRepositories() {
    if(this.props.searchedUser != '') {
      console.log('Searched user:', this.props.searchedUser);
      this.props.getRepositories(this.props.searchedUser, this.props.username, this.props.password);
    }
  }

  onRepositorySelect(repo) {
    this.props.navigation.navigate('Commits', { username: `${this.props.username}`, password: `${this.props.password}`, repo: `${repo}` });
  }

  renderRepositories() {
    if(this.props.searchedUser != '' && this.props.data.length > 0) {
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
    } else {
      return (
        <View></View>
      );
    }
  }

  onSearchChange(text) {
    this.props.searchChanged(text);
  }

  render() {
    console.log('Searched user: ', this.props.searchedUser)
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextInput
            style={{flex: 4, height: 40, borderColor: 'gray', backgroundColor: '#fff', margin: 5, borderRadius: 5}}
            onChangeText={this.onSearchChange.bind(this)}
            value={this.props.searchedUser}
          />
          <TouchableOpacity onPress={()=>this.getRepositories()} style={{flex: 1, margin: 5}}><Image onPress={()=>this.props.searchUser(this.props.searchText)} style={{tintColor: '#000', width:30, height: 30, marginRight: 10}} source={require('./img/search.png')} /></TouchableOpacity>
        </View>
        {this.renderRepositories()}
      </View>
    );
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

const mapStateToProps = ({auth, repositories, search}) => {
  const {username, password} = auth;
  const {data, loading} = repositories;
  const {searchedUser} = search;
  return {username, password, data, searchedUser, loading};
}

export default connect(mapStateToProps, { searchChanged, getRepositories })(Search);
