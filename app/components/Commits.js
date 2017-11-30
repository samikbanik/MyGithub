import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { getCommits } from '../actions';
import { Calendar } from './Calendar';
import { StackNavigator } from "react-navigation";

class Commits extends Component {

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.props.getCommits(params.username, params.password, params.repo);
  }

  lastUpdated(updatedAt) {
    var month = updatedAt.substr(5,2);
    return Calendar[month] + ' ' + updatedAt.substr(8,2);
  }

  static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.repo}`,
        headerStyle: { backgroundColor: '#009688'},
        headerTitleStyle:{ color: '#fff', fontSize: 20},
        headerTintColor: '#fff'
    });

  render() {
    if (this.props.data.length > 0) {
      return (
          <ScrollView style={{flex: 1}}>
            <List>
              {this.props.data.map((commit) => (
                <ListItem
                  key={commit.commit.message}
                  title={commit.commit.message}
                  titleStyle={styles.titleStyle}
                  subtitleNumberOfLines={2}
                  subtitle={
                    <View style={styles.subtitleStyle}>
                      <Text>Owner {commit.commit.committer.name}</Text>
                      <Text>Committed on {this.lastUpdated(commit.commit.committer.date)}</Text>
                    </View>
                  }
                  hideChevron
                />
              ))}
            </List>
          </ScrollView>
      );
    }else{
      return (
        <Text style={styles.noDataStyle}>No commits available</Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleStyle: {
    paddingLeft: 20,
    fontSize: 18,
    color: '#0D47A1'
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

const mapStateToProps = ({ commits }) => (commits);

export default connect(mapStateToProps, { getCommits })(Commits);
