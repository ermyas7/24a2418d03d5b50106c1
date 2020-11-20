import React, {useState, useEffect} from 'react';
import {
  View,
  Text, 
  FlatList, 
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import axios from 'axios'


const App = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  let interval
  useEffect(() => {
    getPosts()
    //fetchPeriodically()
    //return () => clearInterval(interval)
  }, [])

  const getPosts = async() => {
    const oldPage = page
    const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
    try {
      setLoading(true)
      const response = await axios.get(url)
      const newPostData = response.data
      setPosts([...posts, ...newPostData.hits])
      setLoading(false)
      setPage(oldPage + 1)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const fetchPeriodically = () => {
    interval = setInterval(getPosts, 500)
  }

  const onEndReach = async() => {
    getPosts()
  }
  const renderItem = ({item}) => {
    return(
      <View style={styles.itemContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableTitle}>Title :</Text>
            <Text style={styles.tableContent}>{item.title}</Text>
          </View>
          {item.url &&
          <View style={styles.tableRow}>
            <Text  style={styles.tableTitle}>URL :</Text>
            <Text style={styles.tableContent}>{item.url}</Text>
          </View>
          }
          <View style={styles.tableRow}>
            <Text style={styles.tableTitle}>Created At :</Text>
            <Text style={styles.tableContent}>{item.created_at}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableTitle}>Author :</Text>
            <Text style={styles.tableContent}>{item.author}</Text>
          </View>  
      </View>
    )
  }

  console.log(posts)
  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator/> :
      <FlatList
        data={posts}
        renderItem={renderItem}
        //keyExtractor={item => item.objectID} their is duplicate key
        onEndReached={onEndReach}
      />
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  itemContainer: {
    borderWidth: 2,
    borderColor: '#333',
    marginBottom: 10,
    padding: 20,
    justifyContent: 'space-between'
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  tableTitle: {
    marginRight: 10
  },
  tableContent: {
    flex: 1
  }
})

export default App;
