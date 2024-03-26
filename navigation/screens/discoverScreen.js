//import * as React from 'react';
//import { View, Text } from 'react-native';
//
//export default function DiscoverScreen({ navigation }) {
//    return (
//        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//            <Text
//                onPress={() => navigation.navigate('Plans')}
//                style={{ fontSize: 26, fontWeight: 'bold' }}>Discover Screen</Text>
//        </View>
//    );
//}
import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const DiscoverScreen = () => {
  // 这里可以定义你的状态和函数

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DISCOVER</Text>
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Recommendation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Community</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Image style={styles.cardImage} source={{ uri: 'your_image_url_here' }} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>15 Min. Full Body Stretch</Text>
            <Text style={styles.cardDuration}>16:33</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.cardImage} source={{ uri: 'your_image_url_here' }} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>The Essence of Calculus</Text>
            <Text style={styles.cardDuration}>17:05</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.tabBar}>
        {/* 这里可以加入底部导航的布局 */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFC0CB',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  tabButton: {
    padding: 10,
  },
  tabButtonText: {
    fontSize: 16,
    color: '#000',
  },
  scrollView: {
    margin: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 3, // for Android
    // shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cardDuration: {
    fontSize: 14,
    color: '#000',
    opacity: 0.6,
  },
});

export default DiscoverScreen;
