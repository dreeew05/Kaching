import React from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface CategoryCardProps {
  categoryName: string;
  categoryImage: string;
}

export default function CategoryCard({ categoryName, categoryImage }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.5}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: categoryImage }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={1}>
          {categoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    elevation: 2,
    margin: 10,
  },
  imageContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
