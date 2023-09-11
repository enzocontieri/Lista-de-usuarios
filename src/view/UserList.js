import React, { useContext } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { Avatar, ListItem, Button, Icon } from '@rneui/themed';
import UsersContext from './../context/UsersContext';

export default props => {

  const {state, dispatch} = useContext(UsersContext)

  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuario', 'Deseja Excluir o usuario ?', [
      {
        text:'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser', 
            payload: user, 
          })
        }
      },
      {
        text:'Nao'
      }
    ])
  }

  function getActions(user) {
    return(
      <>
        <Button 
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button 
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />

      </>
    )
  }
  function getUserItem({item: user}) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        rightElement={getActions(user)}
        onPress={() => props.navigation.navigate('UserForm')}
      >
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
        name="edit"
        size={25}
        color="orange"
        onPress={() => props.navigation.navigate('UserForm', user)}
      />
        <ListItem.Chevron
        name="delete"
        size={25}
        color="red"
        onPress={() => confirmUserDeletion(user)}
      />
        
      </ListItem>
    )
  }

  return (
     <View>
        <FlatList
          keyExtractor={user => user.id.toString()}
          data={state.users}
          renderItem={getUserItem}
        />
     </View>
  )
}