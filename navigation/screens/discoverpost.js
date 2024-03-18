import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, TextInput} from "react-native";
import axios from 'axios';
//import {createStackNavigator} from "@react-navigation/stack";
//import {DiscoverPostScreen} from './DiscoverPostScreen';


const DiscoverPostScreen = () => {
    const [imageList, setImageList] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const createPost = async () => {
        try {
            const formData = new FormData();
            imageList.forEach(imageUrl => formData.append('imageList', imageUrl));
            formData.append('title', title);
            formData.append('text', text);

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await axios.post(
                'http://110.41.7.179:443/api/post/create',
                formData,
                {
                    headers: { token }
                }
            );

            if (response.data.status === 'success') {
                console.log('Post created successfully');
                console.log('Post ID:', response.data.postID);
            } else {
                console.error('Failed to create post:');
            }
        } catch (error) {
            console.error('Error creating post:');
        }
    };

    const handleImageUpload = event => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = () => {
                setImageList(prevImageList => [...prevImageList, reader.result]);
                if (i !== files.length - 1) {
                    setImageList(prevImageList => [...prevImageList, null]);
                }
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <View style={styles.postContainer}>
            <View style={styles.imageContainer}>
                {imageList.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
                    </View>
                ))}
                <TouchableOpacity onPress={handleImageUpload} style={styles.addImageButton}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                placeholder="Title"
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Content"
                style={styles.contentInput}
                multiline
                numberOfLines={4}
                value={text}
                onChangeText={setText}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton} onPress={createPost}>
                    <Text>Share</Text>
               </TouchableOpacity>
            </View>
        </View>
    );
}




const styles = {
    postContainer: {
        maxWidth: '400',
        margin: '0 auto',
        padding: '20',
    },
    imageContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    imageWrapper: {
        marginRight: '10',
        marginBottom: '10',
    },
    selectedImage: {
        maxWidth: '150',
        maxHeight: '150',
        objectFit: 'cover',
        border: '1 solid #ccc',
    },
    addImageButton: {
        width: '50',
        height: '50',
        lineHeight: '50',
        fontSize: '36',
        textAlign: 'center',
        border: '1px dashed #ccc',
        cursor: 'pointer',
    },
    inputContainer: {
        marginTop: '20',
    },
    titleInput: {
        width: '100%',
        padding: '10',
    },
    contentInput: {
        height: '100',
        width: '100%',
        padding: '10',
        margin: '2',
    },
    buttonContainer: {
        marginTop: '20',
        textAlign: 'center',
    },
    cancelButton: {
        padding: '10 20',
        marginRight: '10',
        border: '1px solid #ccc',
        borderRadius: '5',
        backgroundColor: '#f0f0f0',
        cursor: 'pointer',
    },
    shareButton: {
        padding: '10 20',
        border: 'none',
        borderRadius: '5',
        backgroundColor: '#4CAF50',
        color: 'white',
        cursor: 'pointer',
    },
};


export default DiscoverPostScreen;
