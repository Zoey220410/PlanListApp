import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

const DiscoverPostScreen = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  // 处理选择照片的功能
  const handleSelectPhoto = () => {
    // 在这里实现用户选择照片的功能
  };

  // 处理分享帖子的功能
  const handleShare = () => {
    // 在这里实现分享帖子的功能，包括照片和文本
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DISCOVER</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleSelectPhoto} style={styles.photoSelector}>
          <Image source={require('./path-to-your-icon.png')} style={styles.icon} />
          <Text style={styles.photoText}>Select a photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputTitle}
          onChangeText={setTitle}
          value={title}
          placeholder="Add a title"
        />
        <TextInput
          style={styles.inputText}
          onChangeText={setText}
          value={text}
          placeholder="Add a text"
          multiline
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  photoSelector: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  photoText: {
    color: '#a1a1a1',
  },
  inputTitle: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    marginBottom: 20,
    textAlignVertical: 'top', // 适用于多行输入
  },
  inputText: {
    height: 100, // 为多行文本输入设置固定高度
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    marginBottom: 20,
    textAlignVertical: 'top', // 适用于多行输入
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cancelButton: {
    padding: 10,
    width: '40%',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    alignItems:

    'center',
  },
  shareButton: {
    padding: 10,
    width: '40%',
    backgroundColor: '#FFC0CB',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default DiscoverPostScreen;

