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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {DiscoverPostScreen} from "./discoverpost.js";

const DiscoverScreen = () => {
    const [activeTab, setActiveTab] = useState('community');
    const [recommendationItems, setRecommendationItems] = useState([]);
    const [communityItems, setCommunityItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        getCommunity();
    }, []);

    const getRecommendations = () => {
        setLoading(true);
        const token = 'dbea3e79cd7c84a3b96ece091712205e7b64e56a8de33b5106511d3b55f601af';

        axios.get('http://110.41.7.179:443/api/post/recommended', {
            headers: {
                token: token
            }
        }).then(response => {
            if (response.data.status === 'success') {

                setRecommendationItems(response.data.posts);
            } else {
                console.error('Failed to get recommendations:', response.data);
            }
            setLoading(false);
        }).catch(error => {
            console.error('Error getting recommendations:', error);
            setLoading(false);
        });
    };

    const getCommunity = () => {
        setLoading(true);
        const token = 'dbea3e79cd7c84a3b96ece091712205e7b64e56a8de33b5106511d3b55f601af';
        // const token = localStorage.getItem('token');
        // if (!token) {
        //     console.error('No token found');
        //     return;
        // }

        axios.get('http://110.41.7.179:443/api/post/latest', {
            headers: {
                token: token
            }
        }).then(response => {
            if (response.data.status === 'success') {
                setCommunityItems(response.data.posts);
            }
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        });
    };

    const likePost = (postID) => {
        const token = 'dbea3e79cd7c84a3b96ece091712205e7b64e56a8de33b5106511d3b55f601af';

        axios.post('http://110.41.7.179:443/api/post/like', { "postID": postID }, {
            headers: {
                token: token
            }})
            .then(response => {
                if (response.data.status === 'success') {
                    console.log('Post liked successfully');
                } else {
                    console.error('Failed to like post:', response.data.message);
                }
            }).catch(error => {
            console.error('Error liking post:', error);
        });
    };

    const unlikePost = (postID) => {
        const token = 'dbea3e79cd7c84a3b96ece091712205e7b64e56a8de33b5106511d3b55f601af';
        axios.post('/api/post/unlike', { "postID": postID })
            .then(response => {
                if (response.data.status === 'success') {
                    console.log('Post unliked successfully');
                    // Update page state or perform other actions as needed
                } else {
                    console.error('Failed to unlike post:', response.data.message);
                }
            }).catch(error => {
            console.error('Error unliking post:', error);
        });
    };

    return (
        <View style={styles.page}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'recommendation' && styles.activeTab]}
                    onPress={() => {
                        setActiveTab('recommendation');
                        getRecommendations();
                    }}
                >
                    <Text>Recommendation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'community' && styles.activeTab]}
                    onPress={() => {
                        setActiveTab('community');
                        getCommunity();
                    }}
                >
                    <Text>Community</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'recommendation' && (
                <View style={styles.recommendationList}>
                    <View style={styles.itemContainer}>
                        {recommendationItems.map((item, index) => (
                            <View key={index} style={styles.recommendationItem}>
                                <View style={styles.itemContent}>
                                    <Image source={{ uri: item.imageList[0] }} style={styles.thumbnail} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {activeTab === 'community' && (
                <View style={styles.communityList}>
                    <View style={styles.communityGrid}>
                        {communityItems.map((item, index) => (
                            <View key={index} style={styles.communityItem}>
                                <Image source={{ uri: "http://110.41.7.179:443" + item.imageList[0] }} style={styles.thumbnail} />
                                <Text style={styles.communityTitle}>{item.Title}</Text>

                                <View style={styles.communityDetails}>
                                    <Image style={styles.communityAvatar}>
                                    </Image>
                                    <Text style={styles.communityUser}>{item.Name}</Text>
                                    <TouchableOpacity
                                        style={styles.likeButton}
                                        onPress={() => item.liked ? likePost(item.PostID) : unlikePost(item.PostID)}
                                    >
                                        <Text>{item.liked ? 'Unlike' : 'Like'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            <View style={styles.addButtonContainer}>

                <View>
                    {/* 其他内容 */}
                    <DiscoverPostContainer />
                </View>

            </View>
        </View>
    );
};

function DiscoverPostContainer() {
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('DiscoverPost')}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}





const styles = StyleSheet.create({
    page: {
        flex: 1,
        maxWidth: 800,
        margin: 'auto',
        padding: 20,
    },
    tabContainer: {
        flexDirection: 'row', // 将子组件水平排列
        justifyContent: 'space-around', // 在容器中平均分配空间
        alignItems: 'center', // 在交叉轴上居中对齐
        padding: 10,
    },
    tab: {
        flex: 1, // 将子组件平均分配可用空间
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
    },
    activeTab: {
        backgroundColor: '#007bff',
        color: '#fff',
        borderColor: '#007bff',
    },
    recommendationList: {
        marginTop: 20,
    },
    communityList: {
        marginTop: 20,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    recommendationItem: {
        marginBottom: 20,
    },
    itemContent: {
        display: 'flex',
        alignItems: 'center',
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 20,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
    },
    communityGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
    },
    communityItem: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        position: 'relative',
        overflow: 'hidden',
    },
    communityDetails: {
        margin: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },

    communityAvatar: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: 'green',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    communityTitle: {
        left: 5,
        fontSize: 20, // 设置字体大小为20
        fontWeight: 'bold' // 设置字体加粗
    },
    communityUser: {
        marginBottom: 5,
    },
    likeButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    likeButtonHover: {
        backgroundColor: '#007bff',
        color: 'white',
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    addButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        fontSize: 40,
        color: '#fff',
    },
});


export default DiscoverScreen;